import { IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  // @IsNotEmpty()
  // @IsString()
  // cvc: string;

  // @IsNotEmpty()
  // @IsNumber()
  // exp_month: number;

  // @IsNotEmpty()
  // @IsNumber()
  // exp_year: number;

  // @IsCreditCard()
  // @IsNotEmpty()
  // number: string;
  @IsNotEmpty()
  @IsString()
  token: string;
}
