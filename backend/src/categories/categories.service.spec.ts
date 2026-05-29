import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: {
    category: {
      findMany: jest.Mock;
      findFirst: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      category: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    };

    service = new CategoriesService(prisma as unknown as PrismaService);
  });

  it('lists only active categories ordered for catalog display', async () => {
    prisma.category.findMany.mockResolvedValue([]);

    await service.findAll();

    expect(prisma.category.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isActive: true },
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      }),
    );
  });

  it('throws NotFoundException when category slug is missing', async () => {
    prisma.category.findFirst.mockResolvedValue(null);

    await expect(service.findBySlug('no-existe')).rejects.toThrow(NotFoundException);
  });
});
