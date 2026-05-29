import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

const categoryDetailInclude = {
  dolls: {
    include: {
      category: true,
      collection: true,
    },
    orderBy: [{ isFeatured: 'desc' }, { popularity: 'desc' }, { createdAt: 'desc' }],
  },
} satisfies Prisma.CategoryInclude;

type CategoryDetail = Prisma.CategoryGetPayload<{ include: typeof categoryDetailInclude }>;

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { dolls: true } } },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findFirst({
      where: { slug, isActive: true },
      include: categoryDetailInclude,
    });

    if (!category) {
      throw new NotFoundException('La categoria solicitada no existe.');
    }

    return this.serializeCategory(category);
  }

  private serializeCategory(category: CategoryDetail) {
    return {
      ...category,
      dolls: category.dolls.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };
  }
}
