import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateDollDto {
  @ApiProperty({ example: 'Amelia Rose' })
  @IsString()
  @Length(2, 120)
  name: string;

  @ApiPropertyOptional({ example: 'amelia-rose' })
  @IsOptional()
  @IsString()
  @Length(2, 140)
  slug?: string;

  @ApiProperty({
    example: 'Muñeca artesanal con vestido floral y acabados premium.',
  })
  @IsString()
  @Length(20, 500)
  description: string;

  @ApiProperty({ example: 185000 })
  @IsInt()
  @Min(1)
  price: number;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1544329241-118817478051?auto=format&fit=crop&q=80&w=800',
  })
  @IsUrl({ require_tld: false })
  @Length(8, 500)
  imageUrl: string;

  @ApiPropertyOptional({ example: 'Nuevo' })
  @IsOptional()
  @IsString()
  @Length(0, 80)
  tag?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ example: 95 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  popularity?: number;

  @ApiProperty({ example: 'clz_category_id' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'clz_collection_id' })
  @IsString()
  @IsNotEmpty()
  collectionId: string;
}
