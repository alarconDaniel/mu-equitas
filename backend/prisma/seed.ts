import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/common/utils/slugify';

const prisma = new PrismaClient();

const image = (id: string, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${width}`;

async function main() {
  const categories = await Promise.all(
    [
      {
        name: 'Muñecas Clasicas',
        description: 'Diseños atemporales con detalles suaves y elegantes.',
        imageUrl: image('photo-1596755094514-f87e34085b2c', 600),
      },
      {
        name: 'Personalizadas',
        description: 'Piezas hechas a medida con colores y accesorios elegidos.',
        imageUrl: image('photo-1490481651871-ab68de25d43d', 600),
      },
      {
        name: 'Edicion Regalo',
        description: 'Muñecas listas para sorprender con empaque especial.',
        imageUrl: image('photo-1558769132-cb1aea458c5e', 600),
      },
      {
        name: 'Coleccion Premium',
        description: 'Modelos exclusivos con materiales y acabados superiores.',
        imageUrl: image('photo-1445205170230-053b83016050', 600),
      },
      {
        name: 'Accesorios',
        description: 'Complementos delicados para vestir y exhibir muñecas.',
        imageUrl: image('photo-1583394838336-acd977736f90', 600),
      },
      {
        name: 'Mini Muñecas',
        description: 'Formato pequeño para regalos, decoración y coleccionistas.',
        imageUrl: image('photo-1621509930438-6decd716260a', 600),
      },
    ].map((category) =>
      prisma.category.upsert({
        where: { slug: slugify(category.name) },
        update: category,
        create: {
          ...category,
          slug: slugify(category.name),
        },
      }),
    ),
  );

  const collections = await Promise.all(
    [
      {
        name: 'Atelier',
        description: 'La linea artesanal con opciones personalizables.',
        imageUrl: image('photo-1490481651871-ab68de25d43d', 600),
      },
      {
        name: 'Heritage',
        description: 'Inspiracion clasica, siluetas cuidadas y encanto vintage.',
        imageUrl: image('photo-1445205170230-053b83016050', 600),
      },
      {
        name: 'Moments',
        description: 'Coleccion pensada para celebrar fechas especiales.',
        imageUrl: image('photo-1558769132-cb1aea458c5e', 600),
      },
      {
        name: 'Spring Vibe',
        description: 'Texturas frescas, tonos suaves y detalles florales.',
        imageUrl: image('photo-1621509930438-6decd716260a', 600),
      },
    ].map((collection) =>
      prisma.collection.upsert({
        where: { slug: slugify(collection.name) },
        update: collection,
        create: {
          ...collection,
          slug: slugify(collection.name),
        },
      }),
    ),
  );

  const byCategory = new Map(categories.map((category) => [category.slug, category.id]));
  const byCollection = new Map(
    collections.map((collection) => [collection.slug, collection.id]),
  );

  const dolls = [
    {
      name: 'Amelia Rose',
      category: 'coleccion-premium',
      collection: 'spring-vibe',
      price: 185000,
      imageUrl: image('photo-1544329241-118817478051'),
      tag: 'Nuevo',
      description: 'Muñeca floral con vestido bordado y presencia delicada.',
      available: true,
      popularity: 95,
      createdAt: new Date('2026-05-01'),
    },
    {
      name: 'Clara Vintage',
      category: 'munecas-clasicas',
      collection: 'heritage',
      price: 120000,
      imageUrl: image('photo-1533038590840-1c7987e9ad15'),
      tag: 'Mas vendido',
      description: 'Diseño clasico atemporal, ideal para coleccionar o regalar.',
      available: true,
      popularity: 98,
      createdAt: new Date('2026-03-15'),
    },
    {
      name: 'Isabella Bloom',
      category: 'edicion-regalo',
      collection: 'moments',
      price: 145000,
      imageUrl: image('photo-1588636733221-da3b7b250de8'),
      tag: 'Regalo ideal',
      description: 'Incluye empaque premium y detalles florales hechos a mano.',
      available: true,
      popularity: 88,
      createdAt: new Date('2026-04-20'),
    },
    {
      name: 'Emma Soft',
      category: 'coleccion-premium',
      collection: 'heritage',
      price: 210000,
      imageUrl: image('photo-1507679799987-c73779587ccf'),
      tag: 'Edicion limitada',
      description: 'Silueta sofisticada con textiles suaves y acentos elegantes.',
      available: false,
      popularity: 100,
      createdAt: new Date('2026-01-10'),
    },
    {
      name: 'Valentina Dream',
      category: 'personalizadas',
      collection: 'atelier',
      price: 160000,
      imageUrl: image('photo-1618691515228-3e440b8a3291'),
      tag: 'Personalizable',
      description: 'Modelo a medida con paleta de color y accesorios iniciales.',
      available: true,
      popularity: 85,
      createdAt: new Date('2026-05-10'),
    },
    {
      name: 'Martina Classic',
      category: 'munecas-clasicas',
      collection: 'spring-vibe',
      price: 135000,
      imageUrl: image('photo-1621509930438-6decd716260a'),
      tag: null,
      description: 'Delicadeza de primavera con lino, algodon y tonos neutros.',
      available: true,
      popularity: 75,
      createdAt: new Date('2026-02-28'),
    },
    {
      name: 'Aurora Gift',
      category: 'edicion-regalo',
      collection: 'moments',
      price: 138000,
      imageUrl: image('photo-1580231649964-b0451cf57b85'),
      tag: 'Nuevo',
      description: 'Pieza lista para obsequiar con base de exhibicion grabada.',
      available: true,
      popularity: 82,
      createdAt: new Date('2026-05-15'),
    },
    {
      name: 'Luna Mini',
      category: 'mini-munecas',
      collection: 'atelier',
      price: 95000,
      imageUrl: image('photo-1610425712165-27a964a27bc5'),
      tag: 'Exclusivo',
      description: 'Formato mini con detalles modernos para espacios pequeños.',
      available: true,
      popularity: 91,
      createdAt: new Date('2026-04-05'),
    },
    {
      name: 'Olivia Premium',
      category: 'coleccion-premium',
      collection: 'heritage',
      price: 240000,
      imageUrl: image('photo-1445205170230-053b83016050'),
      tag: 'Premium',
      description: 'La pieza mas elaborada, con materiales nobles y estilo teatral.',
      available: true,
      popularity: 99,
      createdAt: new Date('2025-11-20'),
    },
    {
      name: 'Sofía Handmade',
      category: 'personalizadas',
      collection: 'atelier',
      price: 170000,
      imageUrl: image('photo-1490481651871-ab68de25d43d'),
      tag: null,
      description: 'Cada puntada esta hecha con calma, textura y caracter propio.',
      available: true,
      popularity: 70,
      createdAt: new Date('2026-03-22'),
    },
    {
      name: 'Julieta Charm',
      category: 'munecas-clasicas',
      collection: 'heritage',
      price: 115000,
      imageUrl: image('photo-1596755094514-f87e34085b2c'),
      tag: null,
      description: 'Minimalismo delicado, lineas limpias y colores faciles de amar.',
      available: true,
      popularity: 80,
      createdAt: new Date('2026-01-30'),
    },
    {
      name: 'Antonia Pearl',
      category: 'edicion-regalo',
      collection: 'moments',
      price: 155000,
      imageUrl: image('photo-1558769132-cb1aea458c5e'),
      tag: 'Ultimas unidades',
      description: 'Tonos perla y tierra con certificado decorativo incluido.',
      available: true,
      popularity: 89,
      createdAt: new Date('2026-02-14'),
    },
  ];

  for (const doll of dolls) {
    const categoryId = byCategory.get(doll.category);
    const collectionId = byCollection.get(doll.collection);

    if (!categoryId || !collectionId) {
      throw new Error(`No se encontro relacion para ${doll.name}`);
    }

    await prisma.doll.upsert({
      where: { slug: slugify(doll.name) },
      update: {
        name: doll.name,
        description: doll.description,
        price: doll.price,
        imageUrl: doll.imageUrl,
        tag: doll.tag,
        available: doll.available,
        popularity: doll.popularity,
        createdAt: doll.createdAt,
        categoryId,
        collectionId,
      },
      create: {
        name: doll.name,
        slug: slugify(doll.name),
        description: doll.description,
        price: doll.price,
        imageUrl: doll.imageUrl,
        tag: doll.tag,
        available: doll.available,
        popularity: doll.popularity,
        createdAt: doll.createdAt,
        categoryId,
        collectionId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
