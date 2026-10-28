/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, BundleOption, Language, BlogPost } from './types';
import { translations } from './data/translations';
import { getStoredProducts, getStoredBlogPosts } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { UltimateComboBanner } from './components/UltimateComboBanner';
import { PurityTests } from './components/PurityTests';
import { IngredientsBreakdown } from './components/IngredientsBreakdown';
import { BlogHub } from './components/BlogHub';
import { BlogPostReader } from './components/BlogPostReader';
import { ReviewsSection } from './components/ReviewsSection';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { LabReportModal } from './components/LabReportModal';
import { AdminDashboard } from './components/AdminDashboard';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RecentOrderToast } from './components/RecentOrderToast';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  // Products and Blog state from storage
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Checkout Drawer State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption | null>(null);

  // Modals
  const [isLabReportOpen, setIsLabReportOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize data from persistent storage
  useEffect(() => {
    const loadedProducts = getStoredProducts();
    const loadedPosts = getStoredBlogPosts();
    setProducts(loadedProducts);
    setBlogPosts(loadedPosts);

    if (loadedProducts.length > 0) {
      setSelectedProduct(loadedProducts[0]);
      setSelectedBundle(
        loadedProducts[0].bundles.find((b) => b.isPopular) || loadedProducts[0].bundles[0]
      );
    }

    // Check clean URL path and hash for direct /blog/:slug, /admin, or /blog navigation
    const checkRoute = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (pathname === '/admin' || hash === '#admin') {
        setIsAdminOpen(true);
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
        const found = loadedPosts.find((p) => p.id === slug);
        if (found) {
          setSelectedPost(found);
        }
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        const found = loadedPosts.find((p) => p.id === slug);
        if (found) {
          setSelectedPost(found);
        }
      } else if (pathname === '/blog' || hash === '#blog' || hash === '#blog-hub') {
        setSelectedPost(null);
        const el = document.getElementById('blog-hub');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (pathname === '/' || !hash) {
        setSelectedPost(null);
        document.title = 'Pure Botanics | Pure Gilgit Shilajit & Herbal Hair Oil';
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  const handleOpenCheckout = (product: Product, bundle: BundleOption) => {
    setSelectedProduct(product);
    setSelectedBundle(bundle);
    setIsCheckoutOpen(true);
  };

  const handleOpenQuickCheckout = () => {
    if (products.length > 0) {
      const prod = products[0];
      const bundle = prod.bundles.find((b) => b.isPopular) || prod.bundles[0];
      setSelectedProduct(prod);
      setSelectedBundle(bundle);
      setIsCheckoutOpen(true);
    }
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    try {
      window.history.pushState(null, '', `/blog/${post.id}`);
    } catch {
      window.location.hash = `blog/${post.id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogHub = () => {
    setSelectedPost(null);
    document.title = 'Pure Botanics | Pure Gilgit Shilajit & Herbal Hair Oil';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://purebotanics.vercel.app/');
    }

    try {
      window.history.pushState(null, '', '/blog');
    } catch {
      window.location.hash = 'blog-hub';
    }

    setTimeout(() => {
      const el = document.getElementById('blog-hub');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const shilajitProduct = products.find((p) => p.id === 'shilajit') || products[0];
  const hairOilProduct = products.find((p) => p.id === 'hair-oil') || products[1] || products[0];
  const comboBundle =
    shilajitProduct?.bundles.find((b) => b.id === 'combo') ||
    shilajitProduct?.bundles[2] ||
    shilajitProduct?.bundles[0];

  const t = translations[lang];

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#0c0d0e] text-stone-100 selection:bg-amber-500/30 selection:text-amber-200 ${
        lang === 'ur' ? 'font-urdu' : ''
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenCheckoutQuick={handleOpenQuickCheckout}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Reader View or Main Storefront */}
      {selectedPost ? (
        <BlogPostReader
          post={selectedPost}
          onBack={handleBackToBlogHub}
          products={products}
          onOpenCheckout={handleOpenCheckout}
          lang={lang}
        />
      ) : (
        <>
          {/* Hero Section */}
          <Hero
            lang={lang}
            onOpenCheckout={handleOpenCheckout}
            featuredProduct={shilajitProduct}
          />

          <main className="space-y-16 sm:space-y-24 py-12 sm:py-16">
            {/* Products Showcase Section */}
            <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-bold text-stone-100">
                  {t.products.heading}
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-stone-400">
                  {t.products.subheading}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {products.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    lang={lang}
                    onOpenCheckout={handleOpenCheckout}
                  />
                ))}
              </div>
            </section>

            {/* The Royal Karakoram Duo (Ultimate Combo Banner) */}
            {shilajitProduct && comboBundle && (
              <section className="max-w-6xl mx-auto px-4 sm:px-6">
                <UltimateComboBanner
                  shilajitProduct={shilajitProduct}
                  comboBundle={comboBundle}
                  lang={lang}
                  onOpenCheckout={handleOpenCheckout}
                />
              </section>
            )}

            {/* Interactive Purity Test & Lab Verification */}
            <PurityTests
              lang={lang}
              onOpenLabReport={() => setIsLabReportOpen(true)}
            />

            {/* Herbal Ingredients Breakdown Grid */}
            <IngredientsBreakdown lang={lang} />

            {/* Herbal Hub & Desi Totkay Blog Section */}
            <BlogHub
              posts={blogPosts}
              onSelectPost={handleSelectPost}
              lang={lang}
            />

            {/* Verified Pakistani Reviews (WhatsApp Style Cards) */}
            <ReviewsSection lang={lang} />
          </main>
        </>
      )}

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp lang={lang} />

      {/* Recent Orders Social Proof Toast */}
      <RecentOrderToast lang={lang} />

      {/* 1-Step COD Express Checkout Slide-Over Drawer */}
      {selectedProduct && selectedBundle && (
        <CheckoutDrawer
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={selectedProduct}
          selectedBundle={selectedBundle}
          lang={lang}
        />
      )}

      {/* Official PCSIR Lab Report Modal */}
      <LabReportModal
        isOpen={isLabReportOpen}
        onClose={() => setIsLabReportOpen(false)}
        lang={lang}
      />

      {/* Protected Operations Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        onProductsUpdated={(updated) => setProducts(updated)}
        onBlogPostsUpdated={(updated) => setBlogPosts(updated)}
      />
    </div>
  );
}
