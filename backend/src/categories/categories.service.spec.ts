import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: {
    category: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      category: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    service = new CategoriesService(prisma as unknown as PrismaService);
  });

  it('creates categories with normalized slugs', async () => {
    prisma.category.create.mockResolvedValue({ id: 'category-1' });

    await service.create({
      name: 'Muñecas Clasicas',
      description: 'Piezas atemporales para coleccionar.',
      imageUrl: 'https://example.com/category.jpg',
    });

    expect(prisma.category.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ slug: 'munecas-clasicas' }),
    });
  });

  it('throws NotFoundException when category slug is missing', async () => {
    prisma.category.findUnique.mockResolvedValue(null);

    await expect(service.findBySlug('no-existe')).rejects.toThrow(NotFoundException);
  });
});
