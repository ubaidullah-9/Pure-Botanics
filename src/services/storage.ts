import { CustomerOrder, EmailAlertLog, InventoryItem, OrderStatus, Product, BlogPost } from '../types';
import { INITIAL_INVENTORY, INITIAL_ORDERS } from '../data/mockOrders';
import { PRODUCTS } from '../data/products';
import { BLOG_ARTICLES } from '../data/blogArticles';

const ORDERS_STORAGE_KEY = 'aftab_botanics_orders_v1';
const INVENTORY_STORAGE_KEY = 'aftab_botanics_inventory_v1';
const ALERT_EMAIL_STORAGE_KEY = 'aftab_botanics_alert_email_v1';
const ALERT_LOGS_STORAGE_KEY = 'aftab_botanics_alert_logs_v1';
const PRODUCTS_STORAGE_KEY = 'aftab_botanics_products_v1';
const BLOG_STORAGE_KEY = 'aftab_botanics_blog_posts_v1';

export const DEFAULT_ALERT_EMAIL = 'Ubaidullah.bhatti99@gmail.com';

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    const parsed: Product[] = JSON.parse(raw);
    const cleaned = parsed.map((p) => ({
      ...p,
      bundles: p.bundles.map((b) => {
        if (
          (b.bonusGift && /comb|کنگھی/i.test(b.bonusGift)) ||
          (b.bonusGiftUrdu && /کنگھی/i.test(b.bonusGiftUrdu))
        ) {
          if (p.id === 'hair-oil' && b.id === 'double') {
            const copy = { ...b };
            delete copy.bonusGift;
            delete copy.bonusGiftUrdu;
            return copy;
          }
          return {
            ...b,
            bonusGift: 'Free Artisan Dosing Spoon Included',
            bonusGiftUrdu: 'لکڑی کا خوراکی چمچ مفت',
          };
        }
        return b;
      }),
    }));
    return cleaned;
  } catch {
    return PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products', err);
  }
}

export function getStoredBlogPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(BLOG_ARTICLES));
      return BLOG_ARTICLES;
    }
    return JSON.parse(raw);
  } catch {
    return BLOG_ARTICLES;
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save blog posts', err);
  }
}

export function getStoredOrders(): CustomerOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: CustomerOrder[]): void {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

export function getStoredInventory(): InventoryItem[] {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(INITIAL_INVENTORY));
      return INITIAL_INVENTORY;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INVENTORY;
  }
}

export function saveInventory(items: InventoryItem[]): void {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save inventory to localStorage', err);
  }
}

export function getStoredAlertEmail(): string {
  try {
    const email = localStorage.getItem(ALERT_EMAIL_STORAGE_KEY);
    return email || DEFAULT_ALERT_EMAIL;
  } catch {
    return DEFAULT_ALERT_EMAIL;
  }
}

export function saveAlertEmail(email: string): void {
  try {
    localStorage.setItem(ALERT_EMAIL_STORAGE_KEY, email);
  } catch (err) {
    console.error('Failed to save alert email', err);
  }
}

