import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumOrdersStatus } from 'generated/prisma';

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrdersStatus, {
    message: `Status must be one of the following values: ${Object.values(EnumOrdersStatus).join(', ')}`,
  })
  status: EnumOrdersStatus;

  @IsArray({
    message: 'In order there are no products',
  })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Product quantity must be a number' })
  quantity: number;

  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @IsString({
    message: 'Product ID is required and must be a string',
  })
  productId: string;

  @IsString({
    message: 'Store ID is required and must be a string',
  })
  storeId: string;
}
