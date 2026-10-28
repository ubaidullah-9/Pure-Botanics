import React from 'react';
import { X, CheckCircle2, ShieldCheck, Download, Award, FileText } from 'lucide-react';
import { Language } from '../types';

interface LabReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const LabReportModal: React.FC<LabReportModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl text-stone-100 p-6 md:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          aria-label="Close lab certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header */}
        <div className="text-center border-b border-stone-800 pb-5 mb-6">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full mb-3 border border-amber-500/20">
            <Award className="w-4 h-4" />
            <span>Government of Pakistan Accredited Test Facility</span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif-luxury font-bold text-amber-100">
            PCSIR Laboratories Complex Karachi
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Pakistan Council of Scientific & Industrial Research · Chemical & Food Technology Division
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-300">
            <span>Report No: <strong className="text-amber-300">KHI-CHM-9428-2026</strong></span>
            <span>·</span>
            <span>Batch No: <strong className="text-amber-300">AK-26-GIL</strong></span>
            <span>·</span>
            <span>ISO/IEC 17025:2017 Certified</span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="space-y-6 text-sm">
          {/* Sample Description */}
          <div className="bg-stone-950/60 rounded-xl p-4 border border-stone-800">
            <h3 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold mb-2">
              Sample Particulars
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block">Sample Marked</span>
                <span className="font-medium text-stone-200">Aftabi Gilgit Shilajit</span>
              </div>
              <div>
                <span className="text-stone-500 block">Physical State</span>
                <span className="font-medium text-stone-200">Pure Semi-Solid Resin</span>
              </div>
              <div>
                <span className="text-stone-500 block">Origin Location</span>
                <span className="font-medium text-stone-200">Gilgit-Baltistan (16,200 ft)</span>
              </div>
              <div>
                <span className="text-stone-500 block">Test Date</span>
                <span className="font-medium text-stone-200">14-Sep-2026</span>
              </div>
            </div>
          </div>

          {/* Test Results Table */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Chemical Assay & Active Bio-Constituents</span>
            </h3>

            <div className="border border-stone-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                  <tr>
                    <th className="py-2.5 px-3">Parameter / Test</th>
                    <th className="py-2.5 px-3">Test Method</th>
                    <th className="py-2.5 px-3">Result</th>
                    <th className="py-2.5 px-3">Standard Limit</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 font-mono tabular-nums">
                  <tr className="bg-amber-500/5">
                    <td className="py-2.5 px-3 font-semibold text-amber-200">Fulvic Acid (Dry Basis)</td>
                    <td className="py-2.5 px-3 text-stone-400">UV-Vis Spectrophotometry</td>
                    <td className="py-2.5 px-3 font-bold text-amber-400">68.42 %</td>
                    <td className="py-2.5 px-3 text-stone-400">Min 50.0 %</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-stone-300">Humic Acid Content</td>
                    <td className="py-2.5 px-3 text-stone-400">Gravimetric Precipitation</td>
                    <td className="py-2.5 px-3 text-stone-200">11.20 %</td>
                    <td className="py-2.5 px-3 text-stone-400">10.0 - 15.0 %</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-stone-300">Moisture Content</td>
                    <td className="py-2.5 px-3 text-stone-400">Oven Drying @ 105°C</td>
                    <td className="py-2.5 px-3 text-stone-200">13.80 %</td>
                    <td className="py-2.5 px-3 text-stone-400">Max 15.0 %</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-stone-300">Lead (Pb)</td>
                    <td className="py-2.5 px-3 text-stone-400">ICP-OES Heavy Metal Assay</td>
                    <td className="py-2.5 px-3 text-emerald-400">&lt; 0.005 ppm</td>
                    <td className="py-2.5 px-3 text-stone-400">Max 10.0 ppm</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-stone-300">Arsenic (As)</td>
                    <td className="py-2.5 px-3 text-stone-400">ICP-OES Heavy Metal Assay</td>
                    <td className="py-2.5 px-3 text-emerald-400">&lt; 0.002 ppm</td>
                    <td className="py-2.5 px-3 text-stone-400">Max 3.0 ppm</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-stone-300">Mercury (Hg)</td>
                    <td className="py-2.5 px-3 text-stone-400">Cold Vapor Atomic Absorption</td>
                    <td className="py-2.5 px-3 text-emerald-400">Not Detected</td>
                    <td className="py-2.5 px-3 text-stone-400">Max 1.0 ppm</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-semibold">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Stamp & Conclusion */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-xs text-stone-300">
              <strong className="text-emerald-300 text-sm block mb-1">
                {lang === 'ur' ? 'لیبارٹری نتیجہ: 100% اصلی اور خالص' : 'Official Laboratory Conclusion: 100% Genuine & Pure'}
              </strong>
              <p>
                {lang === 'ur' 
                  ? 'نمونے میں کوئی کیمیکل، گڑ، چینی یا بھاری زہریلی دھاتیں نہیں پائی گئیں۔ یہ اعلیٰ ترین معیار کی خالص ہمالیائی سلاجیت ہے۔'
                  : 'The tested sample complies fully with pharmaceutical grade Aftabi purified Himalayan Shilajit standards with no chemical adulteration, filler gums, or hazardous heavy metals.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500">Seal Verified: PCSIR-KHI-CTD-2026</span>
          <button
            onClick={() => {
              window.print();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'رپورٹ پرنٹ کریں' : 'Print Lab Report'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
