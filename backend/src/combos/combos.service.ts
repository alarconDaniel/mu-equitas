import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

const comboInclude = {
  items: {
    include: {
      doll: {
        include: {
          category: true,
          collection: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.ComboInclude;

type ComboWithItems = Prisma.ComboGetPayload<{ include: typeof comboInclude }>;

@Injectable()
export class CombosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const combos = await this.prisma.combo.findMany({
      where: { available: true },
      include: comboInclude,
      orderBy: [{ isFeatured: 'desc' }, { popularity: 'desc' }, { createdAt: 'desc' }],
    });

    return combos.map((combo) => this.serializeCombo(combo));
  }

  async findBySlug(slug: string) {
    const combo = await this.prisma.combo.findFirst({
      where: { slug, available: true },
      include: comboInclude,
    });

    if (!combo) {
      throw new NotFoundException('El combo solicitado no existe.');
    }

    return this.serializeCombo(combo);
  }

  private serializeCombo(combo: ComboWithItems) {
    return {
      id: combo.id,
      code: combo.code,
      name: combo.name,
      slug: combo.slug,
      description: combo.description,
      price: Number(combo.price),
      imageUrl: combo.imageUrl,
      tag: combo.tag,
      available: combo.available,
      stockQuantity: combo.stockQuantity,
      popularity: combo.popularity,
      isFeatured: combo.isFeatured,
      createdAt: combo.createdAt,
      updatedAt: combo.updatedAt,
      items: combo.items.map((item) => ({
        id: item.doll.id,
        code: item.doll.code,
        name: item.doll.name,
        slug: item.doll.slug,
        price: Number(item.doll.price),
        imageUrl: item.doll.imageUrl,
        productType: item.doll.productType,
        categorySlug: item.doll.category.slug,
        collectionSlug: item.doll.collection.slug,
        quantity: item.quantity,
      })),
    };
  }
}
