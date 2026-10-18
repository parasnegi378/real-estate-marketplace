import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { BHK_OPTIONS, POCKETS } from '../data/properties';
import { 
  Search, 
  MapPin, 
  Home, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Building2,
  KeyRound,
  ArrowRight,
  Car,
  Zap,
  ExternalLink,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function HeroSection() {
  const { 
    filters, 
    updateFilter, 
    setFilters, 
    openSiteVisit, 
    getCallLink, 
    getMapsLink,
    getWhatsAppLink,
    officeDetails 
  } = useProperties();

  const handlePurposeTab = (purpose) => {
    updateFilter('purpose', purpose);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const element = document.getElementById('listings-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBhk = (bhk) => {
    setFilters(prev => ({ ...prev, bhk }));
    const element = document.getElementById('listings-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background with luxury architecture photo and warm amber/dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80"
          alt="Indraprastha Yojana Ghaziabad Flats"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transform transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-22">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-black backdrop-blur-md shadow-md">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>दिल्ली मात्र 3 KM (Only 3 KM to Delhi Border)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-black backdrop-blur-md shadow-md">
            <span>दिलशाद गार्डन मेट्रो सिर्फ 10 मिनट (Dilshad Garden Metro 10 Mins)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black backdrop-blur-md shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>बुकिंग मात्र ₹5,100 • 90% बैंक लोन</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-7">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
            Fully Furnished Flats in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Indraprastha Yojana, Ghaziabad (201102)
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            <strong>Mahakal Property</strong> presents GDA Approved 100% Fully Furnished Flats near Delhi-Dehradun Expressway. 
            <strong> 2 BHK: ₹20L–₹35L | 3 BHK: ₹40L–₹60L | 4 BHK: ₹65L–₹90L</strong>. 
            90% Loan from SBI, PNB, HDFC with just <strong>₹5,100 Booking Amount</strong>.
          </p>

          {/* Quick CTA Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>View Office on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={getCallLink()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: 9818720735</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200 text-slate-900">
          
          {/* Tab Selector: Buy vs Rent */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePurposeTab('sale')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  filters.purpose === 'sale'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4" />
                Buy Furnished Flat (₹20L – ₹90L)
              </button>
              <button
                onClick={() => handlePurposeTab('rent')}
                className={`px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  filters.purpose === 'rent'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Flats For Rent
              </button>
            </div>

            {/* Free Cab from Dilshad Garden Metro */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-amber-700" />
                Free Cab from Dilshad Garden Metro
              </span>
            </div>
          </div>

          {/* Search Inputs: BHK, Pocket, Budget, Action */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            
            {/* BHK Selection */}
            <div className="flex flex-col bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-600" />
                BHK Configuration
              </label>
              <select
                value={filters.bhk}
                onChange={(e) => updateFilter('bhk', e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {BHK_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pocket Selection */}
            <div className="flex flex-col bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Indraprastha Pocket
              </label>
              <select
                value={filters.pocket}
                onChange={(e) => updateFilter('pocket', e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {POCKETS.map((pocket) => (
                  <option key={pocket} value={pocket}>
                    {pocket}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword / Locality search */}
            <div className="flex flex-col bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-colors">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                Search Keyword
              </label>
              <input
                type="text"
                placeholder="Furnished, Lift, Park facing..."
                value={filters.query}
                onChange={(e) => updateFilter('query', e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
              />
            </div>

            {/* Search Button */}
            <div className="h-full flex items-end">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Search className="w-5 h-5 text-slate-950" />
                <span>View Available Flats</span>
              </button>
            </div>

          </form>

          {/* Quick BHK & Price chips with user's exact rates */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Rate Brackets:</span>
              <button
                onClick={() => handleQuickBhk('2')}
                className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
              >
                2 BHK (₹20L – ₹35L)
              </button>
              <button
                onClick={() => handleQuickBhk('3')}
                className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
              >
                3 BHK (₹40L – ₹60L)
              </button>
              <button
                onClick={() => handleQuickBhk('4')}
                className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
              >
                4 BHK (₹65L – ₹90L)
              </button>
            </div>

            {/* Free Visit Link Button */}
            <button
              onClick={() => openSiteVisit(null)}
              className="text-xs font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-1 hover:underline"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Book Appointment / Site Visit (Free Cab)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* 4 Pillars with User's Exact Numbers */}
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center border-t border-slate-800/80 pt-8">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">3 KM</p>
            <p className="text-xs text-slate-300 font-bold mt-1">Delhi Border Distance</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-blue-400">10 Mins</p>
            <p className="text-xs text-slate-300 font-bold mt-1">Dilshad Garden Metro</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">₹5,100</p>
            <p className="text-xs text-slate-300 font-bold mt-1">Booking Amount Only</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white">90% Loan</p>
            <p className="text-xs text-slate-300 font-bold mt-1">SBI / PNB / HDFC Bank</p>
          </div>
        </div>

      </div>
    </div>
  );
}
