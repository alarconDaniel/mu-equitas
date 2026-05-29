import { apiFetch } from './api';

export interface CatalogCollection {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  _count?: { dolls: number };
}

export function getCollections() {
  return apiFetch<CatalogCollection[]>('/collections');
}

export function getCollectionBySlug(slug: string) {
  return apiFetch<CatalogCollection>(`/collections/${slug}`);
}
