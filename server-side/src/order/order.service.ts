import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './dto/order.dto';
import { EnumOrdersStatus } from 'generated/prisma';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
  ) {}

  async create(userId: string, dto: OrderDto) {
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            storeId: item.storeId,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Створюємо payment session
    const paymentSession = await this.paymentService.createPaymentSession(
      order.id,
    );

    if (!paymentSession.url) {
      throw new NotFoundException('Failed to create payment session');
    }

    // Форматуємо відповідь під IPaymentResponse
    return {
      id: order.id,
      status: order.status,
      amount: {
        value: order.total,
        currency: 'usd',
      },
      recipient: {
        accaount_id: '',
        gateway_id: '',
      },
      payment_method: {
        type: 'card',
        id: '',
        saved: false,
      },
      created_at: order.createdAt.toISOString(),
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.CLIENT_URL}/thanks`,
        confirmation_url: paymentSession.url,
      },
    };
  }

  async getAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: string, status: EnumOrdersStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string) {
    await this.getById(id);
    return this.prisma.order.delete({ where: { id } });
  }
}
