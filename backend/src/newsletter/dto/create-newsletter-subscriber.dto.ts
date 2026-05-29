import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateNewsletterSubscriberDto {
  @ApiProperty({ example: 'correo@ejemplo.com' })
  @IsEmail()
  @Length(5, 180)
  email: string;
}
