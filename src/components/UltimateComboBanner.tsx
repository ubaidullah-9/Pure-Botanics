import React from 'react';
import { Product, BundleOption, Language } from '../types';
import { translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';
import { Sparkles, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { buildSupportWhatsAppUrl } from '../services/storage';

interface UltimateComboBannerProps {
  shilajitProduct: Product;
  comboBundle: BundleOption;
  lang: Language;
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
}

export const UltimateComboBanner: React.FC<UltimateComboBannerProps> = ({
  shilajitProduct,
  comboBundle,
  lang,
  onOpenCheckout,
}) => {
  const t = translations[lang];

  return (
    <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-[#1a140d] via-[#121915] to-[#0a1811] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'سب سے زیادہ خریدا جانے والا شاہی پیکج' : '#1 Best-Selling Vitality Protocol'}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100">
            {t.products.comboName}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
            {t.products.comboDesc}
          </p>

          {/* Value inclusions checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-3 text-xs text-stone-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{lang === 'ur' ? 'خالص آفتابی گلگت سلاجیت (20 گرام)' : 'Pure Aftabi Shilajit Jar (20g)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'ur' ? 'آرگینک ہربل ہیئر آئل (200 ملی)' : 'Organic Herbal Hair Oil (200ml)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{lang === 'ur' ? 'روایتی لکڑی کا خوراکی چمچ (مفت)' : 'Artisan Wooden Dosing Spoon (FREE)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'ur' ? 'پورے پاکستان میں مفت ایکسپریس ڈیلیوری' : 'Free Express Courier Across Pakistan'}</span>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 tabular-nums">
                  Rs. {comboBundle.price.toLocaleString()}
                </span>
                <span className="text-sm text-stone-500 line-through font-mono">
                  Rs. {comboBundle.originalPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                {lang === 'ur' ? 'بچت: 2,350 روپے + فری ہوم ڈیلیوری' : 'Save Rs. 2,350 + Free Courier Delivery'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenCheckout(shilajitProduct, comboBundle)}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer grow sm:grow-0"
              >
                <span>{t.products.buyNowCod}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildSupportWhatsAppUrl('The Royal Karakoram Duo (Shilajit + Hair Oil Combo)')}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-stone-900 border border-stone-700 text-emerald-400 hover:bg-stone-800 transition-colors"
                title="Order on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Visual Duo */}
        <div className="lg:col-span-5">
          <ProductVisual type="combo" />
        </div>
      </div>
    </div>
  );
};
