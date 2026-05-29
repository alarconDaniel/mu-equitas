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
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      $transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
      doll: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new DollsService(prisma as unknown as PrismaService);
  });

  it('returns paginated dolls with safe filters and sorting', async () => {
    const doll = {
      id: 'doll-1',
      name: 'Amelia Rose',
      slug: 'amelia-rose',
      category: { name: 'Personalizadas', slug: 'personalizadas' },
      collection: { name: 'Atelier', slug: 'atelier' },
    };
    prisma.doll.findMany.mockResolvedValue([doll]);
    prisma.doll.count.mockResolvedValue(1);

    const result = await service.findAll({
      search: 'amelia',
      category: 'personalizadas',
      available: true,
      minPrice: 100000,
      sortBy: 'price',
      order: 'asc',
      page: 2,
      limit: 6,
    });

    expect(result).toEqual({
      data: [doll],
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
    expect(prisma.doll.count).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          available: true,
          price: { gte: 100000, lte: undefined },
        }),
      }),
    );
  });

  it('throws NotFoundException when a slug does not exist', async () => {
    prisma.doll.findUnique.mockResolvedValue(null);

    await expect(service.findBySlug('missing-doll')).rejects.toThrow(NotFoundException);
  });

  it('creates a doll with a generated slug', async () => {
    prisma.doll.create.mockResolvedValue({ id: 'doll-1', slug: 'amelia-rose' });

    await service.create({
      name: 'Amelia Rose',
      description: 'Muñeca artesanal con vestido floral y acabados premium.',
      price: 185000,
      imageUrl: 'https://example.com/amelia.jpg',
      categoryId: 'category-1',
      collectionId: 'collection-1',
    });

    expect(prisma.doll.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ slug: 'amelia-rose' }),
      }),
    );
  });
});
