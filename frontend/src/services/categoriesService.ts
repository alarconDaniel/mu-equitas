import { apiFetch } from './api';

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
  _count?: { dolls: number };
}

export function getCategories() {
  return apiFetch<CatalogCategory[]>('/categories');
}

export function getCategoryBySlug(slug: string) {
  return apiFetch<CatalogCategory>(`/categories/${slug}`);
}
