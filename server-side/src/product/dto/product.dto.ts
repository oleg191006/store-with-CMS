import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString({
    message: 'Title is required and must be a string',
  })
  @IsNotEmpty({
    message: 'Title cannot be empty',
  })
  title: string;

  @IsString({
    message: 'Description is required and must be a string',
  })
  @IsNotEmpty({
    message: 'Description cannot be empty',
  })
  description: string;

  @IsNumber(
    {},
    {
      message: 'Price is required and must be a number',
    },
  )
  @IsNotEmpty({
    message: 'Price cannot be empty',
  })
  price: number;

  @IsString({
    message: 'Specify at least one image',
    each: true,
  })
  @ArrayMinSize(1, {
    message: 'At least one image is required',
  })
  @IsNotEmpty({
    message: 'Images cannot be empty',
  })
  images: string[];

  @IsString({
    message: 'Category is required and must be a string',
  })
  @IsNotEmpty({
    message: 'Category id cannot be empty',
  })
  categoryId: string;

  @IsString({
    message: 'Color is required and must be a string',
  })
  @IsNotEmpty({
    message: 'Color id cannot be empty',
  })
  colorId: string;
}
