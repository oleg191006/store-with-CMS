import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session')
  async createSession(@Body('orderId') orderId: string) {
    return this.paymentService.createPaymentSession(orderId);
  }
}
