import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({
    message: 'Review text is required and must be a string',
  })
  @IsNotEmpty({
    message: 'Review text cannot be empty',
  })
  text: string;

  @IsNumber(
    {},
    {
      message: 'Rating is required and must be a number',
    },
  )
  @Min(1, {
    message: 'Rating must be at least 1',
  })
  @Max(5, {
    message: 'Rating cannot be more than 5',
  })
  @IsNotEmpty({
    message: 'Rating cannot be empty',
  })
  rating: number;
}
