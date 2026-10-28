import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildSupportWhatsAppUrl } from '../services/storage';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  return (
    <aside aria-label="WhatsApp Order Helpline" className="fixed bottom-5 right-4 z-40 flex items-center gap-2 group">
      {/* Floating Tooltip */}
      <div className="hidden sm:flex items-center px-3 py-1.5 rounded-xl bg-stone-900 border border-emerald-500/30 text-stone-200 text-xs shadow-xl backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
        <span>{lang === 'ur' ? 'واٹس ایپ پر فوری آرڈر کریں' : 'Instant WhatsApp Order'}</span>
      </div>

      {/* Floating Button */}
      <a
        href={buildSupportWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition-transform duration-200 hover:scale-105 active:scale-95 border-2 border-emerald-300/30"
        aria-label="Order via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </aside>
  );
};
