import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedSearch = searchQuery.trim();
    const params = new URLSearchParams();

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    }

    closeMenu();
    navigate(params.toString() ? `/catalogo?${params.toString()}` : '/catalogo');
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Nosotros', path: '/nosotros' },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? 'shadow-sm py-3' : 'py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden flex-1">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-neutral-900 focus:outline-none"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Links (Left) */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-neutral-500
                  ${location.pathname === link.path ? 'border-b border-black pb-1' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo (Center) */}
          <div className="flex-1 flex justify-center items-center">
            <Link to="/" className="text-2xl md:text-3xl font-serif tracking-widest text-black font-semibold">
              MUÑEQUITAS
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center justify-end space-x-5 flex-1">
            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden xl:flex items-center border-b border-neutral-300 pb-1 w-48 mr-4 group"
            >
              <input 
                type="text" 
                placeholder="¿Qué estás buscando?" 
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="bg-transparent border-none focus:outline-none w-full text-sm text-neutral-900 placeholder-neutral-400"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="text-neutral-500 group-hover:text-black transition-colors"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </form>

            <button
              onClick={() => handleSearchSubmit()}
              className="xl:hidden text-neutral-900 hover:text-neutral-500 transition-colors"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block text-neutral-900 hover:text-neutral-500 transition-colors">
              <User size={22} strokeWidth={1.5} />
            </button>
            <button className="text-neutral-900 hover:text-neutral-500 transition-colors">
              <Heart size={22} strokeWidth={1.5} />
            </button>
            <button className="text-neutral-900 hover:text-neutral-500 transition-colors relative">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
            onClick={closeMenu}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl transition-transform transform translate-x-0">
            <div className="p-5 flex justify-between items-center border-b border-neutral-100">
              <span className="text-lg font-serif tracking-widest font-semibold">MENU</span>
              <button onClick={closeMenu} className="text-neutral-500 hover:text-black">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Mobile Search */}
            <div className="px-5 py-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-neutral-300 pb-2">
                <button type="submit" aria-label="Buscar" className="text-neutral-400 mr-2">
                  <Search size={18} strokeWidth={1.5}/>
                </button>
                <input 
                  type="text" 
                  placeholder="¿Buscar..." 
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="bg-transparent border-none focus:outline-none w-full text-sm text-neutral-900"
                />
              </form>
            </div>

            <div className="px-5 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={closeMenu}
                  className="text-lg font-medium tracking-wide uppercase"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto p-5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-center space-x-6">
              <button className="text-neutral-700 flex flex-col items-center">
                <User size={20} strokeWidth={1.5}/>
                <span className="text-[10px] mt-1 uppercase tracking-wider">Mi Cuenta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
