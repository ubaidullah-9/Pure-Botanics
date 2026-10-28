import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Droplets, Flame, ThermometerSnowflake, FileCheck, Shield, Check } from 'lucide-react';

interface PurityTestsProps {
  lang: Language;
  onOpenLabReport: () => void;
}

export const PurityTests: React.FC<PurityTestsProps> = ({ lang, onOpenLabReport }) => {
  const t = translations[lang];
  const [activeTest, setActiveTest] = useState<'water' | 'flame' | 'temp'>('water');

  return (
    <section id="purity-tests" className="py-16 md:py-24 border-t border-amber-900/20 bg-stone-950/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <Shield className="w-3.5 h-3.5" />
            <span>{t.purity.pcsirTag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100 tracking-tight">
            {t.purity.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            {t.purity.subtitle}
          </p>
        </div>

        {/* Interactive Test Selector Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTest('water')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTest === 'water'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200 shadow-md'
                : 'bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Droplets className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ur' ? 'پانی میں حل پذیری' : '01. Water Test'}</span>
          </button>

          <button
            onClick={() => setActiveTest('flame')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTest === 'flame'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200 shadow-md'
                : 'bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ur' ? 'آگ اور حرارت' : '02. Flame Test'}</span>
          </button>

          <button
            onClick={() => setActiveTest('temp')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTest === 'temp'
                ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200 shadow-md'
                : 'bg-stone-900/80 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <ThermometerSnowflake className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ur' ? 'لچک اور درجہ حرارت' : '03. Pliability Test'}</span>
          </button>
        </div>

        {/* Active Test Card */}
        <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
          {activeTest === 'water' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
                  {lang === 'ur' ? 'ٹیسٹ نمبر 1' : 'Experiment #1'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-100 mb-3">
                  {t.purity.waterTestTitle}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {t.purity.waterTestDesc}
                </p>
                <div className="space-y-2 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'اصلی سلاجیت: پانی سنہری امبر رنگ میں تبدیل ہو جاتا ہے' : 'Pure Shilajit: Transforms into clear golden-amber liquid'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'نقلی سلاجیت: نیچے گڑ یا ریت کے زرات جم جاتے ہیں' : 'Fake / Adulterated: Leaves dark murky sand/molasses sludge'}</span>
                  </div>
                </div>
              </div>

              {/* Graphic Demonstration */}
              <div className="aspect-4/3 rounded-xl bg-gradient-to-b from-[#1c1813] to-black border border-amber-900/40 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="w-28 h-40 border-2 border-stone-700/60 rounded-b-3xl bg-amber-500/10 relative overflow-hidden flex flex-col justify-end p-2 shadow-inner">
                  {/* Water liquid simulation */}
                  <div className="h-28 w-full bg-gradient-to-t from-amber-600/60 via-amber-500/40 to-amber-400/20 rounded-b-2xl relative">
                    {/* Dissolving tendrils */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-12 bg-amber-700/80 rounded-full blur-xs animate-pulse" />
                    <div className="absolute top-2 left-1/3 w-3 h-8 bg-amber-800/80 rounded-full blur-xs" />
                  </div>
                  <div className="absolute bottom-2 inset-x-0 text-center text-[10px] font-mono text-amber-300">
                    100% PURE DISSOLUTION
                  </div>
                </div>
                <span className="text-xs font-mono text-stone-400 mt-3">
                  {lang === 'ur' ? 'صفر تلچھٹ یا ملاوٹ' : 'Zero Sediment Residue'}
                </span>
              </div>
            </div>
          )}

          {activeTest === 'flame' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
                  {lang === 'ur' ? 'ٹیسٹ نمبر 2' : 'Experiment #2'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-100 mb-3">
                  {t.purity.flameTestTitle}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {t.purity.flameTestDesc}
                </p>
                <div className="space-y-2 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'آگ پر جلتی نہیں ہے بلکہ سوج کر راکھ بنتی ہے' : 'Will never catch flame or burn like plastic/wax'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'کوئی بدبودار کیمیکل دھواں خارج نہیں ہوتا' : 'Emits organic earthy aroma with pure mineral ash'}</span>
                  </div>
                </div>
              </div>

              {/* Graphic Demonstration */}
              <div className="aspect-4/3 rounded-xl bg-gradient-to-b from-[#1c1813] to-black border border-amber-900/40 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative flex flex-col items-center">
                  {/* Bubbling Resin */}
                  <div className="w-20 h-10 bg-stone-900 rounded-t-full border border-amber-600/40 flex items-center justify-center relative">
                    <div className="w-4 h-4 rounded-full bg-amber-500/40 animate-ping absolute" />
                    <span className="text-[9px] font-mono text-amber-400 uppercase">Bubbles</span>
                  </div>
                  {/* Flame effect */}
                  <div className="w-6 h-10 bg-gradient-to-t from-red-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] transform -translate-y-2 animate-bounce" />
                </div>
                <span className="text-xs font-mono text-stone-400 mt-4">
                  {lang === 'ur' ? 'شعلہ نہیں پکڑتی - خالص راکھ بنتی ہے' : 'No Flame Flare · Turns to Mineral Ash'}
                </span>
              </div>
            </div>
          )}

          {activeTest === 'temp' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
                  {lang === 'ur' ? 'ٹیسٹ نمبر 3' : 'Experiment #3'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-100 mb-3">
                  {t.purity.tempTestTitle}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {t.purity.tempTestDesc}
                </p>
                <div className="space-y-2 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'فریج میں شیشے کی طرح سخت ہو جاتی ہے' : 'Cold (10°C): Glassy and brittle to touch'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'انگلیوں کی گرمائش میں موم بن جاتی ہے' : 'Body Heat (37°C): Instantly pliable and stretchy'}</span>
                  </div>
                </div>
              </div>

              {/* Graphic Demonstration */}
              <div className="aspect-4/3 rounded-xl bg-gradient-to-b from-[#1c1813] to-black border border-amber-900/40 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center p-3 bg-stone-900/80 rounded-lg border border-stone-800">
                    <span className="text-xs font-mono text-cyan-400 block mb-1">Cold 10°C</span>
                    <div className="w-12 h-6 bg-stone-800 rounded border border-cyan-500/40 mx-auto" />
                    <span className="text-[10px] text-stone-400 block mt-1">Brittle / Glass</span>
                  </div>
                  <span className="text-amber-400 text-lg">→</span>
                  <div className="text-center p-3 bg-stone-900/80 rounded-lg border border-stone-800">
                    <span className="text-xs font-mono text-amber-400 block mb-1">Warm 37°C</span>
                    <div className="w-12 h-6 bg-amber-950 rounded-full border border-amber-500/60 mx-auto transform scale-x-125" />
                    <span className="text-[10px] text-stone-400 block mt-1">Pliable / Resin</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-stone-400 mt-4">
                  {lang === 'ur' ? 'قدرتی لچک کی خاصیت' : 'True Natural Viscoelasticity'}
                </span>
              </div>
            </div>
          )}

          {/* Action button to open PCSIR Certificate */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400 text-center sm:text-left">
              <strong className="text-stone-200 block">
                {lang === 'ur' ? 'سرکاری تصدیق شدہ لیب رپورٹ' : 'Accredited Analytical Testing Report'}
              </strong>
              <span>
                {lang === 'ur' ? 'ہر بیچ کی پی سی ایس آئی آر لیب رپورٹ تصدیقی نمبر کے ساتھ موجود ہے۔' : 'Every harvest batch is screened for heavy metals and active fulvic concentration.'}
              </span>
            </div>

            <button
              onClick={onOpenLabReport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/10 cursor-pointer whitespace-nowrap"
            >
              <FileCheck className="w-4 h-4" />
              <span>{t.purity.viewLabCertBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
