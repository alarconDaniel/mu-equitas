import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Doll } from '../data/dolls';
import { getDollBySlug } from '../services/dollsService';

const featuredProductSlugs = [
  'tm-opera-o',
  'burnice-white',
  'jane-doe',
  'ellen-joe',
  'agnes-tachyon',
];

export default function FeaturedProducts() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [featured, setFeatured] = useState<Doll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    Promise.all(featuredProductSlugs.map((slug) => getDollBySlug(slug)))
      .then((dolls) => {
        if (isMounted) {
          setFeatured(dolls);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFeatured([]);
          setError('No pudimos cargar los favoritos por ahora.');
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
  }, []);

  const getStepSize = () => {
    const cardWidth = firstCardRef.current?.offsetWidth ?? 320;
    const gap = trackRef.current
      ? parseFloat(window.getComputedStyle(trackRef.current).gap || '0')
      : 24;

    return cardWidth + gap;
  };

  const scrollRight = () => {
    if (isAnimating || featured.length <= 1) return;

    const step = getStepSize();

    setDirection('right');
    setTransitionEnabled(true);
    setIsAnimating(true);
    setTranslateX(-step);
  };

  const scrollLeft = () => {
    if (isAnimating || featured.length <= 1) return;

    const step = getStepSize();

    setDirection('left');
    setTransitionEnabled(false);
    setIsAnimating(true);

    setFeatured((current) => {
      const lastItem = current[current.length - 1];
      return [lastItem, ...current.slice(0, -1)];
    });

    setTranslateX(-step);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setTranslateX(0);
      });
    });
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !isAnimating) return;

    if (direction === 'right') {
      setTransitionEnabled(false);

      setFeatured((current) => {
        const [firstItem, ...rest] = current;
        return [...rest, firstItem];
      });

      setTranslateX(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
          setDirection(null);
        });
      });

      return;
    }

    setIsAnimating(false);
    setDirection(null);
  };

  return (
    <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10 border-b border-neutral-200 pb-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-widest uppercase">
          Favoritos de nuestros clientes
        </h2>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            disabled={isAnimating}
            className="p-2 border border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          <button
            onClick={scrollRight}
            disabled={isAnimating}
            className="p-2 border border-neutral-300 rounded-full text-neutral-600 hover:text-black hover:border-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="py-16 text-sm text-neutral-500">Cargando favoritos...</p>
      ) : error ? (
        <p className="py-16 text-sm text-neutral-500">{error}</p>
      ) : (
        <div className="overflow-hidden pb-8">
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex gap-4 md:gap-6"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: transitionEnabled
                ? 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
              willChange: 'transform',
            }}
          >
            {featured.map((doll, index) => (
              <div
                key={doll.id}
                ref={index === 0 ? firstCardRef : null}
                className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] shrink-0"
              >
                <ProductCard product={doll} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}