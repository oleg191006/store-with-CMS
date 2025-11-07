import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { EnumOrdersStatus } from 'generated/prisma';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') userId: string, @Body() dto: OrderDto) {
    return this.orderService.create(userId, dto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.orderService.getById(id);
  }

  @Get()
  async getAllByUser(@CurrentUser('id') userId: string) {
    return this.orderService.getAllByUser(userId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: EnumOrdersStatus,
  ) {
    return this.orderService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
