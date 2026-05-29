import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ example: 'Atelier' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional({ example: 'atelier' })
  @IsOptional()
  @IsString()
  @Length(2, 120)
  slug?: string;

  @ApiProperty({ example: 'Coleccion de piezas personalizables y delicadas.' })
  @IsString()
  @Length(10, 300)
  description: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
  })
  @IsUrl({ require_tld: false })
  @Length(8, 500)
  imageUrl: string;
}
