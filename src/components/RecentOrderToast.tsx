import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Language } from '../types';

interface RecentOrderToastProps {
  lang: Language;
}

const RECENT_ORDERS = [
  { name: 'Hamza M.', city: 'DHA Lahore', item: 'Pack of 2 Pure Aftabi Shilajit', time: '3 minutes ago' },
  { name: 'Dr. Tariq', city: 'F-8 Islamabad', item: 'The Royal Karakoram Duo (Combo)', time: '8 minutes ago' },
  { name: 'Fatima Z.', city: 'Clifton Karachi', item: 'Herbal Hair Oil (Pack of 2)', time: '14 minutes ago' },
  { name: 'Bilal W.', city: 'Faisalabad', item: 'Pure Aftabi Shilajit (Single Pack)', time: '22 minutes ago' },
];

export const RecentOrderToast: React.FC<RecentOrderToastProps> = ({ lang }) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Wait 10 seconds before first appearance as per frontend-design guidelines
    const initialTimer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 10000);

    const cycleInterval = setInterval(() => {
      if (dismissed) return;
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ORDERS.length);
        setVisible(true);
      }, 2000);
    }, 24000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleInterval);
    };
  }, [dismissed]);

  if (!visible || dismissed) return null;

  const current = RECENT_ORDERS[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm bg-stone-900/95 border border-amber-500/30 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
        </div>

        <div className="flex-1 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-200">{current.name}</span>
            <span className="text-[11px] text-stone-400">from {current.city}</span>
          </div>
          <p className="text-[11px] text-amber-300 font-medium leading-tight mt-0.5">
            {lang === 'ur' ? `ابھی ابھی خریدا: ${current.item}` : `Just ordered: ${current.item}`}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500 font-mono">
            <span>{current.time}</span>
            <span>·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified COD Order</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setVisible(false);
            setDismissed(true);
          }}
          className="text-stone-500 hover:text-stone-300 p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
