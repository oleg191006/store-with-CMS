import { Controller, Post, Req, Res, Headers, HttpCode } from '@nestjs/common';
import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';

@Controller('webhook')
export class StripeController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-10-29.clover',
    });

    let event: Stripe.Event;

    try {
      const body = req.body as Buffer;
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await this.prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAYED' },
        });
      }
    }

    res.send({ received: true });
  }
}
