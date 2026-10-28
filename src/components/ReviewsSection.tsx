import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../data/mockOrders';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Star, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? CUSTOMER_REVIEWS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === CUSTOMER_REVIEWS.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section id="reviews" className="py-16 md:py-24 border-t border-stone-800 bg-stone-950/90 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? '100% اصلی گاہکوں کی رائے' : 'Verified Purchase Feedback'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100">
              {t.reviews.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-400">
              {t.reviews.subtitle}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev, idx) => {
            return (
              <div
                key={rev.id}
                className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-5 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* WhatsApp chat style top header */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-stone-800/80 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700/50 flex items-center justify-center font-bold text-xs text-emerald-300">
                        {rev.avatarLetter}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-200">{rev.name}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                        </div>
                        <span className="text-[10px] text-stone-500 block">{rev.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* WhatsApp speech bubble aesthetic */}
                  <div className="bg-[#121c17] border border-emerald-900/40 rounded-xl p-3 text-xs text-stone-200 relative mb-3">
                    <p className="leading-relaxed">
                      "{lang === 'ur' ? rev.messageUrdu : rev.messageEn}"
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[9px] text-emerald-400/70 font-mono">
                      <span>WhatsApp Verified Chat</span>
                      <span>{rev.whatsappScreenshotTimestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Product Tag */}
                <div className="pt-2 border-t border-stone-900 text-[11px] text-amber-400/90 font-medium">
                  Ordered: {rev.product}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
