import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif tracking-widest font-semibold block mb-6">
              MUÑEQUITAS
            </Link>
            <p className="text-stone-400 text-sm mb-6 leading-relaxed">
              Diseño con detalle. Regalos con significado. Piezas únicas para coleccionar y enamorar.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-stone-200">Navegación</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-stone-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="text-sm text-stone-400 hover:text-white transition-colors">Catálogo</Link></li>
              <li><Link to="/nosotros" className="text-sm text-stone-400 hover:text-white transition-colors">Acerca de nosotros</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-stone-200">Asistencia</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-stone-400 hover:text-white transition-colors">Envíos y devoluciones</Link></li>
              <li><Link to="#" className="text-sm text-stone-400 hover:text-white transition-colors">Cuidado de productos</Link></li>
              <li><Link to="#" className="text-sm text-stone-400 hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="#" className="text-sm text-stone-400 hover:text-white transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-stone-200">Redes sociales</h4>
            <ul className="space-y-4">
              <li><a   href="https://www.instagram.com/__mateocasas?igsh=cHUzcDFwcHU3MWVw" className="text-sm text-stone-400 hover:text-white transition-colors">Instagram</a></li>
              <li><a   href="https://www.tiktok.com/@upminaa.cos?_r=1&_t=ZS-96kzLspntlX" className="text-sm text-stone-400 hover:text-white transition-colors">Pinterest</a></li>
              <li><a   href="https://pin.it/55qBM5iaU" className="text-sm text-stone-400 hover:text-white transition-colors">TikTok</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 tracking-wider">
          <p>© 2026 Muñequitas. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-stone-300">Términos y condiciones</Link>
            <Link to="#" className="hover:text-stone-300">Política de privacidad</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
