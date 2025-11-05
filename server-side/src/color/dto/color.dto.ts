import { IsString } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Name is required and must be a string',
  })
  name: string;

  @IsString({
    message: 'Value is required and must be a string',
  })
  value: string;
}
