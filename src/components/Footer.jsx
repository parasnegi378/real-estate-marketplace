import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  Calendar,
  ExternalLink,
  Car,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { 
    updateFilter, 
    resetFilters, 
    setIsPostModalOpen, 
    setIsCalculatorModalOpen, 
    openSiteVisit, 
    showToast,
    getWhatsAppLink,
    getCallLink,
    getMapsLink,
    officeDetails,
    requestCallback
  } = useProperties();

  const [callbackPhone, setCallbackPhone] = useState('');

  const handleCallback = (e) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    requestCallback(callbackPhone.trim());
    setCallbackPhone('');
  };

  const handleBhkFilter = (bhk) => {
    resetFilters();
    updateFilter('bhk', bhk);
    const el = document.getElementById('listings-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm pt-14 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 3 Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-900">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0 border border-amber-500/20">
              <Zap className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">दिल्ली मात्र 3 KM • 10 Min Metro</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Just 3 KM from Delhi border and only 10 minutes from Dilshad Garden Metro Station. Quick connectivity via Delhi-Dehradun Expressway.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">बुकिंग मात्र ₹5,100 • 90% बैंक लोन</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Book your fully furnished flat with token amount of only ₹5,100/-. 90% bank loan approved by SBI, PNB, and HDFC Bank.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0 border border-amber-500/20">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">फ्री कार सुविधा (Free Cab Pickup)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Free pickup and drop facility available from Dilshad Garden Metro, Anand Vihar, or Vaishali Metro for all site visits.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Column 1 & 2: Office Brand & Quick Callback */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Mahakal <span className="text-amber-500">Properties</span>
                </span>
                <span className="block text-xs font-bold text-amber-400">
                  Best Property Dealer in Tila - Jawali Marg, Ghaziabad (201102)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Best Property Dealer in Tila - Jawali Marg, Ghaziabad (201102) & Indraprastha Yojana. 100% Fully Furnished 2 BHK, 3 BHK & 4 BHK Flats starting from ₹20 Lakhs to ₹90 Lakhs with 90% bank loan.
            </p>

            {/* Quick Callback form */}
            <form onSubmit={handleCallback} className="pt-2">
              <span className="block text-xs font-bold text-slate-300 mb-2">
                Instant Call Back (फ़ोन नंबर दर्ज करें)
              </span>
              <div className="flex max-w-sm">
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit Mobile No."
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-l-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-amber-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 rounded-r-xl transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Column 3: Flats by Exact Rates */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Flat Rates (रेट लिस्ट)
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleBhkFilter('2')} className="hover:text-amber-400 transition-colors font-bold text-slate-300">
                  2 BHK: ₹20 Lakhs – ₹35 Lakhs
                </button>
              </li>
              <li>
                <button onClick={() => handleBhkFilter('3')} className="hover:text-amber-400 transition-colors font-bold text-slate-300">
                  3 BHK: ₹40 Lakhs – ₹60 Lakhs
                </button>
              </li>
              <li>
                <button onClick={() => handleBhkFilter('4')} className="hover:text-amber-400 transition-colors font-bold text-slate-300">
                  4 BHK: ₹65 Lakhs – ₹90 Lakhs
                </button>
              </li>
              <li>
                <button onClick={() => setIsCalculatorModalOpen(true)} className="hover:text-amber-400 transition-colors font-extrabold text-emerald-400">
                  90% Loan EMI Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Highlights */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Key Highlights
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="text-amber-400 font-bold">
                ✓ 100% Fully Furnished Flats
              </li>
              <li className="text-slate-300">
                ✓ Only 3 KM from Delhi Border
              </li>
              <li className="text-slate-300">
                ✓ 10 Mins Dilshad Garden Metro
              </li>
              <li className="text-slate-300">
                ✓ Booking Amount Only ₹5,100
              </li>
              <li className="text-slate-300">
                ✓ 90% Loan from SBI, PNB, HDFC
              </li>
            </ul>
          </div>

          {/* Column 5: Office Contacts with Google Maps Link & +91 98187 20735 */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Contact & Location
            </h5>
            <div className="space-y-3 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Tila - Jawali Marg, Opposite Central Park, Pocket B, Indraprastha Yojana, Ghaziabad - <strong>201102</strong>
                </span>
              </p>

              {/* Clickable Google Maps Link */}
              <a
                href={getMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={getCallLink()} className="hover:text-white font-black text-amber-400 text-sm">
                  +91 98187 20735
                </a>
              </p>

              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold text-[#25D366]">
                  WhatsApp: +91 98187 20735
                </a>
              </p>

              <p className="text-[11px] text-amber-200">
                ⏰ Open 7 Days: 9:00 AM – 8:30 PM
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Mahakal Properties • Best Property Dealer in Tila - Jawali Marg, Ghaziabad (201102) • Phone: +91 98187 20735</p>
          <div className="flex items-center gap-4">
            <span>Indraprastha Yojana, Ghaziabad</span>
            <span>•</span>
            <span>Only 3 KM to Delhi</span>
            <span>•</span>
            <span>Dilshad Garden Metro 10 Mins</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
