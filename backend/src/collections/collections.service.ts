import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

const collectionDetailInclude = {
  dolls: {
    include: {
      category: true,
      collection: true,
    },
    orderBy: [{ isFeatured: 'desc' }, { popularity: 'desc' }, { createdAt: 'desc' }],
  },
} satisfies Prisma.CollectionInclude;

type CollectionDetail = Prisma.CollectionGetPayload<{
  include: typeof collectionDetailInclude;
}>;

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.collection.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      include: { _count: { select: { dolls: true } } },
    });
  }

  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findFirst({
      where: { slug, isActive: true },
      include: collectionDetailInclude,
    });

    if (!collection) {
      throw new NotFoundException('La coleccion solicitada no existe.');
    }

    return this.serializeCollection(collection);
  }

  private serializeCollection(collection: CollectionDetail) {
    return {
      ...collection,
      dolls: collection.dolls.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };
  }
}
