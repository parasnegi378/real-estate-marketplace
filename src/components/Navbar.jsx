import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  Building2, 
  Heart, 
  PlusCircle, 
  Calculator, 
  Phone, 
  Menu, 
  X, 
  Calendar,
  Sparkles,
  MessageSquare,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  UserCheck
} from 'lucide-react';

export default function Navbar() {
  const { 
    favorites, 
    setIsFavoritesDrawerOpen, 
    setIsPostModalOpen, 
    setIsCalculatorModalOpen,
    openSiteVisit,
    updateFilter,
    resetFilters,
    getWhatsAppLink,
    getCallLink,
    getMapsLink,
    officeDetails,
    leads,
    setIsOwnerLeadsDrawerOpen,
    setIsRegistrationModalOpen
  } = useProperties();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBhkFilter = (bhk) => {
    resetFilters();
    updateFilter('bhk', bhk);
    setMobileMenuOpen(false);
    const element = document.getElementById('listings-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      {/* Top Ticker Banner with User's Key USPs */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950/95 to-slate-950 text-white text-[11px] font-bold py-1.5 px-4 sm:px-6 lg:px-8 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-extrabold">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              दिल्ली मात्र 3 KM (Only 3 KM from Delhi)
            </span>
            <span className="text-amber-500/40">•</span>
            <span className="text-amber-300 font-bold">
              दिलशाद गार्डन मेट्रो सिर्फ 10 मिनट (Dilshad Garden Metro 10 Mins)
            </span>
            <span className="hidden md:inline text-amber-500/40">•</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-black bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/30">
              बुकिंग मात्र ₹5,100 • 90% बैंक लोन
            </span>
            <span className="hidden lg:inline text-amber-200 font-semibold">
              फुली फर्निश्ड फ्लैट्स (Pin 201102)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-black">
            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors underline"
              title="View Mahakal Property Office on Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Office Map</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <a
              href={getCallLink()}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors text-white"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: 9548804676</span>
            </a>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#20ba5a] flex items-center gap-1 font-black transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Mahakal Property */}
          <div 
            onClick={handleScrollToTop} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                  Mahakal <span className="text-amber-600">Property</span>
                </span>
                <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                  Office
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold hidden sm:block">
                Indraprastha Yojana, Ghaziabad (Pin 201102) • 3 KM from Delhi
              </p>
            </div>
          </div>

          {/* Nav Links with Specific Price Rates */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleBhkFilter('2')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all"
            >
              2 BHK (₹20L – ₹35L)
            </button>
            <button
              onClick={() => handleBhkFilter('3')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all"
            >
              3 BHK (₹40L – ₹60L)
            </button>
            <button
              onClick={() => handleBhkFilter('4')}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all"
            >
              4 BHK (₹65L – ₹90L)
            </button>
            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all flex items-center gap-1 border border-amber-200"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Office Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsCalculatorModalOpen(true)}
              className="px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all flex items-center gap-1 border border-emerald-200"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              90% Loan EMI
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Owner Leads Drawer CTA */}
            <button
              onClick={() => setIsOwnerLeadsDrawerOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-black text-xs rounded-xl transition-all shadow-2xs"
              title="View Owner Leads & Customer Phone Numbers"
            >
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>Leads</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {leads.length}
              </span>
            </button>

            {/* Quick Register Button */}
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
              title="Register Your Mobile Number"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Register</span>
            </button>

            {/* Book Site Visit CTA */}
            <button
              onClick={() => openSiteVisit(null)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/25 hover:shadow-lg transition-all transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Visit</span>
            </button>

            {/* List Property */}
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Post</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsFavoritesDrawerOpen(true)}
              className="relative p-2 text-slate-700 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              title="Saved Flats"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

          </div>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => setIsOwnerLeadsDrawerOpen(true)}
              className="px-2 py-1.5 bg-amber-50 border border-amber-300 text-amber-950 font-black text-[11px] rounded-lg flex items-center gap-1"
              title="Owner Leads"
            >
              <Users className="w-3 h-3 text-amber-700" />
              <span>{leads.length}</span>
            </button>
            <a
              href={getCallLink()}
              className="px-2.5 py-1.5 bg-slate-900 text-amber-400 font-bold text-[11px] rounded-lg flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Call</span>
            </a>
            <button
              onClick={() => openSiteVisit(null)}
              className="px-2.5 py-1.5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-lg"
            >
              Visit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleBhkFilter('2')}
              className="text-left py-2 px-3 rounded-lg font-bold text-xs text-slate-800 bg-slate-50 hover:bg-amber-50"
            >
              2 BHK Flats (₹20 Lakhs – ₹35 Lakhs)
            </button>
            <button
              onClick={() => handleBhkFilter('3')}
              className="text-left py-2 px-3 rounded-lg font-bold text-xs text-slate-800 bg-slate-50 hover:bg-amber-50"
            >
              3 BHK Flats (₹40 Lakhs – ₹60 Lakhs)
            </button>
            <button
              onClick={() => handleBhkFilter('4')}
              className="text-left py-2 px-3 rounded-lg font-bold text-xs text-slate-800 bg-slate-50 hover:bg-amber-50"
            >
              4 BHK Luxury Flats (₹65 Lakhs – ₹90 Lakhs)
            </button>
            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg font-bold text-xs text-amber-900 bg-amber-50 flex items-center justify-between border border-amber-200"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                Office Location on Google Maps
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
            </a>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl text-xs font-bold text-amber-950 border border-amber-200 space-y-1">
            <p className="text-amber-800 font-extrabold">⚡ Delhi Only 3 KM • Dilshad Garden Metro 10 Mins</p>
            <p className="text-emerald-800 font-extrabold">✓ Booking Amount Only ₹5,100 • 90% Loan Approved</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                openSiteVisit(null);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-center rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Site Visit (Free Cab)</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Mahakal Property (9548804676)</span>
            </a>

            <a
              href={getCallLink()}
              className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Office: 9548804676</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
