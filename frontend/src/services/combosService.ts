import { apiFetch } from './api';

export interface ComboItem {
  id: string;
  code?: string | null;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  productType: 'doll' | 'accessory' | 'keychain';
  categorySlug?: string;
  collectionSlug?: string;
  quantity: number;
}

export interface Combo {
  id: string;
  code?: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  tag?: string | null;
  available: boolean;
  stockQuantity: number;
  popularity: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  items: ComboItem[];
}

export function getCombos() {
  return apiFetch<Combo[]>('/combos');
}

export function getComboBySlug(slug: string) {
  return apiFetch<Combo>(`/combos/${slug}`);
}
