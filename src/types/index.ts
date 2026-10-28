export type Language = 'en' | 'ur';

export type ProductId = 'shilajit' | 'hair-oil' | 'ultimate-combo';

export type BundleTier = 'single' | 'double' | 'combo';

export interface BundleOption {
  id: BundleTier;
  title: string;
  titleUrdu: string;
  subtitle: string;
  subtitleUrdu: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  freeDelivery: boolean;
  bonusGift?: string;
  bonusGiftUrdu?: string;
}

export interface Product {
  id: ProductId;
  name: string;
  nameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  theme: 'gold' | 'emerald';
  badge: string;
  badgeUrdu: string;
  description: string;
  descriptionUrdu: string;
  highlights: {
    en: string;
    ur: string;
  }[];
  specifications: {
    label: string;
    labelUrdu: string;
    value: string;
    valueUrdu: string;
  }[];
  bundles: BundleOption[];
  stockQuantity: number;
  lowStockThreshold: number;
  inStock: boolean;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'COD' | 'ONLINE_PREPAID';

export interface OrderItem {
  productId: ProductId;
  productName: string;
  bundleId: BundleTier;
  bundleTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerOrder {
  id: string; // e.g. PK-8492
  createdAt: string;
  customerName: string;
  whatsappPhone: string;
  address: string;
  landmark?: string;
  city: string;
  paymentMethod: PaymentMethod;
  paymentDiscount: number;
  deliveryFee: number;
  items: OrderItem[];
  subtotal: number;
  totalAmount: number;
  status: OrderStatus;
  courierNotes?: string;
  trackingNumber?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  threshold: number;
  unit: string;
  lastUpdated: string;
}

export interface EmailAlertLog {
  id: string;
  timestamp: string;
  recipientEmail: string;
  subject: string;
  productName: string;
  currentStock: number;
  threshold: number;
  status: 'Delivered' | 'Pending';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type BlogCategory =
  | 'Hair Care & Desi Totkay'
  | 'Shilajit & Stamina Guide'
  | 'Asli vs Naqli (Purity Tests)';

export interface BlogPost {
  id: string; // URL slug
  title: string;
  category: BlogCategory;
  readTime: string;
  seoKeywords: string[];
  metaDescription: string;
  summary: string;
  content: string; // Markdown / prose formatted with headings & sections
  visualType: 'shilajit' | 'hair-oil' | 'purity' | 'combo';
  thumbnailUrl?: string;
  linkedProductId: ProductId;
  publishedDate: string;
  faqs: FAQItem[];
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  avatarLetter: string;
  messageEn: string;
  messageUrdu: string;
  whatsappScreenshotTimestamp: string;
}

