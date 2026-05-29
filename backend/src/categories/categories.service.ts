import { Injectable, NotFoundException } from '@nestjs/common';
import { slugify } from '../common/utils/slugify';
import { PrismaService } from '../database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { dolls: true } } },
    });
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        dolls: {
          include: {
            category: true,
            collection: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('La categoria solicitada no existe.');
    }

    return category;
  }

  create(createCategoryDto: CreateCategoryDto) {
    const { slug, ...data } = createCategoryDto;

    return this.prisma.category.create({
      data: {
        ...data,
        slug: slugify(slug ?? createCategoryDto.name),
      },
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { slug, ...data } = updateCategoryDto;

    return this.prisma.category.update({
      where: { id },
      data: {
        ...data,
        slug: slug ? slugify(slug) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
