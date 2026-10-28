import React, { useState, useEffect } from 'react';
import {
  CustomerOrder,
  InventoryItem,
  EmailAlertLog,
  OrderStatus,
  Language,
  Product,
  BlogPost,
  BlogCategory,
  ProductId,
  BundleOption,
} from '../types';
import { translations } from '../data/translations';
import {
  getStoredOrders,
  getStoredInventory,
  getStoredAlertEmail,
  getStoredAlertLogs,
  getStoredProducts,
  getStoredBlogPosts,
  saveInventory,
  saveAlertEmail,
  saveProducts,
  saveBlogPosts,
  updateOrderStatus,
  buildWhatsAppConfirmationUrl,
  exportOrdersToPostExCSV,
  exportOrdersToLeopardsCSV,
  triggerLowStockEmail,
} from '../services/storage';
import {
  Lock,
  Package,
  Boxes,
  BellRing,
  Download,
  Phone,
  Search,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Send,
  X,
  Plus,
  BookOpen,
  Trash2,
  Edit3,
  Layers,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { HerbalLogo } from './HerbalLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onProductsUpdated?: (products: Product[]) => void;
  onBlogPostsUpdated?: (posts: BlogPost[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  lang,
  onProductsUpdated,
  onBlogPostsUpdated,
}) => {
  const t = translations[lang];

  // PIN Protection State (Secured PIN: 6598 with zero hints)
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Active Tab: 'orders' | 'inventory' | 'products' | 'blog' | 'alerts'
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'products' | 'blog' | 'alerts'>('orders');

  // Orders State
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameUrdu, setNewProdNameUrdu] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdTheme, setNewProdTheme] = useState<'gold' | 'emerald'>('gold');
  const [newProdPrice, setNewProdPrice] = useState<number>(2990);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<number>(3800);
  const [newProdStock, setNewProdStock] = useState<number>(20);
  const [newProdThreshold, setNewProdThreshold] = useState<number>(5);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('100% Organic Pure');

  // Blog Management State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<BlogCategory>('Hair Care & Desi Totkay');
  const [postReadTime, setPostReadTime] = useState('5 min read');
  const [postKeywords, setPostKeywords] = useState('');
  const [postMetaDesc, setPostMetaDesc] = useState('');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postLinkedProduct, setPostLinkedProduct] = useState<ProductId>('shilajit');
  const [postVisualType, setPostVisualType] = useState<'shilajit' | 'hair-oil' | 'combo' | 'purity'>('shilajit');
  const [postFaqQ, setPostFaqQ] = useState('');
  const [postFaqA, setPostFaqA] = useState('');

  // Email Alert System State
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailLogs, setEmailLogs] = useState<EmailAlertLog[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [testAlertSentMsg, setTestAlertSentMsg] = useState(false);

  const loadData = () => {
    setOrders(getStoredOrders());
    setInventory(getStoredInventory());
    setProducts(getStoredProducts());
    setBlogPosts(getStoredBlogPosts());
    setRecipientEmail(getStoredAlertEmail());
    setEmailLogs(getStoredAlertLogs());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '6598') {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  // Status Update
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Inventory Update
  const handleUpdateStock = (item: InventoryItem, delta: number) => {
    const updated = inventory.map((inv) => {
      if (inv.id === item.id) {
        const newStock = Math.max(0, inv.stock + delta);
        if (newStock <= inv.threshold) {
          triggerLowStockEmail(inv.name, newStock, inv.threshold);
          setEmailLogs(getStoredAlertLogs());
        }
        return {
          ...inv,
          stock: newStock,
          lastUpdated: 'Just now',
        };
      }
      return inv;
    });

    setInventory(updated);
    saveInventory(updated);
  };

  // Product Addition Handler
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newId = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-') as ProductId;
    const discountPct = Math.round(
      ((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100
    );

    const bundles: BundleOption[] = [
      {
        id: 'single',
        title: 'Pack of 1 (Standard)',
        titleUrdu: '1 پیک (معیاری سائز)',
        subtitle: '1 Month Supply (Standard Starter)',
        subtitleUrdu: '1 ماہ کا کورس',
        price: newProdPrice,
        originalPrice: newProdOriginalPrice,
        discountPercentage: Math.max(10, discountPct),
        freeDelivery: false,
      },
      {
        id: 'double',
        title: 'Pack of 2 (Special Offer)',
        titleUrdu: '2 پیک (خاص آفر)',
        subtitle: '15% Extra Off + Free Delivery',
        subtitleUrdu: '15% رعایت + مفت ڈیلیوری',
        price: Math.round(newProdPrice * 1.7),
        originalPrice: newProdOriginalPrice * 2,
        discountPercentage: Math.min(40, discountPct + 15),
        isPopular: true,
        freeDelivery: true,
        bonusGift: 'Complimentary Bonus Gift Included',
        bonusGiftUrdu: 'خاص تحفہ شامل ہے',
      },
      {
        id: 'combo',
        title: 'Ultimate Wellness Combo',
        titleUrdu: 'شاہی ویلنس کومبو',
        subtitle: 'Complete Herbal Routine + Free Delivery',
        subtitleUrdu: 'مکمل ہربل روٹین + مفت ڈیلیوری',
        price: 5450,
        originalPrice: 7800,
        discountPercentage: 30,
        isBestValue: true,
        freeDelivery: true,
      },
    ];

    const newProduct: Product = {
      id: newId,
      name: newProdName.trim(),
      nameUrdu: newProdNameUrdu.trim() || newProdName.trim(),
      tagline: newProdTagline.trim() || '100% Pure Organic Karakoram Formulation',
      taglineUrdu: 'خالص ہمالیائی قدرتی نباتاتی نسخہ',
      theme: newProdTheme,
      badge: newProdBadge || 'Pure Harvest',
      badgeUrdu: 'خالص نباتات',
      description:
        newProdDesc.trim() ||
        'Crafted using traditional herbal distillation methods from wildcrafted Karakoram ingredients with zero additives.',
      descriptionUrdu: 'روایتی ہربل طریقوں سے تیار کردہ خالص نسخہ۔',
      highlights: [
        { en: '100% Organic, zero synthetic preservatives', ur: '100% خالص اور کیمیکل سے پاک' },
        { en: 'Lab tested for purity and safety', ur: 'لیبارٹری سے تصدیق شدہ' },
        { en: 'Cash on delivery available nationwide', ur: 'پورے پاکستان میں کیش آن ڈیلیوری' },
      ],
      specifications: [
        { label: 'Origin', labelUrdu: 'ماخذ', value: 'Gilgit-Baltistan', valueUrdu: 'گلگت بلتستان' },
        { label: 'Purity', labelUrdu: 'معیار', value: '100% Organic Grade', valueUrdu: 'خالص ترین' },
      ],
      bundles,
      stockQuantity: newProdStock,
      lowStockThreshold: newProdThreshold,
      inStock: newProdStock > 0,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    saveProducts(updated);
    if (onProductsUpdated) {
      onProductsUpdated(updated);
    }

    // Also add to inventory tracking
    const newInv: InventoryItem = {
      id: `inv-${newId}`,
      name: newProduct.name,
      sku: `PROD-${newId.toUpperCase().slice(0, 8)}`,
      stock: newProdStock,
      threshold: newProdThreshold,
      unit: 'Units',
      lastUpdated: 'Just now',
    };
    const updatedInv = [...inventory, newInv];
    setInventory(updatedInv);
    saveInventory(updatedInv);

    // Reset form
    setNewProdName('');
    setNewProdNameUrdu('');
    setNewProdTagline('');
    setNewProdDesc('');
    setIsAddProductOpen(false);
  };

  // Blog Management Handlers
  const handleOpenBlogModal = (postToEdit?: BlogPost) => {
    if (postToEdit) {
      setEditingPostId(postToEdit.id);
      setPostTitle(postToEdit.title);
      setPostCategory(postToEdit.category);
      setPostReadTime(postToEdit.readTime);
      setPostKeywords(postToEdit.seoKeywords.join(', '));
      setPostMetaDesc(postToEdit.metaDescription);
      setPostSummary(postToEdit.summary);
      setPostContent(postToEdit.content);
      setPostLinkedProduct(postToEdit.linkedProductId);
      setPostVisualType(postToEdit.visualType);
      if (postToEdit.faqs.length > 0) {
        setPostFaqQ(postToEdit.faqs[0].question);
        setPostFaqA(postToEdit.faqs[0].answer);
      } else {
        setPostFaqQ('');
        setPostFaqA('');
      }
    } else {
      setEditingPostId(null);
      setPostTitle('');
      setPostCategory('Hair Care & Desi Totkay');
      setPostReadTime('5 min read');
      setPostKeywords('desi totkay, herbal hair oil pakistan');
      setPostMetaDesc('');
      setPostSummary('');
      setPostContent('## Introduction\n\nWrite your informative totka or guide here in a natural blend of English and Roman Urdu.\n\n### Benefits\n* Benefit 1\n* Benefit 2');
      setPostLinkedProduct('shilajit');
      setPostVisualType('shilajit');
      setPostFaqQ('Is this effective in all seasons?');
      setPostFaqA('Yes, when used as directed in the guide.');
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    const keywordsArray = postKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const faqs = postFaqQ.trim()
      ? [
          {
            question: postFaqQ.trim(),
            answer: postFaqA.trim() || 'Verified by Pure Botanics herbal experts.',
          },
        ]
      : [];

    let updatedPosts: BlogPost[];
    if (editingPostId) {
      updatedPosts = blogPosts.map((p) =>
        p.id === editingPostId
          ? {
              ...p,
              title: postTitle.trim(),
              category: postCategory,
              readTime: postReadTime.trim() || '5 min read',
              seoKeywords: keywordsArray,
              metaDescription: postMetaDesc.trim() || postSummary.trim(),
              summary: postSummary.trim(),
              content: postContent.trim(),
              linkedProductId: postLinkedProduct,
              visualType: postVisualType,
              faqs,
            }
          : p
      );
    } else {
      const slug = postTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newPost: BlogPost = {
        id: slug || `totka-${Date.now()}`,
        title: postTitle.trim(),
        category: postCategory,
        readTime: postReadTime.trim() || '5 min read',
        publishedDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        seoKeywords: keywordsArray,
        metaDescription: postMetaDesc.trim() || postSummary.trim(),
        summary: postSummary.trim(),
        content: postContent.trim(),
        linkedProductId: postLinkedProduct,
        visualType: postVisualType,
        faqs,
      };

      updatedPosts = [newPost, ...blogPosts];
    }

    setBlogPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    if (onBlogPostsUpdated) {
      onBlogPostsUpdated(updatedPosts);
    }
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlogPost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = blogPosts.filter((p) => p.id !== postId);
      setBlogPosts(updated);
      saveBlogPosts(updated);
      if (onBlogPostsUpdated) {
        onBlogPostsUpdated(updated);
      }
    }
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    saveAlertEmail(recipientEmail);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleSendTestAlert = () => {
    triggerLowStockEmail('Aftabi Gilgit Shilajit (20g Glass Jar)', 9, 15);
    setEmailLogs(getStoredAlertLogs());
    setTestAlertSentMsg(true);
    setTimeout(() => setTestAlertSentMsg(false), 3500);
  };

  // Filter Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.whatsappPhone.includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl max-h-[92vh] bg-stone-900 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <HerbalLogo size="sm" showText={false} />
            <div>
              <h2 className="text-lg sm:text-xl font-serif-luxury font-bold text-amber-200">
                {t.admin.title}
              </h2>
              <span className="text-[11px] font-mono text-stone-400 block">
                {isAuthenticated ? 'Authenticated Session · Live D2C Operations' : 'PIN Required'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-stone-400 hover:text-stone-200 px-3 py-1.5 rounded-lg border border-stone-800 hover:bg-stone-800 transition-colors hidden sm:block"
              >
                Lock
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Authentication Screen (Zero Hints, PIN: 6598) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center my-auto">
            <div className="flex justify-center mb-5">
              <HerbalLogo size="md" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-bold text-stone-100 mb-1">
              Admin Access Verification
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              {t.admin.pinPrompt}
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setPinError(false);
                  }}
                  maxLength={6}
                  placeholder={t.admin.pinPlaceholder}
                  className="w-full text-center tracking-widest text-xl font-mono bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-hidden focus:border-amber-400"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-400 mt-2">{t.admin.wrongPin}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/10"
              >
                {t.admin.unlock}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-800 bg-stone-950/60 px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{t.admin.ordersTab}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Manage Products</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'blog'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Manage Blog / Totkay</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  {blogPosts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'inventory'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>{t.admin.inventoryTab}</span>
                {inventory.some((i) => i.stock <= i.threshold) && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === 'alerts'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <BellRing className="w-4 h-4" />
                <span>Email Alerts System</span>
              </button>
            </div>

            {/* TAB 1: ORDERS & COURIER EXPORTS */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {/* Search & Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[220px]">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.admin.searchPlaceholder}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-hidden focus:border-amber-400"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Courier Bulk Export Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportOrdersToPostExCSV(orders)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                      title="Download PostEx CSV bulk booking sheet"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.admin.exportPostEx}</span>
                    </button>

                    <button
                      onClick={() => exportOrdersToLeopardsCSV(orders)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
                      title="Download Leopards Courier CSV bulk booking sheet"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.admin.exportLeopards}</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-stone-400 font-mono">
                  {t.admin.courierExportNote}
                </p>

                {/* Orders Table */}
                <div className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-900/90 text-stone-400 uppercase font-mono text-[11px] border-b border-stone-800">
                        <tr>
                          <th className="py-3 px-3.5">Order ID & Date</th>
                          <th className="py-3 px-3.5">Customer & Phone</th>
                          <th className="py-3 px-3.5">City & Address</th>
                          <th className="py-3 px-3.5">Items & Amount</th>
                          <th className="py-3 px-3.5">Status</th>
                          <th className="py-3 px-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800 font-mono">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-stone-500">
                              No orders found matching criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-stone-900/50 transition-colors">
                              <td className="py-3 px-3.5 whitespace-nowrap">
                                <span className="font-bold text-amber-400 block">#{ord.id}</span>
                                <span className="text-[10px] text-stone-500 block">{ord.createdAt}</span>
                              </td>

                              <td className="py-3 px-3.5 whitespace-nowrap font-sans">
                                <span className="font-semibold text-stone-200 block">{ord.customerName}</span>
                                <span className="text-xs font-mono text-emerald-400">{ord.whatsappPhone}</span>
                              </td>

                              <td className="py-3 px-3.5 font-sans max-w-[200px]">
                                <span className="font-semibold text-stone-300 block">{ord.city}</span>
                                <span className="text-[11px] text-stone-400 truncate block" title={ord.address}>
                                  {ord.address} {ord.landmark && `(Near ${ord.landmark})`}
                                </span>
                              </td>

                              <td className="py-3 px-3.5 whitespace-nowrap">
                                <span className="font-bold text-stone-200 block tabular-nums">
                                  Rs. {ord.totalAmount.toLocaleString()}
                                </span>
                                <span className="text-[10px] text-stone-400 font-sans block">
                                  {ord.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Prepaid (JazzCash)'}
                                </span>
                              </td>

                              <td className="py-3 px-3.5 whitespace-nowrap">
                                <select
                                  value={ord.status}
                                  onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                                  className={`px-2 py-1 rounded-lg text-xs font-semibold font-sans border ${
                                    ord.status === 'Delivered'
                                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                      : ord.status === 'Dispatched'
                                      ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                                      : ord.status === 'Confirmed'
                                      ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                                      : 'bg-stone-800 text-stone-300 border-stone-700'
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Dispatched">Dispatched</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>

                              <td className="py-3 px-3.5 text-right whitespace-nowrap">
                                <a
                                  href={buildWhatsAppConfirmationUrl(ord, lang)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
                                  title="Send pre-filled WhatsApp confirmation message"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>{t.admin.sendWhatsAppConfirm}</span>
                                </a>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MANAGE PRODUCTS (ADD NEW PRODUCT FUNCTIONALITY) */}
            {activeTab === 'products' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-serif-luxury font-bold text-amber-200">
                      Product Catalog & New Formulation Setup
                    </h3>
                    <p className="text-xs text-stone-400">
                      Add and manage products available in the storefront and COD checkout.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Add New Product Form */}
                {isAddProductOpen && (
                  <form
                    onSubmit={handleCreateProduct}
                    className="bg-stone-950 p-5 sm:p-6 rounded-2xl border border-amber-500/40 space-y-4 animate-in fade-in duration-200"
                  >
                    <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
                      Add New Product Formulation
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Product Name (English) *
                        </label>
                        <input
                          type="text"
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. Pure Gilgit Saffron (Zafran 5g)"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Product Name (Urdu)
                        </label>
                        <input
                          type="text"
                          value={newProdNameUrdu}
                          onChange={(e) => setNewProdNameUrdu(e.target.value)}
                          placeholder="مثلا: خالص گلگت زعفران"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400 font-urdu"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={newProdTagline}
                          onChange={(e) => setNewProdTagline(e.target.value)}
                          placeholder="e.g. Karakoram Wild Harvest Saffron Threads"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Visual Theme
                        </label>
                        <select
                          value={newProdTheme}
                          onChange={(e) => setNewProdTheme(e.target.value as 'gold' | 'emerald')}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                        >
                          <option value="gold">Gold Luxury Theme (Shilajit / Saffron)</option>
                          <option value="emerald">Emerald Botanical Theme (Oils / Herbs)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Selling Price (PKR) *
                        </label>
                        <input
                          type="number"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Original / Cross-out Price (PKR)
                        </label>
                        <input
                          type="number"
                          value={newProdOriginalPrice}
                          onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(Number(e.target.value))}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Low Stock Alert Threshold
                        </label>
                        <input
                          type="number"
                          value={newProdThreshold}
                          onChange={(e) => setNewProdThreshold(Number(e.target.value))}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-semibold mb-1 text-xs">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        placeholder="Detailed herbal properties and extraction details..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Save & Launch Product
                      </button>
                    </div>
                  </form>
                )}

                {/* Existing Products List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                              prod.theme === 'gold'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {prod.badge}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            Stock: {prod.stockQuantity} units
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-stone-100">{prod.name}</h4>
                        <p className="text-xs text-stone-400">{prod.tagline}</p>
                        <div className="pt-2 text-xs font-mono text-amber-300 font-bold">
                          Starter Pack: Rs. {prod.bundles[0]?.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE BLOG / TOTKAY */}
            {activeTab === 'blog' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-serif-luxury font-bold text-amber-200">
                      Herbal Hub & Desi Totkay Blog Management
                    </h3>
                    <p className="text-xs text-stone-400">
                      Create, edit, and optimize high-ranking SEO totkay guides for Pakistani Google search queries.
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenBlogModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-950/40"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Write New Totka / Guide</span>
                  </button>
                </div>

                {/* Blog Editor Modal */}
                {isBlogModalOpen && (
                  <form
                    onSubmit={handleSaveBlogPost}
                    className="bg-stone-950 p-5 sm:p-6 rounded-2xl border border-emerald-500/40 space-y-4 animate-in fade-in duration-200"
                  >
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider font-mono">
                        {editingPostId ? 'Edit Article & Totkay' : 'Publish New SEO Article'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsBlogModalOpen(false)}
                        className="text-stone-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">
                          Article Title (Include Pakistani search terms) *
                        </label>
                        <input
                          type="text"
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                          placeholder="e.g. Asli vs Naqli Shilajit: 5 Easy Home Purity Tests in Pakistan"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Category *
                        </label>
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value as BlogCategory)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        >
                          <option value="Hair Care & Desi Totkay">Hair Care & Desi Totkay</option>
                          <option value="Shilajit & Stamina Guide">Shilajit & Stamina Guide</option>
                          <option value="Asli vs Naqli (Purity Tests)">Asli vs Naqli (Purity Tests)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Reading Time
                        </label>
                        <input
                          type="text"
                          value={postReadTime}
                          onChange={(e) => setPostReadTime(e.target.value)}
                          placeholder="e.g. 6 min read"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Linked Solution Product (for in-article COD checkout)
                        </label>
                        <select
                          value={postLinkedProduct}
                          onChange={(e) => setPostLinkedProduct(e.target.value as ProductId)}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        >
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-300 font-semibold mb-1">
                          Visual Style
                        </label>
                        <select
                          value={postVisualType}
                          onChange={(e) => setPostVisualType(e.target.value as 'shilajit' | 'hair-oil' | 'combo')}
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        >
                          <option value="shilajit">Shilajit Gold Jar</option>
                          <option value="hair-oil">Hair Oil Emerald Bottle</option>
                          <option value="combo">Duo Combo Visual</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">
                          SEO Keywords (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={postKeywords}
                          onChange={(e) => setPostKeywords(e.target.value)}
                          placeholder="e.g. shilajit price pakistan, hair fall totkay, rosemary oil"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">
                          Short Summary / Excerpt (Displayed on blog cards)
                        </label>
                        <textarea
                          rows={2}
                          value={postSummary}
                          onChange={(e) => setPostSummary(e.target.value)}
                          placeholder="Catchy 2-sentence preview of this totka..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-hidden focus:border-emerald-400"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 font-semibold mb-1">
                          Full Article Content (Markdown / Roman Urdu & English)
                        </label>
                        <textarea
                          rows={8}
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          placeholder="Use ## for Headings, * for bullet points, and --- for dividing sections..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 font-mono focus:outline-hidden focus:border-emerald-400"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-stone-800">
                        <label className="block text-stone-300 font-semibold mb-1">
                          Featured FAQ (Google People Also Ask Query)
                        </label>
                        <input
                          type="text"
                          value={postFaqQ}
                          onChange={(e) => setPostFaqQ(e.target.value)}
                          placeholder="Question: e.g. How long before results are visible?"
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-hidden focus:border-emerald-400 mb-2"
                        />
                        <textarea
                          rows={2}
                          value={postFaqA}
                          onChange={(e) => setPostFaqA(e.target.value)}
                          placeholder="Answer: e.g. Noticeable results within 14 days of regular use..."
                          className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-hidden focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                      <button
                        type="button"
                        onClick={() => setIsBlogModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs hover:bg-stone-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Save & Publish Totka
                      </button>
                    </div>
                  </form>
                )}

                {/* Blog Posts Management Table */}
                <div className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-900 text-stone-400 uppercase font-mono text-[10px] border-b border-stone-800">
                        <tr>
                          <th className="py-3 px-3.5">Title & Published Date</th>
                          <th className="py-3 px-3.5">Category</th>
                          <th className="py-3 px-3.5">Linked Product</th>
                          <th className="py-3 px-3.5">Read Time</th>
                          <th className="py-3 px-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {blogPosts.map((post) => (
                          <tr key={post.id} className="hover:bg-stone-900/50">
                            <td className="py-3 px-3.5 max-w-sm">
                              <span className="font-bold text-stone-200 block truncate">
                                {post.title}
                              </span>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {post.publishedDate}
                              </span>
                            </td>

                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span className="bg-stone-900 px-2.5 py-1 rounded-md border border-stone-800 text-amber-300 text-[11px] font-mono">
                                {post.category}
                              </span>
                            </td>

                            <td className="py-3 px-3.5 text-stone-300 font-mono uppercase text-[11px]">
                              {post.linkedProductId}
                            </td>

                            <td className="py-3 px-3.5 text-stone-400 font-mono text-[11px]">
                              {post.readTime}
                            </td>

                            <td className="py-3 px-3.5 text-right whitespace-nowrap space-x-2">
                              <button
                                onClick={() => handleOpenBlogModal(post)}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors"
                                title="Edit Post"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteBlogPost(post.id)}
                                className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-950 text-red-400 transition-colors"
                                title="Delete Post"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INVENTORY MANAGER */}
            {activeTab === 'inventory' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-base font-serif-luxury font-bold text-amber-200">
                    {t.admin.stockLevels}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Stock automatically deducts whenever an order is placed through Cash on Delivery or JazzCash.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventory.map((item) => {
                    const isLow = item.stock <= item.threshold;

                    return (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border ${
                          isLow
                            ? 'bg-red-950/20 border-red-500/40'
                            : 'bg-stone-950 border-stone-800'
                        } flex flex-col justify-between`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-xs font-mono text-stone-400 uppercase">
                              SKU: {item.sku}
                            </span>
                            {isLow ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono font-bold">
                                <AlertTriangle className="w-3 h-3" />
                                <span>LOW STOCK ALERT</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>HEALTHY STOCK</span>
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-bold text-stone-100">{item.name}</h4>
                          <span className="text-[11px] text-stone-500 font-mono block mt-0.5">
                            Last checked: {item.lastUpdated}
                          </span>
                        </div>

                        {/* Stock Counter Stepper */}
                        <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold font-mono text-white tabular-nums">
                              {item.stock}
                            </span>
                            <span className="text-xs text-stone-400 ml-1.5">{item.unit}</span>
                            <span className="text-[10px] text-stone-500 block">
                              Threshold: {item.threshold} units
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateStock(item, -1)}
                              className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono font-bold flex items-center justify-center transition-colors cursor-pointer"
                              title="Decrease stock by 1"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleUpdateStock(item, 1)}
                              className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono font-bold flex items-center justify-center transition-colors cursor-pointer"
                              title="Increase stock by 1"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleUpdateStock(item, 25)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-colors cursor-pointer"
                              title="Restock +25 units"
                            >
                              +25 Restock
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 5: AUTOMATED LOW STOCK EMAIL NOTIFICATIONS */}
            {activeTab === 'alerts' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                <div>
                  <h3 className="text-base font-serif-luxury font-bold text-amber-200">
                    {t.admin.emailAlertsTitle}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Whenever an item falls below its low stock threshold during checkout or manual inventory adjustments, an automated dispatch notification is transmitted instantly.
                  </p>
                </div>

                {/* Recipient Configuration Card */}
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800">
                  <form onSubmit={handleSaveEmail} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        {t.admin.alertEmailLabel}
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="your-email@gmail.com"
                        className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 self-end">
                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        {t.admin.saveEmailBtn}
                      </button>

                      <button
                        type="button"
                        onClick={handleSendTestAlert}
                        className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.admin.sendTestAlertBtn}</span>
                      </button>
                    </div>
                  </form>

                  {saveSuccessMsg && (
                    <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Notification email updated successfully.</span>
                    </div>
                  )}

                  {testAlertSentMsg && (
                    <div className="mt-3 text-xs text-amber-300 flex items-center gap-1.5 font-medium animate-pulse">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Test low-stock alert dispatched to {recipientEmail}. Check logs below!</span>
                    </div>
                  )}
                </div>

                {/* Email Dispatch Logs */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-stone-400 font-semibold">
                    {t.admin.alertLogsTitle}
                  </h4>

                  <div className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-stone-900 text-stone-400 uppercase text-[10px] border-b border-stone-800">
                          <tr>
                            <th className="py-2.5 px-3">Timestamp</th>
                            <th className="py-2.5 px-3">Recipient</th>
                            <th className="py-2.5 px-3">Subject</th>
                            <th className="py-2.5 px-3">Stock Left</th>
                            <th className="py-2.5 px-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800">
                          {emailLogs.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-stone-500">
                                No email alerts dispatched yet.
                              </td>
                            </tr>
                          ) : (
                            emailLogs.map((log) => (
                              <tr key={log.id} className="hover:bg-stone-900/50">
                                <td className="py-2.5 px-3 text-stone-400 whitespace-nowrap">
                                  {log.timestamp}
                                </td>
                                <td className="py-2.5 px-3 text-stone-200">
                                  {log.recipientEmail}
                                </td>
                                <td className="py-2.5 px-3 text-amber-300 font-sans font-medium">
                                  {log.subject}
                                </td>
                                <td className="py-2.5 px-3 text-red-400 tabular-nums">
                                  {log.currentStock} units (Limit: {log.threshold})
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>{log.status}</span>
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
