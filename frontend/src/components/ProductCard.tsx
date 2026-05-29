import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import type { Doll } from '../data/dolls';

interface ProductCardProps {
  product: Doll;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group cursor-pointer flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        {/* Badges */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] tracking-widest uppercase px-2 py-1 font-medium">
            {product.tag}
          </div>
        )}

        {/* Buttons (Hover) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
          <button className="bg-white p-2 rounded-full shadow-sm text-neutral-600 hover:text-black hover:scale-110 transition-transform">
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 z-10">
          <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs tracking-widest uppercase font-medium shadow-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
            <ShoppingBag size={14} /> Añadir
          </button>
        </div>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <h3 className="text-sm font-medium text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-300 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-900 font-semibold">{formatCurrency(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
