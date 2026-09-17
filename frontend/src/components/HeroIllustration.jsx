import React from 'react';
import homeServiceImg from '../assets/homeservice.png';

export function HeroIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <img 
        src={homeServiceImg} 
        alt="Home Service" 
        className="w-full h-auto max-w-[520px] object-cover rounded-3xl shadow-lg" 
      />
    </div>
  );
}