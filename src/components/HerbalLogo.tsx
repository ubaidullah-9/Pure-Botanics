import React from 'react';

interface HerbalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const HerbalLogo: React.FC<HerbalLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 36, text: 'text-lg sm:text-xl', sub: 'text-[10px]' },
    lg: { icon: 48, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 64, text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Luxury Botanical Herbal Crest SVG */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Gold Gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Emerald Gradient */}
            <linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="40%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>

            {/* Ambient Radial */}
            <radialGradient id="ambientLeafGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0" />
            </radialGradient>

            {/* Soft Shadow */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ambient Glow Disc */}
          <circle cx="50" cy="50" r="44" fill="url(#ambientLeafGlow)" />

          {/* Outer Royal Apothecary Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.6"
          />

          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#emeraldGrad)"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Mountain Silhouette Base (Karakoram Altitude Heritage) */}
          <path
            d="M26 68 L42 48 L52 58 L62 44 L74 68 Z"
            fill="#121815"
            stroke="url(#goldGrad)"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Central Twin Botanical Leaves (Herbal Sprout - Rosemary & Amla Sprig) */}
          {/* Main Left Leaf */}
          <path
            d="M50 72 C40 60 30 46 36 32 C44 32 50 42 50 72 Z"
            fill="url(#emeraldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="1"
            filter="url(#glow)"
          />

          {/* Central Leaf Vein */}
          <path
            d="M48 66 C44 54 41 44 38 34"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Right Complementary Leaf */}
          <path
            d="M50 72 C58 58 68 46 64 34 C56 34 50 44 50 72 Z"
            fill="url(#emeraldGrad)"
            stroke="#10B981"
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Right Leaf Vein */}
          <path
            d="M52 66 C56 54 59 44 62 36"
            stroke="#6EE7B7"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Crown Seed / Solar Pearl at Top (Sun/Energy Essence) */}
          <circle
            cx="50"
            cy="24"
            r="3.5"
            fill="url(#goldGrad)"
            filter="url(#glow)"
          />

          {/* Small herbal drops / droplets */}
          <circle cx="34" cy="46" r="1.5" fill="#FDE68A" opacity="0.9" />
          <circle cx="66" cy="48" r="1.5" fill="#FDE68A" opacity="0.9" />
        </svg>
      </div>

      {/* Typography Lockup */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif-luxury font-bold tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors leading-tight ${currentSize.text}`}
          >
            Pure Botanics
          </span>
          <span
            className={`font-mono uppercase tracking-[0.2em] text-emerald-400/90 font-medium ${currentSize.sub}`}
          >
            ORGANIC HERBAL CARE
          </span>
        </div>
      )}
    </div>
  );
};
