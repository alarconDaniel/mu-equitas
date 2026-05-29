import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { QueryDollsDto } from './dto/query-dolls.dto';

const dollInclude = {
  category: true,
  collection: true,
} satisfies Prisma.DollInclude;

type DollWithRelations = Prisma.DollGetPayload<{ include: typeof dollInclude }>;

@Injectable()
export class DollsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDollsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const skip = (page - 1) * limit;
    const where = this.buildWhere(query);

    const [products, total] = await this.prisma.$transaction([
      this.prisma.doll.findMany({
        where,
        include: dollInclude,
        orderBy: { [query.sortBy ?? 'createdAt']: query.order ?? 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.doll.count({ where }),
    ]);

    return {
      data: products.map((product) => this.serializeProduct(product)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.doll.findUnique({
      where: { slug },
      include: dollInclude,
    });

    if (!product) {
      throw new NotFoundException('El producto solicitado no existe.');
    }

    return this.serializeProduct(product);
  }

  private buildWhere(query: QueryDollsDto): Prisma.DollWhereInput {
    const filters: Prisma.DollWhereInput[] = [
      { category: { is: { isActive: true } } },
      { collection: { is: { isActive: true } } },
    ];

    if (query.search) {
      filters.push({
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { description: { contains: query.search, mode: 'insensitive' } },
          { tag: { contains: query.search, mode: 'insensitive' } },
          { category: { is: { name: { contains: query.search, mode: 'insensitive' } } } },
          { collection: { is: { name: { contains: query.search, mode: 'insensitive' } } } },
        ],
      });
    }

    if (query.category) {
      filters.push({
        category: {
          is: {
            OR: [
              { slug: query.category },
              { name: { equals: query.category, mode: 'insensitive' } },
            ],
          },
        },
      });
    }

    if (query.collection) {
      filters.push({
        collection: {
          is: {
            OR: [
              { slug: query.collection },
              { name: { equals: query.collection, mode: 'insensitive' } },
            ],
          },
        },
      });
    }

    if (query.productType) {
      filters.push({ productType: query.productType });
    }

    if (typeof query.available === 'boolean') {
      filters.push({ available: query.available });
    }

    if (typeof query.featured === 'boolean') {
      filters.push({ isFeatured: query.featured });
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filters.push({
        price: {
          gte: query.minPrice,
          lte: query.maxPrice,
        },
      });
    }

    return { AND: filters };
  }

  private serializeProduct(product: DollWithRelations) {
    return {
      ...product,
      price: Number(product.price),
    };
  }
}
