import { IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString({
    message: 'Name is required and must be a string',
  })
  title: string;
}
