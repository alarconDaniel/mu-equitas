import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { DollsService } from './dolls.service';

describe('DollsService', () => {
  let service: DollsService;
  let prisma: {
    $transaction: jest.Mock;
    doll: {
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  const product = {
    id: 'doll-1',
    code: 'd1',
    name: 'Burnice White',
    slug: 'burnice-white',
    description: 'Producto del catalogo.',
    price: 185000,
    imageUrl: '/images/dolls/burnice-white.jpg',
    tag: 'Nuevo',
    productType: 'doll',
    available: true,
    stockQuantity: 12,
    popularity: 95,
    isFeatured: true,
    categoryId: 'category-1',
    collectionId: 'collection-1',
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
    category: { id: 'category-1', name: 'Coleccion Premium', slug: 'coleccion-premium' },
    collection: { id: 'collection-1', name: 'Winter Elegance', slug: 'winter-elegance' },
  };

  beforeEach(() => {
    prisma = {
      $transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
      doll: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    service = new DollsService(prisma as unknown as PrismaService);
  });

  it('returns paginated products with catalog filters and numeric prices', async () => {
    prisma.doll.findMany.mockResolvedValue([product]);
    prisma.doll.count.mockResolvedValue(1);

    const result = await service.findAll({
      search: 'burnice',
      category: 'coleccion-premium',
      productType: 'doll',
      available: true,
      featured: true,
      minPrice: 100000,
      sortBy: 'price',
      order: 'asc',
      page: 2,
      limit: 6,
    });

    expect(result).toEqual({
      data: [product],
      meta: {
        page: 2,
        limit: 6,
        total: 1,
        totalPages: 1,
      },
    });
    expect(prisma.doll.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { price: 'asc' },
        skip: 6,
        take: 6,
      }),
    );
    expect(prisma.doll.count).toHaveBeenCalledWith({
      where: expect.objectContaining({
        AND: expect.arrayContaining([
          { productType: 'doll' },
          { available: true },
          { isFeatured: true },
          { price: { gte: 100000, lte: undefined } },
        ]),
      }),
    });
  });

  it('throws NotFoundException when a slug does not exist', async () => {
    prisma.doll.findUnique.mockResolvedValue(null);

    await expect(service.findBySlug('missing-product')).rejects.toThrow(NotFoundException);
  });
});
