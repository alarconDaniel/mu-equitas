import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import CategorySection from '../components/CategorySection';
import EditorialCollage from '../components/EditorialCollage';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      <HeroCarousel />
      <CategorySection />
      <EditorialCollage />
      <FeaturedProducts />
    </div>
  );
}
