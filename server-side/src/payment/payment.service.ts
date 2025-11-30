import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-10-29.clover',
    });
  }

  async createPaymentSession(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundException('Order not found');

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: order.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Order payment in our store. Paiment id #${item.id}`,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      success_url: `${process.env.CLIENT_URL}/thanks`,
      cancel_url: `${process.env.CLIENT_URL}/cart?canceled=true`,
      metadata: { orderId: order.id },
      locale: 'en',
    });

    return { url: session.url };
  }
}
