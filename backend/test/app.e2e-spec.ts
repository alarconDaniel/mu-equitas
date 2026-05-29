import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaExceptionFilter } from '../src/common/filters/prisma-exception.filter';
import { SanitizeInputPipe } from '../src/common/pipes/sanitize-input.pipe';
import { PrismaService } from '../src/database/prisma.service';
import type { Response } from 'supertest';

process.env.NODE_ENV = 'test';
process.env.PORT ||= '3001';
process.env.DATABASE_URL ??=
  'postgresql://postgres:postgres@localhost:5432/munequitas_db?schema=public';
process.env.CORS_ORIGINS ||= 'http://localhost:3000';

const request = require('supertest');

describe('Munequitas API (e2e)', () => {
  let app: INestApplication;

  const doll = {
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
    category: {
      id: 'category-1',
      name: 'Coleccion Premium',
      slug: 'coleccion-premium',
      description: null,
      imageUrl: null,
      displayOrder: 1,
      isActive: true,
      createdAt: new Date('2026-05-01'),
      updatedAt: new Date('2026-05-01'),
    },
    collection: {
      id: 'collection-1',
      name: 'Winter Elegance',
      slug: 'winter-elegance',
      description: null,
      imageUrl: null,
      displayOrder: 1,
      isActive: true,
      createdAt: new Date('2026-05-01'),
      updatedAt: new Date('2026-05-01'),
    },
  };

  const combo = {
    id: 'combo-1',
    code: 'c1',
    name: 'Combo Mini Icons',
    slug: 'combo-mini-icons',
    description: 'Set de mini munecas tipo llavero.',
    price: 175000,
    imageUrl: '/images/combos/combo-mini-icons.jpg',
    tag: 'Mini Set',
    available: true,
    stockQuantity: 12,
    popularity: 97,
    isFeatured: true,
    createdAt: new Date('2026-05-18'),
    updatedAt: new Date('2026-05-18'),
    items: [{ comboId: 'combo-1', dollId: 'doll-1', quantity: 1, createdAt: new Date(), doll }],
  };

  const prismaMock = {
    doll: {
      findMany: jest.fn().mockResolvedValue([doll]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue(doll),
    },
    combo: {
      findMany: jest.fn().mockResolvedValue([combo]),
      findFirst: jest.fn().mockResolvedValue(combo),
    },
    $transaction: jest.fn((operations: Promise<unknown>[]) => Promise.all(operations)),
  };

  beforeAll(async () => {
    const { AppModule } = await import('../src/app.module');
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
      .get('/api/dolls?search=burnice&productType=doll&page=1&limit=12')
      .expect(200)
      .expect(({ body }: Response) => {
        expect(body.data).toHaveLength(1);
        expect(body.data[0].name).toBe('Burnice White');
        expect(body.data[0].productType).toBe('doll');
        expect(body.data[0].category.slug).toBe('coleccion-premium');
        expect(body.meta.total).toBe(1);
      });
  });

  it('/api/dolls product type filters (GET)', async () => {
    await request(app.getHttpServer()).get('/api/dolls?productType=doll').expect(200);
    await request(app.getHttpServer()).get('/api/dolls?productType=accessory').expect(200);
    await request(app.getHttpServer()).get('/api/dolls?productType=keychain').expect(200);
  });

  it('/api/combos (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/combos')
      .expect(200)
      .expect(({ body }: Response) => {
        expect(body).toHaveLength(1);
        expect(body[0].items[0]).toEqual(
          expect.objectContaining({
            name: 'Burnice White',
            productType: 'doll',
            quantity: 1,
          }),
        );
      });
  });
});