export function getStoredAlertLogs(): EmailAlertLog[] {
  try {
    const raw = localStorage.getItem(ALERT_LOGS_STORAGE_KEY);
    if (!raw) {
      const initialLogs: EmailAlertLog[] = [
        {
          id: 'log-101',
          timestamp: '2026-10-28 09:16 AM',
          recipientEmail: DEFAULT_ALERT_EMAIL,
          subject: '[URGENT] Low Stock Alert: Aftabi Gilgit Shilajit (20g Glass Jar)',
          productName: 'Aftabi Gilgit Shilajit (20g Glass Jar)',
          currentStock: 14,
          threshold: 15,
          status: 'Delivered',
        },
      ];
      localStorage.setItem(ALERT_LOGS_STORAGE_KEY, JSON.stringify(initialLogs));
      return initialLogs;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAlertLogs(logs: EmailAlertLog[]): void {
  try {
    localStorage.setItem(ALERT_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save alert logs', err);
  }
}

export function triggerLowStockEmail(productName: string, currentStock: number, threshold: number): EmailAlertLog {
  const recipient = getStoredAlertEmail();
  const newLog: EmailAlertLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
    recipientEmail: recipient,
    subject: `[URGENT] Low Stock Alert: ${productName} (${currentStock} left)`,
    productName,
    currentStock,
    threshold,
    status: 'Delivered',
  };

  const logs = getStoredAlertLogs();
  const updatedLogs = [newLog, ...logs];
  saveAlertLogs(updatedLogs);
  return newLog;
}

export function createNewOrder(orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>): CustomerOrder {
  const orders = getStoredOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `PK-${randomSuffix}`;

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const newOrder: CustomerOrder = {
    ...orderData,
    id: orderId,
    createdAt: formattedDate,
    status: 'Pending',
    trackingNumber: `PSTX-${Math.floor(10000000 + Math.random() * 90000000)}`,
  };

  const updatedOrders = [newOrder, ...orders];
  saveOrders(updatedOrders);

  // Update inventory in real-time
  const inventory = getStoredInventory();
  let inventoryChanged = false;

  orderData.items.forEach(item => {
    let targetSku = 'inv-shilajit-20g';
    if (item.productId === 'hair-oil') {
      targetSku = 'inv-hair-oil-200ml';
    } else if (item.bundleId === 'combo') {
      // decrement both
      const shilajitInv = inventory.find(i => i.id === 'inv-shilajit-20g');
      const oilInv = inventory.find(i => i.id === 'inv-hair-oil-200ml');
      if (shilajitInv) shilajitInv.stock = Math.max(0, shilajitInv.stock - item.quantity);
      if (oilInv) oilInv.stock = Math.max(0, oilInv.stock - item.quantity);
      inventoryChanged = true;
      return;
    }

    const matched = inventory.find(i => i.id === targetSku);
    if (matched) {
      const deduction = item.bundleId === 'double' ? item.quantity * 2 : item.quantity;
      matched.stock = Math.max(0, matched.stock - deduction);
      matched.lastUpdated = 'Just now';
      inventoryChanged = true;

      // Check if low stock threshold breached
      if (matched.stock <= matched.threshold) {
        triggerLowStockEmail(matched.name, matched.stock, matched.threshold);
      }
    }
  });

  if (inventoryChanged) {
    saveInventory(inventory);
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getStoredOrders();
  const updated = orders.map(ord => {
    if (ord.id === orderId) {
      return { ...ord, status };
    }
    return ord;
  });
  saveOrders(updated);
}

export function buildWhatsAppConfirmationUrl(order: CustomerOrder, lang: 'en' | 'ur' = 'ur'): string {
  const phoneClean = order.whatsappPhone.replace(/[^0-9]/g, '');
  const internationalPhone = phoneClean.startsWith('0') ? `92${phoneClean.slice(1)}` : phoneClean;

  const itemNames = order.items.map(i => `${i.productName} (${i.bundleTitle})`).join(', ');

  const textEn = `Assalam o Alaikum ${order.customerName},\n\nThank you for choosing Pure Botanics!\nYour Order *#${order.id}* has been received.\n\n📦 *Package*: ${itemNames}\n💰 *Amount Payable*: Rs. ${order.totalAmount.toLocaleString()} (${order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Prepaid Verified'})\n📍 *Address*: ${order.address}, ${order.city}\n\nPlease reply with *YES* to immediately dispatch via PostEx / Leopards Courier today. JazaakAllah Khair!`;

  const textUrdu = `السلام علیکم ${order.customerName} صاحب!\n\nپیور بوٹینکس کا انتخاب کرنے کا شکریہ۔\nآپ کا آرڈر *#${order.id}* موصول ہو چکا ہے۔\n\n📦 *آئٹم*: ${itemNames}\n💰 *کل رقم*: ${order.totalAmount.toLocaleString()} روپے (${order.paymentMethod === 'COD' ? 'کیش آن ڈیلیوری' : 'جاز کیش / ایزی پیسہ'})\n📍 *پتہ*: ${order.address}، ${order.city}\n\nبرائے مہربانی اپنا پارسل روانہ کرنے کے لیے *YES* لکھ کر جواب دیں۔ شکریہ!`;

  const chosenText = lang === 'ur' ? textUrdu : textEn;
  return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(chosenText)}`;
}

export function buildSupportWhatsAppUrl(productTitle?: string): string {
  const supportNumber = '923416242967'; // Brand WhatsApp Helpline (0341-6242967)
  const msg = productTitle
    ? `Assalam o Alaikum! I would like to inquire about and order: ${productTitle}. Please share bundle pricing and COD delivery time.`
    : `Assalam o Alaikum Pure Botanics! I want to place an order for Pure Aftabi Shilajit / Herbal Hair Oil with Cash on Delivery.`;
  return `https://wa.me/${supportNumber}?text=${encodeURIComponent(msg)}`;
}

// Pakistani Courier CSV Exporters
export function exportOrdersToPostExCSV(orders: CustomerOrder[]): void {
  const headers = [
    'Order Ref',
    'Customer Name',
    'Customer Phone',
    'Delivery Address',
    'Destination City',
    'COD Amount',
    'Weight (kg)',
    'Items Description',
    'Special Instructions',
  ];

  const rows = orders.map(o => [
    `"${o.id}"`,
    `"${o.customerName.replace(/"/g, '""')}"`,
    `"${o.whatsappPhone}"`,
    `"${(o.address + (o.landmark ? ' Near ' + o.landmark : '')).replace(/"/g, '""')}"`,
    `"${o.city}"`,
    o.paymentMethod === 'COD' ? o.totalAmount : 0,
    '0.5',
    `"${o.items.map(i => `${i.productName} - ${i.bundleTitle}`).join(' + ')}"`,
    `"${(o.courierNotes || 'Call before delivery. Fragile bottle/jar.').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSVFile(csvContent, `PostEx_Bulk_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
}

export function exportOrdersToLeopardsCSV(orders: CustomerOrder[]): void {
  const headers = [
    'Consignee Name',
    'Consignee Mobile',
    'Destination City',
    'Complete Address',
    'COD Amount (PKR)',
    'Number of Pieces',
    'Weight (kg)',
    'Client Order Ref',
    'Special Remarks',
  ];

  const rows = orders.map(o => [
    `"${o.customerName.replace(/"/g, '""')}"`,
    `"${o.whatsappPhone}"`,
    `"${o.city}"`,
    `"${(o.address + (o.landmark ? ' Near ' + o.landmark : '')).replace(/"/g, '""')}"`,
    o.paymentMethod === 'COD' ? o.totalAmount : 0,
    1,
    '0.5',
    `"${o.id}"`,
    `"${(o.courierNotes || 'Fragile Herbal Glass Jars').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadCSVFile(csvContent, `Leopards_Courier_Bulk_${new Date().toISOString().slice(0, 10)}.csv`);
}

function downloadCSVFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
