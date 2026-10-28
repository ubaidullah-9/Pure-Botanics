import React, { useState } from 'react';
import { Product, BundleOption, BundleTier, Language } from '../types';
import { translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';
import { ShieldCheck, Truck, Check, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { buildSupportWhatsAppUrl } from '../services/storage';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onOpenCheckout,
}) => {
  const t = translations[lang];
  // Default to the popular pack (Pack of 2)
  const defaultBundle = product.bundles.find(b => b.isPopular) || product.bundles[0];
  const [selectedTier, setSelectedTier] = useState<BundleTier>(defaultBundle.id);

  const activeBundle = product.bundles.find(b => b.id === selectedTier) || product.bundles[0];

  const isGold = product.theme === 'gold';
  const themeBorder = isGold ? 'border-amber-500/30' : 'border-emerald-500/30';
  const themeAccentBg = isGold ? 'bg-amber-500' : 'bg-emerald-500';
  const themeText = isGold ? 'text-amber-400' : 'text-emerald-400';
  const themeCardBg = isGold ? 'from-stone-900 via-stone-950 to-stone-900' : 'from-[#0b1611] via-stone-950 to-[#08120d]';

  return (
    <div
      id={product.id}
      className={`rounded-3xl border ${themeBorder} bg-gradient-to-b ${themeCardBg} overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        {/* Visual Top Showcase */}
        <div className="mb-6">
          <ProductVisual type={product.id as 'shilajit' | 'hair-oil'} />
        </div>

        {/* Product Identity */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[11px] font-mono uppercase tracking-widest ${themeText} font-semibold`}>
              {lang === 'ur' ? product.badgeUrdu : product.badge}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t.products.inStock}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-100">
            {lang === 'ur' ? product.nameUrdu : product.name}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            {lang === 'ur' ? product.taglineUrdu : product.tagline}
          </p>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
            {lang === 'ur' ? product.descriptionUrdu : product.description}
          </p>
        </div>

        {/* Key Highlights / Benefits */}
        <div className="space-y-2 py-4 border-y border-stone-800 mb-6">
          {product.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
              <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${themeText}`} />
              <span>{lang === 'ur' ? h.ur : h.en}</span>
            </div>
          ))}
        </div>

        {/* Tiered Bundle Selector */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-300 font-semibold">
            {t.products.selectBundle}
          </label>

          <div className="space-y-2.5">
            {product.bundles.map((bundle) => {
              const isSelected = bundle.id === selectedTier;

              return (
                <div
                  key={bundle.id}
                  onClick={() => setSelectedTier(bundle.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? isGold
                        ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                        : 'bg-emerald-500/10 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? isGold
                              ? 'border-amber-400 bg-amber-400 text-stone-950'
                              : 'border-emerald-400 bg-emerald-400 text-stone-950'
                            : 'border-stone-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-stone-100">
                            {lang === 'ur' ? bundle.titleUrdu : bundle.title}
                          </span>
                          {bundle.isPopular && (
                            <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-semibold border border-amber-500/30">
                              {lang === 'ur' ? 'سب سے مقبول' : 'Most Popular'}
                            </span>
                          )}
                          {bundle.isBestValue && (
                            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/30">
                              {lang === 'ur' ? 'بہترین بچت' : 'Best Value'}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          {lang === 'ur' ? bundle.subtitleUrdu : bundle.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Price in Bundle */}
                    <div className="text-right shrink-0">
                      <div className="text-sm sm:text-base font-bold font-mono text-stone-100 tabular-nums">
                        Rs. {bundle.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-500 line-through font-mono">
                        Rs. {bundle.originalPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {bundle.bonusGift && (
                    <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{lang === 'ur' ? bundle.bonusGiftUrdu : bundle.bonusGift}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => onOpenCheckout(product, activeBundle)}
          className={`w-full py-3.5 px-6 rounded-2xl ${
            isGold
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 shadow-amber-500/20'
              : 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-400 hover:to-emerald-300 text-stone-950 shadow-emerald-500/20'
          } font-bold text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer transform active:scale-98`}
        >
          <span>{t.products.buyNowCod}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={buildSupportWhatsAppUrl(`${product.name} - ${activeBundle.title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.products.orderOnWhatsApp}</span>
        </a>

        <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 pt-1 font-mono">
          <span className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-amber-400" />
            <span>2-3 Days Delivery</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>7-Day Return</span>
          </span>
        </div>
      </div>
    </div>
  );
};
