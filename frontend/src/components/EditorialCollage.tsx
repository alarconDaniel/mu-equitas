import React from 'react';
import { Link } from 'react-router-dom';

export default function EditorialCollage() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 
        Grid Layout: 1 large left, 2 medium right, 1 solid block, 1 banner 
        We'll use standard CSS grid.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[800px] mb-4">
        
        {/* Left Large Image */}
        <div className="lg:col-span-8 h-[500px] lg:h-full relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1515347619362-d278065b7074?auto=format&fit=crop&q=80&w=1200" 
            alt="Nueva Colección" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-10 left-10 text-white z-10 max-w-sm">
            <h3 className="text-[10px] tracking-[0.3em] font-medium uppercase mb-3">Piezas únicas para momentos únicos</h3>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest leading-tight mb-6">NUEVA COLECCIÓN</h2>
            <Link to="/catalogo" className="border-b border-white pb-1 text-sm tracking-widest uppercase font-medium hover:text-neutral-300 hover:border-neutral-300 transition-colors">
              Descubrir todo
            </Link>
          </div>
        </div>

        {/* Right Side Stack */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-[800px] lg:h-full">
          {/* Top image */}
          <div className="flex-1 relative group overflow-hidden bg-stone-100">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
              alt="Detalles"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
             <div className="absolute inset-0 bg-black/10" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <h3 className="text-xl font-medium tracking-widest uppercase mb-2">Detalles hechos para enamorar</h3>
              <Link to="/nosotros" className="text-xs tracking-widest border-b border-white pb-1">Nuestra historia</Link>
            </div>
          </div>

          {/* Bottom Solid Block */}
          <div className="flex-1 bg-stone-900 text-white p-10 flex flex-col justify-center items-center text-center">
            <span className="text-xs tracking-[0.2em] font-medium uppercase mb-4 text-stone-300">Regalos especiales</span>
            <h3 className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-8 leading-snug text-balance">
              El arte de regalar<br/>con intención.
            </h3>
            <Link to="/catalogo?categoria=Edición Regalo" className="bg-white text-black px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-stone-200 transition-colors">
              Ver opciones
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Promotional Banner */}
      <div className="w-full relative h-[300px] overflow-hidden group mt-4">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Campaign"
          className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <p className="text-sm tracking-[0.3em] font-medium uppercase mb-4">Temporada 2026</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-widest uppercase">LA BELLEZA DE LO SUTIL</h2>
          <Link to="/catalogo" className="mt-8 border border-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors font-medium">
            Ver campaña
          </Link>
        </div>
      </div>

    </section>
  );
}
