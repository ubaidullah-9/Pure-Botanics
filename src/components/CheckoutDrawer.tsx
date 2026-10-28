import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Truck, Phone, MapPin, Building, CreditCard, Banknote } from 'lucide-react';
import { Product, BundleOption, Language, PaymentMethod, CustomerOrder } from '../types';
import { translations, PAKISTANI_CITIES } from '../data/translations';
import { createNewOrder, buildWhatsAppConfirmationUrl } from '../services/storage';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedBundle: BundleOption;
  lang: Language;
  onOrderSuccess?: (order: CustomerOrder) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  product,
  selectedBundle,
  lang,
  onOrderSuccess,
}) => {
  const t = translations[lang];

  // Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  
  // Validation & Processing
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<CustomerOrder | null>(null);

  // Reset modal state when opening
  useEffect(() => {
    if (isOpen) {
      setCreatedOrder(null);
      setErrors({});
    }
  }, [isOpen]);

  // Format Pakistani Phone Number as user types: 03XX-XXXXXXX
  const handlePhoneChange = (val: string) => {
    // strip non-numeric
    const numbersOnly = val.replace(/\D/g, '');
    let formatted = numbersOnly;
    if (numbersOnly.length > 4) {
      formatted = `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 11)}`;
    }
    setPhone(formatted.slice(0, 12));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.name = t.checkout.validationErrors.name;
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (!cleanDigits.startsWith('03') || cleanDigits.length < 11) {
      newErrors.phone = t.checkout.validationErrors.phone;
    }

    if (!city) {
      newErrors.city = t.checkout.validationErrors.city;
    }

    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = t.checkout.validationErrors.address;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pricing calculations
  const subtotal = selectedBundle.originalPrice;
  const bundleDiscount = selectedBundle.originalPrice - selectedBundle.price;
  const deliveryFee = selectedBundle.freeDelivery ? 0 : 200;
  const prepaidDiscount = paymentMethod === 'ONLINE_PREPAID' ? 150 : 0;
  const totalAmount = Math.max(0, selectedBundle.price + deliveryFee - prepaidDiscount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const order = createNewOrder({
        customerName: fullName.trim(),
        whatsappPhone: phone,
        address: address.trim(),
        landmark: landmark.trim() || undefined,
        city,
        paymentMethod,
        paymentDiscount: prepaidDiscount,
        deliveryFee,
        items: [
          {
            productId: product.id,
            productName: lang === 'ur' ? product.nameUrdu : product.name,
            bundleId: selectedBundle.id,
            bundleTitle: lang === 'ur' ? selectedBundle.titleUrdu : selectedBundle.title,
            quantity: 1,
            unitPrice: selectedBundle.price,
            totalPrice: selectedBundle.price,
          },
        ],
        subtotal: selectedBundle.price,
        totalAmount,
        courierNotes: landmark.trim() ? `Near: ${landmark.trim()}` : undefined,
      });

      setCreatedOrder(order);
      if (onOrderSuccess) {
        onOrderSuccess(order);
      }
    } catch (err) {
      console.error('Order creation error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-stone-900 border-l border-amber-500/20 shadow-2xl h-full flex flex-col overflow-y-auto text-stone-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between sticky top-0 bg-stone-900/95 backdrop-blur-md z-20">
          <div>
            <h2 className="text-lg font-serif-luxury font-bold text-amber-200">
              {t.checkout.drawerTitle}
            </h2>
            <p className="text-xs text-stone-400">
              {t.checkout.drawerSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Success State */}
        {createdOrder ? (
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <h3 className="text-xl font-serif-luxury font-bold text-stone-100">
                  {t.orderSuccess.title}
                </h3>
                <p className="text-xs text-amber-400 font-mono mt-1">
                  {t.orderSuccess.orderNumber}: <span className="font-bold text-base text-amber-300">#{createdOrder.id}</span>
                </p>
                <p className="text-xs text-stone-400 mt-2">
                  {t.orderSuccess.summaryMsg}
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs space-y-2">
                <div className="flex justify-between text-stone-400">
                  <span>Customer:</span>
                  <span className="text-stone-200 font-medium">{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>WhatsApp:</span>
                  <span className="text-stone-200 font-mono">{createdOrder.whatsappPhone}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Destination:</span>
                  <span className="text-stone-200">{createdOrder.city}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Payment Mode:</span>
                  <span className="text-amber-300 font-medium">{createdOrder.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'JazzCash / EasyPaisa'}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400 font-mono">Rs. {createdOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Prepaid instructions banner if applicable */}
              {createdOrder.paymentMethod === 'ONLINE_PREPAID' && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 text-xs text-amber-200">
                  <strong className="block font-semibold mb-1">
                    {t.orderSuccess.prepaidInstructionsTitle}
                  </strong>
                  <p className="text-stone-300 text-[11px]">
                    {t.orderSuccess.prepaidInstructionsBody.replace('{amount}', createdOrder.totalAmount.toLocaleString())}
                  </p>
                </div>
              )}

              {/* Instant WhatsApp Confirmation */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 text-center">
                <div className="text-xs text-emerald-300 font-semibold mb-1">
                  {t.orderSuccess.whatsappConfirmTitle}
                </div>
                <p className="text-[11px] text-stone-400 mb-3">
                  {t.orderSuccess.whatsappConfirmDesc}
                </p>
                <a
                  href={buildWhatsAppConfirmationUrl(createdOrder, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition-colors shadow-lg shadow-emerald-900/40"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.orderSuccess.openWhatsAppBtn}</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
            >
              {t.orderSuccess.continueShopping}
            </button>
          </div>
        ) : (
          /* Form Checkout View */
          <form onSubmit={handleSubmit} className="p-5 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Selected Bundle Summary Badge */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    {t.checkout.yourOrder}
                  </span>
                  <div className="text-sm font-semibold text-stone-200 mt-0.5">
                    {lang === 'ur' ? selectedBundle.titleUrdu : selectedBundle.title}
                  </div>
                  <div className="text-xs text-stone-400">
                    {lang === 'ur' ? product.nameUrdu : product.name}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-amber-300 font-mono">
                    Rs. {selectedBundle.price.toLocaleString()}
                  </span>
                  {selectedBundle.freeDelivery && (
                    <span className="text-[10px] text-emerald-400 font-mono block">FREE DELIVERY</span>
                  )}
                </div>
              </div>

              {/* Customer Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <span>{t.checkout.fullName}</span>
                  <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  placeholder={t.checkout.fullNamePlaceholder}
                  className={`w-full bg-stone-950 border ${errors.name ? 'border-red-500' : 'border-stone-800'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors`}
                />
                {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.checkout.phone}</span>
                    <span className="text-amber-500">*</span>
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">03XX-XXXXXXX</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder={t.checkout.phonePlaceholder}
                  className={`w-full bg-stone-950 border ${errors.phone ? 'border-red-500' : 'border-stone-800'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors`}
                />
                <p className="text-[10px] text-stone-500 mt-1">{t.checkout.phoneHint}</p>
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Pakistani City Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.checkout.city}</span>
                  <span className="text-amber-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                >
                  {PAKISTANI_CITIES.map((c) => (
                    <option key={c} value={c} className="bg-stone-900 text-stone-100">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address & Famous Landmark */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.checkout.address}</span>
                  <span className="text-amber-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                  }}
                  placeholder={t.checkout.addressPlaceholder}
                  className={`w-full bg-stone-950 border ${errors.address ? 'border-red-500' : 'border-stone-800'} rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors`}
                />
                {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
              </div>

              {/* Landmark input */}
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  {lang === 'ur' ? 'قریبی مشہور نشان یا دکان (اختیاری)' : 'Famous Nearby Landmark (Optional for Courier)'}
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder={lang === 'ur' ? 'مثلا: نزد جامع مسجد، مرکزی مارکیٹ' : 'e.g. Near Shell Pump, Commercial Market'}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Payment Method Toggle */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-2">
                  {t.checkout.paymentMethod}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* COD Option */}
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`cursor-pointer p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="text-amber-500 focus:ring-0"
                      />
                      <span className="text-xs font-bold text-stone-100">
                        {lang === 'ur' ? 'کیش آن ڈیلیوری (COD)' : 'Cash on Delivery'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 pl-5">
                      {lang === 'ur' ? 'پارسل ملنے پر رقم ادا کریں' : 'Pay in cash to rider'}
                    </span>
                  </label>

                  {/* JazzCash / EasyPaisa Prepaid with Extra Rs 150 OFF */}
                  <label
                    onClick={() => setPaymentMethod('ONLINE_PREPAID')}
                    className={`cursor-pointer p-3 rounded-xl border flex flex-col justify-between transition-all relative ${
                      paymentMethod === 'ONLINE_PREPAID'
                        ? 'bg-emerald-500/15 border-emerald-500/60 shadow-sm'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'ONLINE_PREPAID'}
                        onChange={() => setPaymentMethod('ONLINE_PREPAID')}
                        className="text-emerald-500 focus:ring-0"
                      />
                      <span className="text-xs font-bold text-emerald-300">
                        JazzCash / EasyPaisa
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold pl-5">
                      {lang === 'ur' ? 'اضافی 150 روپے رعایت' : 'EXTRA RS. 150 OFF'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-xs space-y-1.5 font-mono tabular-nums">
                <div className="flex justify-between text-stone-400">
                  <span>{t.checkout.subtotal}</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>{t.checkout.discount}</span>
                    <span>- Rs. {bundleDiscount.toLocaleString()}</span>
                  </div>
                )}
                {paymentMethod === 'ONLINE_PREPAID' && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>{t.checkout.prepaidDiscount}</span>
                    <span>- Rs. 150</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>{t.checkout.deliveryFee}</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-400 font-bold">{t.checkout.freeDelivery}</span> : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-stone-100">
                  <span>{t.checkout.totalPayable}</span>
                  <span className="text-amber-300 text-base">Rs. {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>
                  {isSubmitting
                    ? t.checkout.orderProcessing
                    : paymentMethod === 'COD'
                    ? t.checkout.placeOrderBtn
                    : t.checkout.placeOrderPrepaidBtn}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.checkout.guarantee}</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
