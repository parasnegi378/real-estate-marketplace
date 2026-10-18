import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  Building2, 
  Phone, 
  User, 
  Home, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Lock,
  Sparkles
} from 'lucide-react';

export default function RegistrationModal() {
  const { 
    isRegistrationModalOpen, 
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
      setError('कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें (10-digit mobile number)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Call registration in context which saves state, dispatches WhatsApp to owner, and unlocks the site
    registerVisitorLead({
      name: name.trim(),
      phone: cleanPhone,
      bhkPreference: bhk
    });

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95 duration-200">
        
        {/* Compact Header with Mahakal Property branding */}
        <div className="relative bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white p-5 sm:p-6 border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
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
            <h2 className="text-base sm:text-lg font-black text-amber-400 leading-snug">
              फ़्लैट देखने के लिए अपना मोबाइल नंबर रजिस्टर करें
            </h2>
            <p className="text-[11px] text-slate-300">
              Registration is required to view 2, 3 & 4 BHK rates and floor plans.
            </p>
          </div>

          {/* Quick USPs Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800 text-[10px] font-bold">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Zap className="w-3 h-3 fill-amber-400" /> दिल्ली 3 KM
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
              10 Min मेट्रो
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> 90% बैंक लोन
            </span>
          </div>
        </div>

        {/* Scrollable Form Body with max-height and overflow-y-auto */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
          
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>आपका नाम (Full Name) *</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. अमित कुमार (Amit Kumar)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>मोबाइल नंबर (10-Digit Mobile) *</span>
              </span>
              <span className="text-[10px] font-bold text-amber-700">Owner को WhatsApp अलर्ट जाएगा</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-black text-slate-600">
                +91
              </div>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9818720735"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-colors tracking-wider font-mono"
              />
            </div>
          </div>

          {/* BHK Preference with exact rates */}
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              <span>फ्लैट की पसंद व बजट (Select BHK)</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '2 BHK', rate: '₹20L–₹35L' },
                { label: '3 BHK', rate: '₹40L–₹60L' },
                { label: '4 BHK', rate: '₹65L–₹90L' }
              ].map((item) => {
                const fullText = `${item.label} (${item.rate})`;
                const isSelected = bhk === fullText;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setBhk(fullText)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 font-bold'
                    }`}
                  >
                    <span className="block text-xs font-black">{item.label}</span>
                    <span className="block text-[10px] opacity-90">{item.rate}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prominent Register Button - Immediately Below Inputs */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>{isSubmitting ? 'रजिस्टर हो रहा है...' : 'रजिस्टर करें और वेबसाइट देखें (Register Now)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust reassurance notice */}
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-900 leading-tight font-medium">
              रजिस्टर करते ही आपका नंबर महाकाल प्रॉपर्टी मालिक (<strong>{officeDetails.phoneDisplay}</strong>) के WhatsApp पर अलर्ट के रूप में पहुंच जाएगा ताकि हम आपसे संपर्क कर सकें।
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
