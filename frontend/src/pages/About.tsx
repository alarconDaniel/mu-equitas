import React from 'react';

export default function About() {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Image Side */}
        <div className="relative h-[600px] lg:h-[800px] w-full">
          <img 
            src="images/about/about-us-left.png" 
            alt="Nosotros" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-stone-100 -z-10 hidden lg:block"></div>
        </div>

        {/* Text Side */}
        <div className="flex flex-col justify-center">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-6">Nuestra Historia</h2>
          <h1 className="text-4xl md:text-5xl font-serif tracking-widest font-semibold mb-10 leading-snug">
            EL ARTE DE CREAR EMOCIONES
          </h1>
          
          <div className="space-y-6 text-neutral-600 leading-relaxed font-light mb-12">
            <p>
              En Muñequitas creemos que cada muñeca cuenta una historia. Creamos y seleccionamos piezas llenas de detalle, ternura y personalidad, pensadas para regalar momentos especiales, decorar espacios únicos y acompañar recuerdos que permanecen.
            </p>
            <p>
              Nuestra identidad nace de la delicadeza, el diseño y el cariño por los pequeños detalles. Más que vender muñecas, buscamos ofrecer experiencias: piezas que transmiten emoción, estilo y significado.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-3 text-black">Diseño con detalle</h3>
              <p className="text-sm text-neutral-500">Materiales nobles y costuras perfectas que marcan la diferencia.</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-3 text-black">Regalos con significado</h3>
              <p className="text-sm text-neutral-500">Piezas hechas para atesorar y transmitir sentimientos.</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-3 text-black">Colecciones únicas</h3>
              <p className="text-sm text-neutral-500">Ediciones limitadas y modelos creados con exclusividad.</p>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
