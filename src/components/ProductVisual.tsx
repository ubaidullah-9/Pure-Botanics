import React from 'react';

interface ProductVisualProps {
  type: 'shilajit' | 'hair-oil' | 'combo';
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ type, className = '' }) => {
  if (type === 'shilajit') {
    return (
      <div className={`relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1813] via-[#0d0c0a] to-[#171410] flex items-center justify-center p-6 border border-amber-900/30 group ${className}`}>
        {/* Ambient Warm Golden Mountain Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Mountain Peaks Silhouette in background */}
        <svg className="absolute bottom-8 inset-x-0 w-full h-24 text-amber-950/20 opacity-60" viewBox="0 0 400 100" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,100 L50,45 L110,80 L180,20 L240,65 L310,30 L370,75 L400,50 L400,100 Z" />
        </svg>

        {/* Realistic Luxury Shilajit Jar Visual */}
        <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:scale-105">
          {/* Jar Lid - Brushed Gold */}
          <div className="w-32 h-6 rounded-t-md bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-lg border-b border-amber-800/40 relative">
            <div className="absolute inset-x-4 top-1 h-[1px] bg-amber-100/60" />
            <div className="absolute inset-x-0 bottom-0.5 h-[1px] bg-amber-900/40" />
          </div>

          {/* Jar Body - Heavy Matte Obsidian Glass */}
          <div className="w-36 h-28 bg-gradient-to-b from-[#18181b] via-[#121214] to-[#09090b] rounded-b-xl shadow-2xl border border-amber-500/20 relative flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Gloss reflection */}
            <div className="absolute -left-6 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

            {/* Gold Foil Label */}
            <div className="w-full py-2 px-2.5 rounded bg-gradient-to-r from-amber-950/70 via-black/80 to-amber-950/70 border border-amber-500/40 text-center shadow-inner">
              <span className="text-[9px] tracking-widest text-amber-400 font-mono uppercase block">PURE BOTANICS</span>
              <span className="text-sm font-serif-luxury font-bold text-amber-200 tracking-wider block drop-shadow-sm">PURE AFTABI</span>
              <div className="flex items-center justify-center gap-1.5 my-0.5">
                <span className="h-[1px] w-4 bg-amber-500/40" />
                <span className="text-[11px] font-urdu text-amber-300 leading-none">خالص گلگت سلاجیت</span>
                <span className="h-[1px] w-4 bg-amber-500/40" />
              </div>
              <span className="text-[8px] text-amber-400/80 font-mono tracking-tight block">68.4% FULVIC ACID · 20G</span>
            </div>
          </div>

          {/* Artisan Wooden Spoon with dripping amber resin */}
          <div className="absolute -right-10 top-12 flex items-center transform rotate-25">
            <div className="w-16 h-2.5 bg-gradient-to-r from-amber-800 to-amber-900 rounded-l shadow-md relative">
              {/* Spoon Bowl */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-5 rounded-r-full bg-amber-950 border border-amber-800 shadow-inner flex items-center justify-center">
                {/* Glossy Dark Amber Shilajit Resin Drop */}
                <div className="w-4 h-3 rounded-full bg-gradient-to-br from-black via-amber-950 to-amber-900 shadow-md relative">
                  <div className="absolute top-0.5 right-1 w-1 h-1 rounded-full bg-amber-200/60" />
                  <div className="absolute -bottom-2 right-1.5 w-1.5 h-2.5 bg-black rounded-b-full shadow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust pill subtle caption */}
        <div className="absolute bottom-3 left-4 text-xs text-amber-300/80 flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>PCSIR Lab Batch #KHI-9428</span>
        </div>
      </div>
    );
  }

  if (type === 'hair-oil') {
    return (
      <div className={`relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1b14] via-[#08120d] to-[#050f09] flex items-center justify-center p-6 border border-emerald-900/40 group ${className}`}>
        {/* Ambient Botanical Emerald Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Botanical leaf silhouettes */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />

        {/* Luxury Emerald Hair Oil Dropper Bottle */}
        <div className="relative z-10 flex flex-col items-center transform transition-transform duration-500 group-hover:scale-105">
          {/* Dropper Squeeze Bulb */}
          <div className="w-7 h-8 bg-black rounded-t-full border border-zinc-800 shadow" />
          {/* Gold Collar Ring */}
          <div className="w-10 h-3 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 rounded-sm shadow-sm" />

          {/* Emerald Glass Bottle Body */}
          <div className="w-24 h-36 bg-gradient-to-b from-emerald-900 via-emerald-950 to-black rounded-b-2xl border border-emerald-500/30 shadow-2xl relative flex flex-col items-center justify-center px-2 overflow-hidden">
            {/* Glass reflection beam */}
            <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent skew-x-12 pointer-events-none" />

            {/* Botanical Label */}
            <div className="w-full py-2.5 px-1.5 rounded bg-black/80 border border-emerald-500/30 text-center backdrop-blur-xs">
              <span className="text-[8px] tracking-widest text-emerald-400 font-mono uppercase block">ORGANIC HERBAL</span>
              <span className="text-xs font-serif-luxury font-bold text-emerald-100 tracking-wider block">HAIR REGROWTH</span>
              <span className="text-[11px] font-urdu text-emerald-300 leading-none block my-0.5">ہربل ہیئر آئل</span>
              <span className="text-[7.5px] text-emerald-400/80 font-mono tracking-tight block">14 BOTANICALS · 200ML</span>
            </div>
          </div>

          {/* Floating Botanical accents (Rosemary & Amla graphics) */}
          <div className="absolute -left-10 bottom-4 flex flex-col items-center text-emerald-400/80 text-xs font-medium">
            <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/40 text-[10px]">Rosemary + Amla</span>
          </div>
        </div>

        {/* Bottom subtle caption */}
        <div className="absolute bottom-3 left-4 text-xs text-emerald-300/80 flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Cold-Pressed · 0% Mineral Oil</span>
        </div>
      </div>
    );
  }

  // Combo Pack Visual
  return (
    <div className={`relative w-full aspect-16/9 md:aspect-21/9 rounded-2xl overflow-hidden bg-gradient-to-r from-[#171410] via-[#0f1412] to-[#0b1812] flex items-center justify-center p-6 border border-amber-500/30 group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center justify-center gap-6 md:gap-12">
        {/* Shilajit Mini Jar */}
        <div className="flex flex-col items-center transform -rotate-3 transition-transform duration-300 group-hover:rotate-0">
          <div className="w-20 h-4 rounded-t bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700" />
          <div className="w-24 h-20 bg-gradient-to-b from-[#18181b] to-black rounded-b-lg border border-amber-500/30 flex flex-col items-center justify-center p-2 text-center shadow-xl">
            <span className="text-[8px] text-amber-400 font-mono font-bold">AFTABI SHILAJIT</span>
            <span className="text-[10px] font-urdu text-amber-200">خالص سلاجیت</span>
            <span className="text-[7px] text-amber-300/70">20G JAR</span>
          </div>
        </div>

        {/* Plus Symbol */}
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-lg font-bold">
          +
        </div>

        {/* Hair Oil Mini Bottle */}
        <div className="flex flex-col items-center transform rotate-3 transition-transform duration-300 group-hover:rotate-0">
          <div className="w-5 h-6 bg-black rounded-t-full border border-zinc-700" />
          <div className="w-7 h-2 bg-gradient-to-r from-amber-500 to-amber-400" />
          <div className="w-16 h-24 bg-gradient-to-b from-emerald-900 to-black rounded-b-xl border border-emerald-500/30 flex flex-col items-center justify-center p-1.5 text-center shadow-xl">
            <span className="text-[7.5px] text-emerald-400 font-mono font-bold">HERBAL OIL</span>
            <span className="text-[10px] font-urdu text-emerald-200">ہیئر آئل</span>
            <span className="text-[7px] text-emerald-300/70">200ML</span>
          </div>
        </div>

        {/* Free Gifts Callout */}
        <div className="hidden sm:flex flex-col text-left pl-4 border-l border-white/10">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">FREE INCLUSIONS</span>
          <span className="text-sm font-semibold text-white">✓ Handcrafted Brass Dosing Spoon</span>
          <span className="text-xs text-emerald-400 mt-1 font-medium">✓ Free Priority Courier Delivery</span>
        </div>
      </div>

      <div className="absolute top-3 right-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md">
        SAVE RS. 2,350 (BEST VALUE)
      </div>
    </div>
  );
};
