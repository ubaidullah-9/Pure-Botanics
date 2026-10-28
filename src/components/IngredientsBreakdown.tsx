import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Sparkles, Leaf, CheckCircle2 } from 'lucide-react';

interface IngredientsBreakdownProps {
  lang: Language;
}

export const IngredientsBreakdown: React.FC<IngredientsBreakdownProps> = ({ lang }) => {
  const t = translations[lang];

  const ingredientsList = [
    {
      name: t.ingredients.rosemaryTitle,
      desc: t.ingredients.rosemaryDesc,
      tag: 'DHT Blocker',
      tagUrdu: 'ڈی ایچ ٹی روکتام',
      accent: 'emerald',
    },
    {
      name: t.ingredients.amlaTitle,
      desc: t.ingredients.amlaDesc,
      tag: 'Vitamin C & Follicles',
      tagUrdu: 'وٹامن سی اور جڑیں',
      accent: 'amber',
    },
    {
      name: t.ingredients.shikakaiTitle,
      desc: t.ingredients.shikakaiDesc,
      tag: 'Natural Gentle Cleanser',
      tagUrdu: 'قدرتی کلینزر',
      accent: 'emerald',
    },
    {
      name: t.ingredients.kalonjiTitle,
      desc: t.ingredients.kalonjiDesc,
      tag: 'Thymoquinone Active',
      tagUrdu: 'کلونجی ایکٹیو',
      accent: 'emerald',
    },
    {
      name: t.ingredients.bhringrajTitle,
      desc: t.ingredients.bhringrajDesc,
      tag: 'King of Hair Herbs',
      tagUrdu: 'جڑی بوٹیوں کا بادشاہ',
      accent: 'emerald',
    },
    {
      name: t.ingredients.coldPressedTitle,
      desc: t.ingredients.coldPressedDesc,
      tag: 'Pure Unrefined Base',
      tagUrdu: 'خالص کولڈ پریسڈ بیس',
      accent: 'amber',
    },
  ];

  return (
    <section id="ingredients" className="py-16 md:py-24 border-t border-emerald-950/40 bg-stone-950 relative overflow-hidden">
      {/* Subtle emerald background radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Leaf className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? '100% نباتاتی فارمولیشن' : '100% Wildcrafted Herbal Actives'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100 tracking-tight">
            {t.ingredients.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            {t.ingredients.subtitle}
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredientsList.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-900/60 border border-emerald-900/30 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                    {lang === 'ur' ? item.tagUrdu : item.tag}
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-400/60" />
                </div>
                <h3 className="text-lg font-serif-luxury font-bold text-emerald-100 mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'ur' ? 'صفر کیمیکل یا منرل آئل' : '0% Mineral Oil · 0% Silicones'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950/40 via-stone-900/80 to-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-emerald-200">
            {lang === 'ur' 
              ? 'ہمارے تیل میں بازاری سستے منرل آئل یا مصنوعی خوشبوؤں کی قطعا آمیزش نہیں ہے۔ یہ 21 دن تک دھیمی آنچ پر جڑی بوٹیوں کو خالص تیل میں پکا کر کشید کیا جاتا ہے۔' 
              : 'Our oil contains zero cheap liquid paraffin, mineral solvents, or synthetic fragrances. Each batch undergoes a traditional 21-day slow sun-and-heat herbal steep to extract pure lipid-soluble phytonutrients.'}
          </p>
        </div>
      </div>
    </section>
  );
};
