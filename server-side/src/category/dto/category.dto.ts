import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString({
    message: 'Title is required and must be a string',
  })
  title: string;

  @IsString({
    message: 'Description is required and must be a string',
  })
  description: string;
}
