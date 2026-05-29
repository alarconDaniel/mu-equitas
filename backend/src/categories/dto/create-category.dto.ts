import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Muñecas Clasicas' })
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiPropertyOptional({ example: 'munecas-clasicas' })
  @IsOptional()
  @IsString()
  @Length(2, 120)
  slug?: string;

  @ApiProperty({ example: 'Piezas atemporales para coleccionar y regalar.' })
  @IsString()
  @Length(10, 300)
  description: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
  })
  @IsUrl({ require_tld: false })
  @Length(8, 500)
  imageUrl: string;
}
