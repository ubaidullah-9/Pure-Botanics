import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { ShieldCheck, Phone, MapPin, Mail } from 'lucide-react';
import { HerbalLogo } from './HerbalLogo';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-stone-400 text-xs py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="mb-2">
              <HerbalLogo size="md" />
            </div>
            <p className="text-stone-400 max-w-md leading-relaxed">
              {lang === 'ur'
                ? 'پیور بوٹینکس گلگت بلتستان کے روایتی جڑی بوٹیوں کے علم اور جدید لیب ٹیسٹنگ کا سنگم ہے۔ 100 فیصد قدرتی، غیر ملاوٹ شدہ، اور خالص۔'
                : 'Pure Botanics sources wildcrafted botanicals and mountain minerals directly from high-altitude Karakoram harvesters in Gilgit-Baltistan. Certified PCSIR tested and delivered with Cash on Delivery nationwide.'}
            </p>
            <div className="flex items-center gap-2 text-stone-300 font-mono text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>PCSIR Accredited Facility Report #KHI-CHM-9428</span>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2">
            <span className="text-stone-200 font-mono uppercase tracking-wider text-[11px] font-semibold block">
              Helpline & Orders
            </span>
            <div className="space-y-1.5 text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: 0341-6242967</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>orders@purebotanics.pk</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                <span>Fulfillment Hub: Block J-3, Johar Town, Lahore & Gilgit Origin Depot</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <span className="text-stone-200 font-mono uppercase tracking-wider text-[11px] font-semibold block">
              Customer Assurance
            </span>
            <ul className="space-y-1 text-stone-400">
              <li>✓ Cash on Delivery (COD) Nationwide</li>
              <li>✓ 7-Day Money Back Guarantee</li>
              <li>✓ PostEx & Leopards Express Tracking</li>
              <li>✓ 100% Zero-Adulteration Guarantee</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Pure Botanics Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Authentic Gilgit Shilajit</span>
            <span>·</span>
            <span>Cold-Pressed Herbal Hair Care</span>
            <span>·</span>
            <span>Unani Herbal Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
