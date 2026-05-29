export interface Doll {
  id: string;
  code?: string | null;
  name: string;
  slug?: string;
  category: string;
  categorySlug?: string;
  collection: string;
  collectionSlug?: string;
  price: number;
  image: string;
  tag?: string | null;
  productType?: 'doll' | 'accessory' | 'keychain';
  stockQuantity?: number;
  isFeatured?: boolean;
  description: string;
  available: boolean;
  popularity: number;
  createdAt: string;
  updatedAt?: string;
}

export const dolls: Doll[] = [
  {
    id: "d1",
    name: "Burnice White",
    category: "Colección Premium",
    collection: "Winter Elegance",
    price: 185000,
    image: "https://images.unsplash.com/photo-1544329241-118817478051?auto=format&fit=crop&q=80&w=800",
    tag: "Nuevo",
    description: "Una pieza elegante con detalles bordados a mano y materiales de alta costura.",
    available: true,
    popularity: 95,
    createdAt: "2026-05-01"
  },
  {
    id: "d2",
    name: "Jane Doe",
    category: "Muñecas Clásicas",
    collection: "Essentials",
    price: 120000,
    image: "https://images.unsplash.com/photo-1533038590840-1c7987e9ad15?auto=format&fit=crop&q=80&w=800",
    tag: "Más vendido",
    description: "Diseño clásico atemporal, perfecta para cualquier rincón especial.",
    available: true,
    popularity: 98,
    createdAt: "2026-03-15"
  },
  {
    id: "d3",
    name: "Ellen Joe",
    category: "Edición Regalo",
    collection: "Moments",
    price: 145000,
    image: "https://images.unsplash.com/photo-1588636733221-da3b7b250de8?auto=format&fit=crop&q=80&w=800",
    tag: "Regalo Ideal",
    description: "Incluye empaque premium de regalo y certificado de autenticidad.",
    available: true,
    popularity: 88,
    createdAt: "2026-04-20"
  },
  {
    id: "d4",
    name: "Grace Howard",
    category: "Colección Premium",
    collection: "Noir",
    price: 210000,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    tag: "Edición Limitada",
    description: "Sofisticación pura. Vestuario en tonos profundos con acentos metálicos.",
    available: false,
    popularity: 100,
    createdAt: "2026-01-10"
  },
  {
    id: "d5",
    name: "Zhu Yuan",
    category: "Muñecas Personalizadas",
    collection: "Atelier",
    price: 160000,
    image: "https://images.unsplash.com/photo-1618691515228-3e440b8a3291?auto=format&fit=crop&q=80&w=800",
    tag: "Personalizable",
    description: "Confeccionada a medida. Puedes elegir colores y accesorios iniciales.",
    available: true,
    popularity: 85,
    createdAt: "2026-05-10"
  },
  {
    id: "d6",
    name: "Nicole Demara",
    category: "Muñecas Clásicas",
    collection: "Spring Vibe",
    price: 135000,
    image: "https://images.unsplash.com/photo-1621509930438-6decd716260a?auto=format&fit=crop&q=80&w=800",
    tag: "",
    description: "Delicadeza de primavera, con texturas de lino y algodón orgánico.",
    available: true,
    popularity: 75,
    createdAt: "2026-02-28"
  },
  {
    id: "d7",
    name: "Amby Demara",
    category: "Edición Regalo",
    collection: "Spring Vibe",
    price: 138000,
    image: "https://images.unsplash.com/photo-1580231649964-b0451cf57b85?auto=format&fit=crop&q=80&w=800",
    tag: "Nuevo",
    description: "Hermana de colección. Incluye base de exhibición grabada.",
    available: true,
    popularity: 82,
    createdAt: "2026-05-15"
  },
  {
    id: "d8",
    name: "Nekomata",
    category: "Colección Premium",
    collection: "Avant-Garde",
    price: 195000,
    image: "https://images.unsplash.com/photo-1610425712165-27a964a27bc5?auto=format&fit=crop&q=80&w=800",
    tag: "Exclusivo",
    description: "Diseño audaz y moderno. Para espacios contemporáneos.",
    available: true,
    popularity: 91,
    createdAt: "2026-04-05"
  },
  {
    id: "d9",
    name: "Yidhari Murphy",
    category: "Muñecas Personalizadas",
    collection: "Atelier",
    price: 170000,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    tag: "",
    description: "Detalle artesanal impecable, cada puntada cuenta una historia.",
    available: true,
    popularity: 70,
    createdAt: "2026-03-22"
  },
  {
    id: "d10",
    name: "TM Opera O",
    category: "Colección Premium",
    collection: "Heritage",
    price: 240000,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
    tag: "Premium",
    description: "La joya de la corona. Materiales importados y diseño teatral.",
    available: true,
    popularity: 99,
    createdAt: "2025-11-20"
  },
  {
    id: "d11",
    name: "Agnes Tachyon",
    category: "Muñecas Clásicas",
    collection: "Essentials",
    price: 115000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    tag: "",
    description: "Minimalismo puro. Líneas limpias y colores neutros.",
    available: true,
    popularity: 80,
    createdAt: "2026-01-30"
  },
  {
    id: "d12",
    name: "Jungle Pocket",
    category: "Edición Regalo",
    collection: "Moments",
    price: 155000,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    tag: "Últimas unidades",
    description: "Texturas ricas y tonos tierra. Viene con certificado decorativo.",
    available: true,
    popularity: 89,
    createdAt: "2026-02-14"
  }
];
