import React from 'react';

export const GlobalAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* 1. Deep Forest / Near-Black Base Background */}
      <div className="absolute inset-0 bg-[#0a1410]" />

      {/* 2. Soft Atmospheric Ambient Glow Layer */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen scale-110 filter blur-[45px] transition-opacity duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 25%, rgba(125, 140, 121, 0.35) 0%, rgba(15, 35, 26, 0.45) 45%, transparent 75%)`
        }}
      />

      {/* 3. Subtle Dark Contrast & Vignette Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-contrast-[1.04]" />
    </div>
  );
};
