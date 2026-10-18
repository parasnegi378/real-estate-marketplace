import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  Building2, 
  Phone, 
  User, 
  Home, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Zap, 
  X, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function RegistrationModal() {
  const { 
    isRegistrationModalOpen, 
    setIsRegistrationModalOpen, 
    registerVisitorLead,
    officeDetails 
  } = useProperties();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bhk, setBhk] = useState('2 BHK (₹20L – ₹35L)');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isRegistrationModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    
    if (!name.trim()) {
      setError('कृपया अपना नाम दर्ज करें (Please enter your name)');
      return;
    }

    if (cleanPhone.length !== 10) {
      setError('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें (10-digit mobile number)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    registerVisitorLead({
      name: name.trim(),
      phone: cleanPhone,
      bhkPreference: bhk
    });

    setIsSubmitting(false);
  };

  const handleSkip = () => {
    setIsRegistrationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* Header with Mahakal Property branding */}
        <div className="relative bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white p-6 sm:p-7 border-b border-amber-500/30">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Close / Skip"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Mahakal <span className="text-amber-400">Property</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40">
                  कार्यालय
                </span>
              </div>
              <p className="text-xs text-slate-300 font-semibold">
                इंद्रप्रस्थ योजना, गाजियाबाद (पिन 201102)
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-black text-amber-400 leading-tight">
              फ़्लैट देखने से पहले अपना मोबाइल नंबर रजिस्टर करें
            </h2>
            <p className="text-xs text-slate-300">
              Register mobile number to view flat prices, floor plans & get direct WhatsApp updates from our office.
            </p>
          </div>

          {/* Quick USPs Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-800 text-[10px] sm:text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Zap className="w-3 h-3 fill-amber-400" /> दिल्ली मात्र 3 KM
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
              10 Min दिलशाद गार्डन मेट्रो
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> 90% बैंक लोन
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>आपका नाम (Full Name) *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. अमित कुमार (Amit Kumar)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>मोबाइल नंबर (10-Digit Mobile Number) *</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">Owner को तुरंत SMS/WhatsApp जाएगा</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-black text-slate-600">
                +91
              </div>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9548804676"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors tracking-wider"
              />
            </div>
          </div>

          {/* BHK Preference */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              <span>फ्लैट की पसंद व बजट (Select BHK & Budget)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: '2 BHK', rate: '₹20L – ₹35L' },
                { label: '3 BHK', rate: '₹40L – ₹60L' },
                { label: '4 BHK', rate: '₹65L – ₹90L' }
              ].map((item) => {
                const fullText = `${item.label} (${item.rate})`;
                const isSelected = bhk === fullText;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setBhk(fullText)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold'
                    }`}
                  >
                    <span className="block text-xs font-black">{item.label}</span>
                    <span className="block text-[11px] opacity-90">{item.rate}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notice for Owner contact */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed font-semibold">
              रजिस्टर करते ही आपका नंबर महाकाल प्रॉपर्टी के मालिक (<strong>{officeDetails.phoneDisplay}</strong>) के पास तुरंत पहुंच जाएगा ताकि हमारी टीम आपसे सीधे संपर्क करके पूरी जानकारी व साइट विजिट करा सके।
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>{isSubmitting ? 'रजिस्टर हो रहा है...' : 'रजिस्टर करें और फ्लैट देखें (Register & Explore)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              बाद में रजिस्टर करें / सीधे देखें (Skip & Browse)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
