import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/images/home/hero/banner1.png',
    title: 'MUÑECAS CON ESTILO, DETALLE Y PERSONALIDAD',
    subtitle: 'Descubre piezas únicas para regalar, coleccionar y enamorar.',
    buttonText: 'Ver catálogo',
    link: '/catalogo',
    overlay: 'bg-black/30'
  },
  {
    image: '/images/home/hero/banner2.png',
    title: 'CON LA MAYOR ATENCIÓN AL DETALLE',
    subtitle: 'Diseños especiales pensados para contar historias únicas.',
    buttonText: 'Descubre',
    link: '/catalogo',
    overlay: 'bg-black/40' // slightly darker to make white text pop
  },
  {
    image: '/images/home/hero/banner3.png',
    title: 'REGALOS QUE GUARDAN RECUERDOS',
    subtitle: 'Muñecas delicadas, elegantes y llenas de significado.',
    buttonText: 'Explorar colección',
    link: '/catalogo',
    overlay: 'bg-black/30'
  },
  {
    image: '/images/home/hero/banner4.png',
    title: 'ARCILLA PERSONALIZADA QUE COBRA VIDA',
    subtitle: 'Muñecos de arcilla con el más puro y especifico detalle.',
    buttonText: 'Explorar colección',
    link: '/catalogo',
    overlay: 'bg-black/30'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-stone-900">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          
          {/* Dark Overlay for contrast */}
          <div className={`absolute inset-0 ${slides[current].overlay}`} />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-widest max-w-5xl uppercase leading-[1.1]"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-white/90 text-sm md:text-lg mt-6 max-w-2xl font-medium tracking-wide"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="mt-10"
            >
              <Link 
                to={slides[current].link}
                className="bg-white text-black px-8 py-4 text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300"
              >
                {slides[current].buttonText}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all z-20"
      >
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all z-20"
      >
        <ChevronRight size={32} strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-500 ease-out ${
              current === idx ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
