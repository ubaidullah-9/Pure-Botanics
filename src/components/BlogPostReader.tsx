import React, { useState, useEffect } from 'react';
import { BlogPost, Product, BundleOption, Language } from '../types';
import { ArrowLeft, Clock, Calendar, Share2, MessageCircle, ChevronDown, ChevronUp, ShoppingBag, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { buildSupportWhatsAppUrl } from '../services/storage';

interface BlogPostReaderProps {
  post: BlogPost;
  onBack: () => void;
  products: Product[];
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
  lang: Language;
}

export const BlogPostReader: React.FC<BlogPostReaderProps> = ({
  post,
  onBack,
  products,
  onOpenCheckout,
  lang,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Linked Product resolution
  const linkedProduct =
    products.find((p) => p.id === post.linkedProductId) || products[0];
  const linkedBundle =
    linkedProduct.bundles.find((b) => b.isPopular) || linkedProduct.bundles[0];

  // Dynamic SEO: Update document.title, meta description, og tags & Schema.org JSON-LD
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | Pure Botanics`;

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute('content', post.metaDescription);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${post.title} | Pure Botanics`);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', post.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = `https://purebotanics.vercel.app/blog/${post.id}`;
    canonical.setAttribute('href', currentUrl);

    // Inject Schema.org Article & FAQ JSON-LD
    const scriptId = 'article-structured-data';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'headline': post.title,
          'description': post.metaDescription,
          'datePublished': '2026-10-26T08:00:00+05:00',
          'mainEntityOfPage': currentUrl,
          'author': {
            '@type': 'Organization',
            'name': 'Pure Botanics Herbal Research Team',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Pure Botanics Pakistan',
          },
        },
        {
          '@type': 'FAQPage',
          'mainEntity': post.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [post]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // WhatsApp Share URL for status / groups
  const cleanPostUrl = `https://purebotanics.vercel.app/blog/${post.id}`;
  const shareText = encodeURIComponent(
    `*${post.title}*\n\nRead this authentic herbal guide & totkay:\n${cleanPostUrl}`
  );
  const whatsappShareUrl = `https://wa.me/?text=${shareText}`;

  // WhatsApp Free Advice URL
  const adviceUrl = buildSupportWhatsAppUrl(
    `Assalam o Alaikum! I read the article "${post.title}". Apne baalon ya sehat ke mutabiq free herbal mashwara chahiye.`
  );

  // Split content in half to embed In-Article Product Callout Box
  const rawSections = post.content.trim().split('---');
  const midPoint = Math.floor(rawSections.length / 2);

  return (
    <article className="min-h-screen bg-[#0c0d0e] text-stone-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500/40 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ur' ? 'تمام گائیڈز کی طرف واپس' : 'Back to Herbal Hub'}</span>
          </button>

          {/* Top WhatsApp Share Button */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {lang === 'ur' ? 'واٹس ایپ پر شیئر کریں' : 'Share this Totka on WhatsApp'}
            </span>
            <span className="sm:hidden">Share</span>
          </a>
        </div>

        {/* Article Header */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400">
            <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{post.readTime}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>{post.publishedDate}</span>
            </span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Desi Totka</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100 tracking-tight leading-snug">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed italic bg-stone-900/60 p-4 rounded-2xl border-l-4 border-amber-500">
            {post.summary}
          </p>
        </header>

        {/* Visual Cover Banner */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
          {post.visualType === 'shilajit' ? (
            <ProductVisual type="shilajit" />
          ) : (
            <ProductVisual type="hair-oil" />
          )}
        </div>

        {/* Content Section with Embedded In-Article Product Callout Box */}
        <div className="space-y-8 text-stone-300 leading-relaxed text-sm sm:text-base font-sans">
          {rawSections.map((section, idx) => {
            return (
              <React.Fragment key={idx}>
                {/* Render section prose */}
                <div className="space-y-4 prose-custom">
                  {section.split('\n\n').map((para, pIdx) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;

                    // Header 2 (##)
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2
                          key={pIdx}
                          className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-200 pt-6 pb-2 border-b border-stone-800"
                        >
                          {trimmed.replace('## ', '')}
                        </h2>
                      );
                    }

                    // Header 3 (###)
                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3
                          key={pIdx}
                          className="text-lg sm:text-xl font-serif-luxury font-semibold text-emerald-300 pt-4 pb-1"
                        >
                          {trimmed.replace('### ', '')}
                        </h3>
                      );
                    }

                    // Bullet points / numbered lists
                    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\./.test(trimmed)) {
                      const lines = trimmed.split('\n');
                      return (
                        <ul key={pIdx} className="space-y-2 my-3 pl-4 border-l border-stone-800">
                          {lines.map((line, lIdx) => (
                            <li key={lIdx} className="text-stone-300 text-xs sm:text-sm">
                              {line.replace(/^(\*|-|\d+\.)\s*/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={pIdx} className="text-stone-300 leading-relaxed text-xs sm:text-sm">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>

                {/* Halfway through the article: Embed High-Converting Product Callout Box */}
                {idx === midPoint && (
                  <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171410] via-stone-900 to-[#0e1712] border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-stone-950 font-bold text-[10px] font-mono tracking-widest uppercase rounded-bl-xl shadow-md">
                      RECOMMENDED SOLUTION
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-4">
                        <ProductVisual
                          type={linkedProduct.id as 'shilajit' | 'hair-oil'}
                          className="rounded-xl aspect-square"
                        />
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>100% Authentic & Lab Verified</span>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-100">
                          {linkedProduct.name}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-300">
                          {linkedProduct.tagline}
                        </p>

                        <div className="flex items-center gap-3 pt-1">
                          <span className="text-2xl font-bold font-mono text-amber-300">
                            Rs. {linkedBundle.price.toLocaleString()}
                          </span>
                          <span className="text-xs line-through text-stone-500 font-mono">
                            Rs. {linkedBundle.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                            SAVE {linkedBundle.discountPercentage}%
                          </span>
                        </div>

                        {/* Direct Order with COD Action */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <button
                            onClick={() => onOpenCheckout(linkedProduct, linkedBundle)}
                            className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Order Now - Cash on Delivery (COD)</span>
                          </button>

                          <span className="text-[11px] text-stone-400 font-mono text-center">
                            ✓ Free 2-3 Day Delivery across Pakistan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Interactive FAQ Accordion (Targeting Google 'People Also Ask' in Pakistan) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-stone-800 space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-100">
              {lang === 'ur'
                ? 'اکثر پوچھے جانے والے سوالات (FAQs)'
                : 'Frequently Asked Questions (People Also Ask)'}
            </h3>
            <p className="text-xs text-stone-400">
              Clear answers to common questions asked by Pakistani customers.
            </p>

            <div className="space-y-3 pt-3">
              {post.faqs.map((faq, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-2xl border border-stone-800 bg-stone-900/60 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-stone-200 hover:text-amber-200 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-stone-400 border-t border-stone-800/80 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Sticky WhatsApp Advice Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <MessageCircle className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-serif-luxury font-bold text-stone-100">
              Apne baalon ya sehat ke mutabiq free mashwara chahiye?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-lg mx-auto">
              Get personalized dosage advice or a hair care routine directly from our Karakoram herbal experts.
            </p>
          </div>

          <a
            href={adviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-950/50"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Talk to our Herbal Expert on WhatsApp</span>
          </a>
        </div>

        {/* Bottom WhatsApp Share Button */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-400">
            Enjoyed this guide? Share it with family and friends:
          </span>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share this Totka on WhatsApp Status / Groups</span>
          </a>
        </div>
      </div>
    </article>
  );
};
