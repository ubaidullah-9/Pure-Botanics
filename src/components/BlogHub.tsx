import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, BlogCategory, Language } from '../types';
import { Search, BookOpen, Clock, ArrowRight, Sparkles, Shield, Leaf } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface BlogHubProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  lang: Language;
}

export const BlogHub: React.FC<BlogHubProps> = ({ posts, onSelectPost, lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: string[] = [
    'All',
    'Hair Care & Desi Totkay',
    'Shilajit & Stamina Guide',
    'Asli vs Naqli (Purity Tests)',
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.seoKeywords.some((k) => k.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog-hub" className="py-16 md:py-24 border-t border-stone-800 bg-[#0c0d0e] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hub Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 mb-2 uppercase tracking-widest bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'ہربل گائیڈز اور دیسی ٹوٹکے' : 'Herbal Hub & Desi Totkay Blog'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100 tracking-tight">
            {lang === 'ur'
              ? 'صحت، طاقت اور بالوں کی نگہداشت کے تصدیق شدہ ٹوٹکے'
              : 'Authentic Wellness Guides & Pure Herbal Wisdom'}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-stone-400">
            {lang === 'ur'
              ? 'اصلی سلاجیت کی شناخت، بالوں کے گرنے کا قدرتی سدباب، اور روزانہ خوراک کے مستند سائنسی و دیسی طریقے'
              : 'Ranked guides on genuine Gilgit Shilajit tests, Rosemary hair regrowth protocols, and ancestral Unani healing traditions.'}
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Keyword Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search: Hair fall, Shilajit price, Rosemary..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Magazine-style Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-stone-500 bg-stone-950/60 rounded-2xl border border-stone-900">
            No articles found matching &quot;{searchQuery}&quot;. Try another search term.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => {
              const isHair = post.category === 'Hair Care & Desi Totkay';
              const isPurity = post.category === 'Asli vs Naqli (Purity Tests)';

              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  onClick={() => {
                    onSelectPost?.(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="rounded-3xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 hover:border-amber-500/40 p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group no-underline"
                >
                  <div>
                    {/* Visual Thumbnail */}
                    <div className="rounded-2xl overflow-hidden mb-5 border border-stone-800/80 relative">
                      {post.visualType === 'shilajit' || isPurity ? (
                        <ProductVisual type="shilajit" className="aspect-16/9" />
                      ) : (
                        <ProductVisual type="hair-oil" className="aspect-16/9" />
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-stone-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-stone-700/60 text-[11px] font-mono font-semibold text-amber-300">
                        {post.category}
                      </div>

                      <div className="absolute top-3 right-3 bg-stone-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700/60 text-[10px] font-mono text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-serif-luxury font-bold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug mb-2.5">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-stone-400 line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>

                    {/* SEO keyword tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {post.seoKeywords.slice(0, 3).map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-mono">
                      {post.publishedDate}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300 group-hover:translate-x-1 transition-all">
                      <span>{lang === 'ur' ? 'مکمل گائیڈ پڑھیں' : 'Read Full Guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
