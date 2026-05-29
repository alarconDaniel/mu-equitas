import type { Doll } from '../data/dolls';
import { apiFetch } from './api';

type ProductType = 'doll' | 'accessory' | 'keychain';
type SortBy = 'price' | 'createdAt' | 'popularity' | 'name';
type SortOrder = 'asc' | 'desc';

interface ApiDoll {
  id: string;
  code?: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  tag?: string | null;
  productType: ProductType;
  available: boolean;
  stockQuantity: number;
  popularity: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt?: string;
  category?: { name: string; slug: string };
  collection?: { name: string; slug: string };
}

export interface DollsQuery {
  search?: string;
  category?: string;
  collection?: string;
  productType?: ProductType;
  available?: boolean;
  featured?: boolean;
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
}

interface ApiPaginatedDolls {
  data: ApiDoll[];
  meta: PaginatedDolls['meta'];
}

export async function getDolls(query: DollsQuery = {}): Promise<PaginatedDolls> {
  const params = buildQueryParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  const response = await apiFetch<ApiPaginatedDolls>(`/dolls${suffix}`);

  return {
    ...response,
    data: response.data.map(normalizeDoll),
  };
}

function buildQueryParams(query: DollsQuery) {
  const params = new URLSearchParams();

  if (query.search) params.set('search', query.search);
  if (query.category) params.set('category', query.category);
  if (query.collection) params.set('collection', query.collection);
  if (query.productType) params.set('productType', query.productType);
  if (query.available !== undefined) params.set('available', String(query.available));
  if (query.featured !== undefined) params.set('featured', String(query.featured));
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
    code: doll.code,
    name: doll.name,
    slug: doll.slug,
    category: doll.category?.name ?? '',
    categorySlug: doll.category?.slug,
    collection: doll.collection?.name ?? '',
    collectionSlug: doll.collection?.slug,
    price: Number(doll.price),
    image: doll.imageUrl,
    tag: doll.tag,
    productType: doll.productType,
    stockQuantity: doll.stockQuantity,
    isFeatured: doll.isFeatured,
    description: doll.description,
    available: doll.available,
    popularity: doll.popularity,
    createdAt: doll.createdAt,
    updatedAt: doll.updatedAt,
  };
}
