import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { dolls as mockDolls, type Doll } from '../data/dolls';
import { getDolls } from '../services/dollsService';

const categories = [
  'Todas',
  'Muñecas Clásicas',
  'Muñecas Personalizadas',
  'Edición Regalo',
  'Colección Premium',
];

const sortOptions = {
  novedad: { sortBy: 'createdAt', order: 'desc' },
  precio_asc: { sortBy: 'price', order: 'asc' },
  precio_desc: { sortBy: 'price', order: 'desc' },
} as const;

function normalizeInitialCategory(category: string | null) {
  if (!category) {
    return 'Todas';
  }

  return category === 'Personalizadas' ? 'Muñecas Personalizadas' : category;
}

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const initCategory = normalizeInitialCategory(searchParams.get('categoria'));

  const [activeCategory, setActiveCategory] = useState<string>(initCategory);
  const [sortOption, setSortOption] = useState<keyof typeof sortOptions>('novedad');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredDolls, setFilteredDolls] = useState<Doll[]>(mockDolls);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const sort = sortOptions[sortOption];

    setIsLoading(true);
    getDolls({
      search: searchQuery || undefined,
      category: activeCategory !== 'Todas' ? activeCategory : undefined,
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
          {activeCategory !== 'Todas' && (
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
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="accent-black w-4 h-4"
                    />
                    <span className="text-sm text-neutral-600 group-hover:text-black transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveCategory('Todas');
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
            {filteredDolls.length > 0 ? (
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
