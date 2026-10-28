import React from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Shield, ShoppingBag, Globe, UserCheck } from 'lucide-react';
import { HerbalLogo } from './HerbalLogo';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenCheckoutQuick: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenCheckoutQuick,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Single brand wordmark with luxury herbal emblem */}
        <Link
          to="/"
          className="shrink-0 flex items-center"
        >
          <HerbalLogo size="md" />
        </Link>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-300">
          <a
            href="/#shilajit"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.shilajit}
          </a>
          <a
            href="/#hair-oil"
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.hairOil}
          </a>
          <a
            href="/#purity-tests"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.purityTests}
          </a>
          <Link
            to="/#blog-hub"
            className="hover:text-emerald-300 transition-colors whitespace-nowrap shrink-0 font-semibold text-emerald-400"
          >
            {t.nav.blog}
          </Link>
          <a
            href="/#reviews"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.reviews}
          </a>
        </nav>

        {/* Zone 3: Primary action + Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 bg-stone-900 text-stone-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            title="Switch Language (English / اردو)"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono uppercase">{lang === 'ur' ? 'EN' : 'اردو'}</span>
          </button>

          {/* Admin Dashboard Access */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 text-xs font-medium transition-colors cursor-pointer"
            title="Open Admin Operations Dashboard"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.admin}</span>
          </button>

          {/* Quick Buy CTA */}
          <button
            onClick={onOpenCheckoutQuick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold tracking-tight transition-colors shadow-md shadow-amber-500/10 cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'ur' ? 'آرڈر کریں' : 'Order COD'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
