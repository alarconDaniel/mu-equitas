import { Doll, dolls as mockDolls } from '../data/dolls';
import { apiFetch } from './api';

type SortBy = 'price' | 'createdAt' | 'popularity' | 'name';
type SortOrder = 'asc' | 'desc';

interface ApiDoll {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  tag?: string | null;
  available: boolean;
  popularity: number;
  createdAt: string;
  category?: { name: string; slug: string };
  collection?: { name: string; slug: string };
}

export interface DollsQuery {
  search?: string;
  category?: string;
  collection?: string;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortBy;
  order?: SortOrder;
  page?: number;
  limit?: number;
}

export interface PaginatedDolls {
  data: Doll[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  source: 'api' | 'mock';
}

interface ApiPaginatedDolls {
  data: ApiDoll[];
  meta: PaginatedDolls['meta'];
}

const categorySlugs: Record<string, string> = {
  'Muñecas Clásicas': 'munecas-clasicas',
  'Muñecas Personalizadas': 'personalizadas',
  Personalizadas: 'personalizadas',
  'Edición Regalo': 'edicion-regalo',
  'Colección Premium': 'coleccion-premium',
  Accesorios: 'accesorios',
  'Mini Muñecas': 'mini-munecas',
};

export async function getDolls(query: DollsQuery = {}): Promise<PaginatedDolls> {
  try {
    const params = buildQueryParams(query);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    const response = await apiFetch<ApiPaginatedDolls>(`/dolls${suffix}`);

    return {
      ...response,
      data: response.data.map(normalizeDoll),
      source: 'api',
    };
  } catch {
    const data = filterMockDolls(query);

    return {
      data,
      meta: {
        page: query.page ?? 1,
        limit: query.limit ?? data.length,
        total: data.length,
        totalPages: 1,
      },
      source: 'mock',
    };
  }
}

export async function getFeaturedDolls(limit = 8) {
  const result = await getDolls({
    sortBy: 'popularity',
    order: 'desc',
    page: 1,
    limit,
  });

  return result.data;
}

function buildQueryParams(query: DollsQuery) {
  const params = new URLSearchParams();
  const category = normalizeCategory(query.category);

  if (query.search) params.set('search', query.search);
  if (category) params.set('category', category);
  if (query.collection) params.set('collection', query.collection);
  if (query.available !== undefined) params.set('available', String(query.available));
  if (query.minPrice !== undefined) params.set('minPrice', String(query.minPrice));
  if (query.maxPrice !== undefined) params.set('maxPrice', String(query.maxPrice));
  if (query.sortBy) params.set('sortBy', query.sortBy);
  if (query.order) params.set('order', query.order);
  if (query.page) params.set('page', String(query.page));
  if (query.limit) params.set('limit', String(query.limit));

  return params;
}

function normalizeDoll(doll: ApiDoll): Doll {
  return {
    id: doll.id,
    name: doll.name,
    slug: doll.slug,
    category: doll.category?.name ?? '',
    categorySlug: doll.category?.slug,
    collection: doll.collection?.name ?? '',
    collectionSlug: doll.collection?.slug,
    price: doll.price,
    image: doll.imageUrl,
    tag: doll.tag,
    description: doll.description,
    available: doll.available,
    popularity: doll.popularity,
    createdAt: doll.createdAt,
  };
}

function filterMockDolls(query: DollsQuery) {
  const category = normalizeCategory(query.category);
  const search = query.search?.toLowerCase();
  const page = query.page ?? 1;
  const limit = query.limit ?? mockDolls.length;

  let filtered = [...mockDolls];

  if (category) {
    filtered = filtered.filter((doll) => normalizeCategory(doll.category) === category);
  }

  if (query.available !== undefined) {
    filtered = filtered.filter((doll) => doll.available === query.available);
  }

  if (query.minPrice !== undefined) {
    filtered = filtered.filter((doll) => doll.price >= query.minPrice!);
  }

  if (query.maxPrice !== undefined) {
    filtered = filtered.filter((doll) => doll.price <= query.maxPrice!);
  }

  if (search) {
    filtered = filtered.filter((doll) =>
      [doll.name, doll.description, doll.category, doll.collection]
        .join(' ')
        .toLowerCase()
        .includes(search),
    );
  }

  filtered.sort((a, b) =>
    compareDolls(a, b, query.sortBy ?? 'createdAt', query.order ?? 'desc'),
  );

  const start = (page - 1) * limit;
  return filtered.slice(start, start + limit);
}

function compareDolls(a: Doll, b: Doll, sortBy: SortBy, order: SortOrder) {
  const direction = order === 'asc' ? 1 : -1;

  if (sortBy === 'createdAt') {
    return (
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction
    );
  }

  if (sortBy === 'name') {
    return a.name.localeCompare(b.name) * direction;
  }

  return (a[sortBy] - b[sortBy]) * direction;
}

function normalizeCategory(category?: string) {
  if (!category || category === 'Todas') {
    return undefined;
  }

  return categorySlugs[category] ?? category;
}
