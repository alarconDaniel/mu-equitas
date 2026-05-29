import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { dolls as mockDolls } from '../data/dolls';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = mockDolls.slice(0, 8);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10 border-b border-neutral-200 pb-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-widest uppercase">
          Favoritos de nuestros clientes
        </h2>
        <div className="flex gap-2">
          <button onClick={scrollLeft} className="p-2 border border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button onClick={scrollRight} className="p-2 border border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {featured.map((doll) => (
          <div key={doll.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] snap-center shrink-0">
            <ProductCard product={doll} />
          </div>
        ))}
      </div>
    </section>
  );
}
