import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export const DOLL_SORT_FIELDS = ['price', 'createdAt', 'popularity', 'name'] as const;
export const SORT_ORDERS = ['asc', 'desc'] as const;

export type DollSortBy = (typeof DOLL_SORT_FIELDS)[number];
export type SortOrder = (typeof SORT_ORDERS)[number];

function toOptionalBoolean(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (value === true || value === 'true') {
    return true;
  }

  if (value === false || value === 'false') {
    return false;
  }

  return value;
}

export class QueryDollsDto {
  @ApiPropertyOptional({ example: 'amelia' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  search?: string;

  @ApiPropertyOptional({ example: 'personalizadas' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  category?: string;

  @ApiPropertyOptional({ example: 'atelier' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  collection?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @Transform(({ value }) => toOptionalBoolean(value))
  @IsBoolean()
  available?: boolean;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 220000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: DOLL_SORT_FIELDS, example: 'price' })
  @IsOptional()
  @IsIn(DOLL_SORT_FIELDS)
  sortBy: DollSortBy = 'createdAt';

  @ApiPropertyOptional({ enum: SORT_ORDERS, example: 'asc' })
  @IsOptional()
  @IsIn(SORT_ORDERS)
  order: SortOrder = 'desc';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(48)
  limit = 12;
}
