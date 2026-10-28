import React from 'react';
import { translations } from '../data/translations';
import { Language, Product, BundleOption } from '../types';
import { Shield, Award, Truck, RotateCcw, ArrowRight, MessageCircle } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { buildSupportWhatsAppUrl } from '../services/storage';

interface HeroProps {
  lang: Language;
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenCheckout,
  featuredProduct,
}) => {
  const t = translations[lang];
  const popularBundle = featuredProduct.bundles.find((b) => b.isPopular) || featuredProduct.bundles[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 md:py-20 bg-gradient-to-b from-stone-950 via-[#100e0a] to-stone-950">
      {/* Background Subtle Mountain Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & High-Converting CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Origin Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Display Headline with text-wrap balance */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif-luxury font-bold text-stone-100 tracking-tight leading-[1.15] text-balance">
              <span className="block text-amber-200">{t.hero.titleLine1}</span>
              <span className="block text-emerald-400">{t.hero.titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onOpenCheckout(featuredProduct, popularBundle)}
                className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transform active:scale-98"
              >
                <span>{t.hero.ctaCod}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildSupportWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-sm font-semibold border border-stone-800 hover:border-emerald-500/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.ctaWhatsApp}</span>
              </a>
            </div>

            {/* Reassurance text */}
            <div className="text-[11px] text-stone-400 font-mono">
              ✓ {t.hero.secureCheckout}
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <ProductVisual type="shilajit" className="shadow-2xl" />

            {/* Floating micro trust card */}
            <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-6 bg-stone-900/95 border border-amber-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                  PCSIR Certified
                </span>
                <span className="text-xs font-bold text-amber-200">
                  68.4% Pure Fulvic Acid
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Pakistani Trust Badges Strip (Full Width Row) */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <Shield className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-200">
              {t.hero.badge1}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-200">
              {t.hero.badge2}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-200">
              {t.hero.badge3}
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/40 border border-stone-800/60">
            <RotateCcw className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-200">
              {t.hero.badge4}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
