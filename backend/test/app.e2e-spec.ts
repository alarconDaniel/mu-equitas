import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaExceptionFilter } from '../src/common/filters/prisma-exception.filter';
import { SanitizeInputPipe } from '../src/common/pipes/sanitize-input.pipe';
import { PrismaService } from '../src/database/prisma.service';
import type { Response } from 'supertest';

const request = require('supertest');

describe('Muñequitas API (e2e)', () => {
  let app: INestApplication;

  const doll = {
    id: 'doll-1',
    name: 'Amelia Rose',
    slug: 'amelia-rose',
    description: 'Muñeca artesanal con vestido floral y acabados premium.',
    price: 185000,
    imageUrl: 'https://example.com/amelia.jpg',
    tag: 'Nuevo',
    available: true,
    popularity: 95,
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-01'),
    categoryId: 'category-1',
    collectionId: 'collection-1',
    category: {
      id: 'category-1',
      name: 'Personalizadas',
      slug: 'personalizadas',
    },
    collection: {
      id: 'collection-1',
      name: 'Atelier',
      slug: 'atelier',
    },
  };

  const prismaMock = {
    doll: {
      findMany: jest.fn().mockResolvedValue([doll]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue(doll),
    },
    $transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new PrismaExceptionFilter());
    app.useGlobalPipes(
      new SanitizeInputPipe(),
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect(({ body }: Response) => {
        expect(body.status).toBe('ok');
        expect(body.service).toBe('munequitas-api');
      });
  });

  it('/api/dolls (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/dolls?search=amelia&page=1&limit=12')
      .expect(200)
      .expect(({ body }: Response) => {
        expect(body.data).toHaveLength(1);
        expect(body.data[0].name).toBe('Amelia Rose');
        expect(body.data[0].category.slug).toBe('personalizadas');
        expect(body.meta.total).toBe(1);
      });
  });
});
