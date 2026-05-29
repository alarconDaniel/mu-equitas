import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Nombre' })
  @IsString()
  @Length(2, 120)
  name: string;

  @ApiProperty({ example: 'correo@ejemplo.com' })
  @IsEmail()
  @Length(5, 180)
  email: string;

  @ApiProperty({ example: 'Consulta sobre una muñeca' })
  @IsString()
  @Length(4, 160)
  subject: string;

  @ApiProperty({ example: 'Hola, quisiera conocer disponibilidad y tiempos de entrega.' })
  @IsString()
  @Length(10, 1000)
  message: string;
}
