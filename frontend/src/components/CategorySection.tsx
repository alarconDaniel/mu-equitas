import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Colección Premium',
    slug: 'coleccion-premium',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Muñecas Clásicas',
    slug: 'munecas-clasicas',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Edición Regalo',
    slug: 'edicion-regalo',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Muñecas Al Detalle',
    slug: 'munecas-personalizadas',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Mini Muñecas',
    slug: 'mini-munecas',
    image:
      'https://images.unsplash.com/photo-1621509930438-6decd716260a?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Accesorios',
    slug: 'accesorios',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600',
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-widest uppercase mb-3">Explora por categoría</h2>
        <div className="w-16 h-[1px] bg-black mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link to={`/catalogo?category=${cat.slug}`} key={cat.slug} className="group cursor-pointer flex flex-col items-center">
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-stone-100 mb-4 rounded-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <span className="text-sm font-medium tracking-wide uppercase text-neutral-900 group-hover:underline underline-offset-4 decoration-neutral-300 text-center">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
