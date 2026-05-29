import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import type { Doll } from '../data/dolls';
import { getDolls } from '../services/dollsService';

const categories = [
  { label: 'Todas', value: 'all' },
  { label: 'Colección Premium', value: 'coleccion-premium' },
  { label: 'Muñecas Clásicas', value: 'munecas-clasicas' },
  { label: 'Edición Regalo', value: 'edicion-regalo' },
  { label: 'Muñecas Al Detalle', value: 'munecas-personalizadas' },
  { label: 'Mini Muñecas', value: 'mini-munecas' },
  { label: 'Accesorios', value: 'accesorios' },
];

const categoryValues = new Set(categories.map((category) => category.value));
const categoryAliases: Record<string, string> = {
  'Colección Premium': 'coleccion-premium',
  'Muñecas Clásicas': 'munecas-clasicas',
  'Edición Regalo': 'edicion-regalo',
  'Muñecas Al Detalle': 'munecas-personalizadas',
  'Muñecas Personalizadas': 'munecas-personalizadas',
  Personalizadas: 'munecas-personalizadas',
  'Mini Muñecas': 'mini-munecas',
  Accesorios: 'accesorios',
};

const sortOptions = {
  novedad: { sortBy: 'createdAt', order: 'desc' },
  precio_asc: { sortBy: 'price', order: 'asc' },
  precio_desc: { sortBy: 'price', order: 'desc' },
} as const;

function normalizeInitialCategory(category: string | null) {
  if (!category) {
    return 'all';
  }

  const normalizedCategory = categoryAliases[category] ?? category;

  if (!categoryValues.has(normalizedCategory)) {
    return 'all';
  }

  return normalizedCategory;
}

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') ?? searchParams.get('categoria');
  const [activeCategory, setActiveCategory] = useState<string>(() =>
    normalizeInitialCategory(categoryParam),
  );
  const [sortOption, setSortOption] = useState<keyof typeof sortOptions>('novedad');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredDolls, setFilteredDolls] = useState<Doll[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveCategory(normalizeInitialCategory(categoryParam));
  }, [categoryParam]);

  useEffect(() => {
    let isMounted = true;
    const sort = sortOptions[sortOption];

    setIsLoading(true);
    setError(null);
    getDolls({
      search: searchQuery || undefined,
      category: activeCategory !== 'all' ? activeCategory : undefined,
      sortBy: sort.sortBy,
      order: sort.order,
      page: 1,
      limit: 48,
    })
      .then((result) => {
        if (isMounted) {
          setFilteredDolls(result.data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFilteredDolls([]);
          setError('No pudimos cargar el catálogo. Verifica que el backend esté disponible.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory, sortOption, searchQuery]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 pb-6 border-b border-neutral-200">
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest uppercase mb-6">Catálogo</h1>

        {/* Main Search */}
        <div className="w-full max-w-md relative">
          <input
            type="text"
            placeholder="Buscar por nombre, colección o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-b border-black py-3 pl-3 pr-10 focus:outline-none bg-transparent placeholder-neutral-400 text-sm"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest"
        >
          <SlidersHorizontal size={16} /> Filtros{' '}
          {activeCategory !== 'all' && (
            <span className="bg-black text-white w-2 h-2 rounded-full inline-block ml-1"></span>
          )}
        </button>
        <span className="text-xs text-neutral-500">
          {isLoading ? 'Cargando...' : `${filteredDolls.length} productos`}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 relative">
        {/* Sidebar (Desktop) / Drawer (Mobile) */}
        <aside
          className={`
          lg:w-64 shrink-0
          ${isMobileFilterOpen ? 'block' : 'hidden'} lg:block
          mb-8 lg:mb-0 lg:sticky lg:top-24 h-fit
        `}
        >
          <div className="space-y-10">
            {/* Sort */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.1em] uppercase mb-4">Ordenar por</h3>
              <div className="space-y-3">
                {[
                  { value: 'novedad', label: 'Más recientes' },
                  { value: 'precio_asc', label: 'Precio: Menor a Mayor' },
                  { value: 'precio_desc', label: 'Precio: Mayor a Menor' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="sort"
                      value={opt.value}
                      checked={sortOption === opt.value}
                      onChange={() => setSortOption(opt.value as keyof typeof sortOptions)}
                      className="accent-black w-4 h-4"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="border-t border-neutral-200 pt-8">
              <h3 className="text-xs font-semibold tracking-[0.1em] uppercase mb-4">Categorías</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={activeCategory === cat.value}
                      onChange={() => setActiveCategory(cat.value)}
                      className="accent-black w-4 h-4"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveCategory('all');
                setSortOption('novedad');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-black border-b border-transparent hover:border-black transition-colors mt-8"
            >
              Limpiar filtros
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-end mb-6 text-xs text-neutral-500 uppercase tracking-widest">
            {isLoading ? 'Cargando...' : `${filteredDolls.length} productos`}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {isLoading ? (
              <div className="col-span-full py-20 text-center text-neutral-500">
                <p className="text-lg">Cargando catálogo...</p>
              </div>
            ) : error ? (
              <div className="col-span-full py-20 text-center text-neutral-500">
                <p className="text-lg">{error}</p>
              </div>
            ) : filteredDolls.length > 0 ? (
              filteredDolls.map((doll) => <ProductCard key={doll.id} product={doll} />)
            ) : (
              <div className="col-span-full py-20 text-center text-neutral-500">
                <p className="text-lg">No encontramos resultados para tu búsqueda.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-black underline underline-offset-4"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
