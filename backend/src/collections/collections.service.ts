import { Injectable, NotFoundException } from '@nestjs/common';
import { slugify } from '../common/utils/slugify';
import { PrismaService } from '../database/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.collection.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { dolls: true } } },
    });
  }

  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findUnique({
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

    if (!collection) {
      throw new NotFoundException('La coleccion solicitada no existe.');
    }

    return collection;
  }

  create(createCollectionDto: CreateCollectionDto) {
    const { slug, ...data } = createCollectionDto;

    return this.prisma.collection.create({
      data: {
        ...data,
        slug: slugify(slug ?? createCollectionDto.name),
      },
    });
  }

  update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const { slug, ...data } = updateCollectionDto;

    return this.prisma.collection.update({
      where: { id },
      data: {
        ...data,
        slug: slug ? slugify(slug) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.collection.delete({ where: { id } });
  }
}
