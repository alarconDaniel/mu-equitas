import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { slugify } from '../common/utils/slugify';
import { PrismaService } from '../database/prisma.service';
import { CreateDollDto } from './dto/create-doll.dto';
import { QueryDollsDto } from './dto/query-dolls.dto';
import { UpdateDollDto } from './dto/update-doll.dto';

const dollInclude = {
  category: true,
  collection: true,
} satisfies Prisma.DollInclude;

@Injectable()
export class DollsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryDollsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const skip = (page - 1) * limit;
    const where = this.buildWhere(query);

    const [data, total] = await this.prisma.$transaction([
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
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const doll = await this.prisma.doll.findUnique({
      where: { slug },
      include: dollInclude,
    });

    if (!doll) {
      throw new NotFoundException('La muñeca solicitada no existe.');
    }

    return doll;
  }

  create(createDollDto: CreateDollDto) {
    const { slug, ...data } = createDollDto;

    return this.prisma.doll.create({
      data: {
        ...data,
        slug: slugify(slug ?? createDollDto.name),
      },
      include: dollInclude,
    });
  }

  update(id: string, updateDollDto: UpdateDollDto) {
    const { slug, ...data } = updateDollDto;

    return this.prisma.doll.update({
      where: { id },
      data: {
        ...data,
        slug: slug ? slugify(slug) : undefined,
      },
      include: dollInclude,
    });
  }

  remove(id: string) {
    return this.prisma.doll.delete({
      where: { id },
      include: dollInclude,
    });
  }

  private buildWhere(query: QueryDollsDto): Prisma.DollWhereInput {
    const where: Prisma.DollWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        {
          category: {
            is: { name: { contains: query.search, mode: 'insensitive' } },
          },
        },
        {
          collection: {
            is: { name: { contains: query.search, mode: 'insensitive' } },
          },
        },
      ];
    }

    if (query.category) {
      where.category = {
        is: {
          OR: [
            { slug: query.category },
            { name: { equals: query.category, mode: 'insensitive' } },
          ],
        },
      };
    }

    if (query.collection) {
      where.collection = {
        is: {
          OR: [
            { slug: query.collection },
            { name: { equals: query.collection, mode: 'insensitive' } },
          ],
        },
      };
    }

    if (typeof query.available === 'boolean') {
      where.available = query.available;
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {
        gte: query.minPrice,
        lte: query.maxPrice,
      };
    }

    return where;
  }
}
