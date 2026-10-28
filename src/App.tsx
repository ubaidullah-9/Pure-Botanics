/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
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

// Standalone Blog Post Route Component with direct URL handling & SEO
function BlogPostPage({
  posts,
  products,
  onOpenCheckout,
  lang,
}: {
  posts: BlogPost[];
  products: Product[];
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
  lang: Language;
}) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="text-2xl font-serif-luxury font-bold text-amber-300 mb-3">
          {lang === 'ur' ? 'مضمون نہیں مل سکا' : 'Article Not Found'}
        </h2>
        <p className="text-stone-400 text-sm mb-6 max-w-md">
          {lang === 'ur'
            ? 'معذرت، مطلوبہ ہربل گائیڈ دستیاب نہیں ہے۔ براہ کرم بلاگ لسٹ میں سے دیگر ٹوٹکے ملاحظہ فرمائیں۔'
            : 'The requested herbal guide could not be found. Please browse our other authentic Pakistani health guides.'}
        </p>
        <button
          onClick={() => {
            navigate('/#blog-hub');
            setTimeout(() => {
              const el = document.getElementById('blog-hub');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all cursor-pointer"
        >
          {lang === 'ur' ? 'تمام بلاگز دیکھیں' : 'Browse All Guides'}
        </button>
      </div>
    );
  }

  return (
    <BlogPostReader
      post={post}
      onBack={() => {
        navigate('/#blog-hub');
        setTimeout(() => {
          const el = document.getElementById('blog-hub');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }}
      products={products}
      onOpenCheckout={onOpenCheckout}
      lang={lang}
    />
  );
}

// Storefront Route Component (Home & /blog anchor scroll)
function StorefrontPage({
  products,
  blogPosts,
  lang,
  onOpenCheckout,
  onOpenLabReport,
}: {
  products: Product[];
  blogPosts: BlogPost[];
  lang: Language;
  onOpenCheckout: (product: Product, bundle: BundleOption) => void;
  onOpenLabReport: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const shilajitProduct = products.find((p) => p.id === 'shilajit') || products[0];
  const comboBundle =
    shilajitProduct?.bundles.find((b) => b.id === 'combo') ||
    shilajitProduct?.bundles[2] ||
    shilajitProduct?.bundles[0];

  const t = translations[lang];

  useEffect(() => {
    document.title = 'Pure Botanics | Pure Gilgit Shilajit & Herbal Hair Oil';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://purebotanics.vercel.app/');
    }

    // Smooth scroll for hash or /blog path
    if (location.pathname === '/blog' || location.hash === '#blog-hub' || location.hash === '#blog') {
      setTimeout(() => {
        const el = document.getElementById('blog-hub');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* Hero Section */}
      <Hero
        lang={lang}
        onOpenCheckout={onOpenCheckout}
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
                onOpenCheckout={onOpenCheckout}
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
              onOpenCheckout={onOpenCheckout}
            />
          </section>
        )}

        {/* Interactive Purity Test & Lab Verification */}
        <PurityTests
          lang={lang}
          onOpenLabReport={onOpenLabReport}
        />

        {/* Herbal Ingredients Breakdown Grid */}
        <IngredientsBreakdown lang={lang} />

        {/* Herbal Hub & Desi Totkay Blog Section */}
        <BlogHub
          posts={blogPosts}
          onSelectPost={(post) => {
            navigate(`/blog/${post.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
        />

        {/* Verified Pakistani Reviews (WhatsApp Style Cards) */}
        <ReviewsSection lang={lang} />
      </main>
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const navigate = useNavigate();
  const location = useLocation();

  // Products and Blog state from storage
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Checkout Drawer State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption | null>(null);

  // Modals
  const [isLabReportOpen, setIsLabReportOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Auto-open admin when route is /admin
  useEffect(() => {
    if (location.pathname === '/admin') {
      setIsAdminOpen(true);
    }
  }, [location.pathname]);

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

      {/* Routes View: Standard BrowserRouter Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <StorefrontPage
              products={products}
              blogPosts={blogPosts}
              lang={lang}
              onOpenCheckout={handleOpenCheckout}
              onOpenLabReport={() => setIsLabReportOpen(true)}
            />
          }
        />
        <Route
          path="/blog"
          element={
            <StorefrontPage
              products={products}
              blogPosts={blogPosts}
              lang={lang}
              onOpenCheckout={handleOpenCheckout}
              onOpenLabReport={() => setIsLabReportOpen(true)}
            />
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <BlogPostPage
              posts={blogPosts}
              products={products}
              onOpenCheckout={handleOpenCheckout}
              lang={lang}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <div className="py-20 text-center">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="px-6 py-3 bg-amber-500 text-stone-950 font-bold rounded-xl"
              >
                Open Admin Portal
              </button>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

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
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.pathname === '/admin') {
            navigate('/');
          }
        }}
        lang={lang}
        onProductsUpdated={(updated) => setProducts(updated)}
        onBlogPostsUpdated={(updated) => setBlogPosts(updated)}
      />
    </div>
  );
}
