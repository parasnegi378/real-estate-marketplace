import React from 'react';
import { PropertyProvider, useProperties } from './context/PropertyContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import PropertyCard from './components/PropertyCard';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import PostPropertyModal from './components/PostPropertyModal';
import MortgageCalculatorModal from './components/MortgageCalculatorModal';
import SiteVisitModal from './components/SiteVisitModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import RegistrationModal from './components/RegistrationModal';
import OwnerLeadsDrawer from './components/OwnerLeadsDrawer';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import { 
  Building2, 
  Home, 
  KeyRound, 
  Sparkles, 
  PlusCircle, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  Phone,
  MessageSquare,
  Landmark,
  Car,
  Zap,
  MapPin,
  ExternalLink,
  SearchX,
  Users
} from 'lucide-react';

function MarketplaceContent() {
  const { 
    filteredProperties, 
    viewMode, 
    filters, 
    resetFilters,
    openSiteVisit,
    setIsPostModalOpen,
    setIsCalculatorModalOpen,
    getWhatsAppLink,
    getCallLink,
    getMapsLink,
    officeDetails,
    leads,
    setIsOwnerLeadsDrawerOpen,
    setIsRegistrationModalOpen
  } = useProperties();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      
      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Listings Section */}
      <main id="listings-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                दिल्ली मात्र 3 KM • 10 Min Dilshad Garden Metro
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                100% Fully Furnished Flats
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                बुकिंग मात्र ₹5,100 • 90% लोन
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {filters.bhk !== 'all' 
                ? `${filters.bhk} BHK Fully Furnished Flats (Indraprastha Yojana - 201102)`
                : filters.purpose === 'sale'
                ? 'Flats For Sale: 2 BHK (₹20L–₹35L) | 3 BHK (₹40L–₹60L) | 4 BHK (₹65L–₹90L)'
                : filters.purpose === 'rent'
                ? 'Fully Furnished Flats For Rent in Indraprastha Yojana'
                : '2, 3 & 4 BHK Fully Furnished Flats in Indraprastha Yojana (201102)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Mahakal Property • GDA Approved & Immediate Freehold Registry • 90% Loan from SBI, PNB, HDFC
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openSiteVisit(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Appointment / Site Visit</span>
            </button>
            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 text-amber-800 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Office Map</span>
              <ExternalLink className="w-3 h-3 text-amber-600" />
            </a>
          </div>
        </div>

        {/* Filter Bar with BHK & Pocket selectors */}
        <FilterBar />

        {/* Listings Grid or List */}
        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-600">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Matching Flats Found</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We couldn't find any flats matching your selected filters in Indraprastha Yojana. Try clearing some filters or call our office at 9818720735 directly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => openSiteVisit(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Book Site Visit
              </button>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Free Cab Pickup Banner */}
        <section className="mt-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-amber-950/85 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                <Car className="w-3.5 h-3.5" />
                दिलशाद गार्डन मेट्रो से फ्री कैब सुविधा
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider">
                बुकिंग मात्र ₹5,100 • 90% लोन
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              Visit Fully Furnished Flats Just 3 KM from Delhi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Don't compromise on your dream home. Mahakal Property provides free pickup from <strong>Dilshad Garden Metro Station (just 10 minutes away)</strong> or Anand Vihar ISBT. Explore 2 BHK (₹20L–₹35L), 3 BHK (₹40L–₹60L), and 4 BHK (₹65L–₹90L) fully furnished flats with 90% loan approval.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openSiteVisit(null)}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Appointment / Site Visit (Free Cab)</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 9818720735</span>
              </a>

              <a
                href={getMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs sm:text-sm rounded-2xl border border-amber-500/30 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Google Maps Location</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3 Major Reasons to Choose Mahakal Property */}
        <section className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose Mahakal Property in Indraprastha Yojana
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Indraprastha Yojana, Ghaziabad (Pin 201102) • Only 3 KM from Delhi Border
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">दिल्ली मात्र 3 KM • 10 Min Metro</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delhi border is only 3 KM away and Dilshad Garden Metro Station is only 10 minutes duration. Direct 5-minute access to Delhi-Dehradun Expressway corridor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">100% Fully Furnished Flats</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every flat comes fully furnished with modular kitchen, designer chimney, geysers, wardrobes, double beds with storage, false ceiling with LED lights, and lift with car parking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">बुकिंग मात्र ₹5,100 • 90% बैंक लोन</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book your ready flat with token amount of just ₹5,100/-. 90% loan approved by SBI, PNB, and HDFC Bank. 2 BHK: ₹20L–₹35L | 3 BHK: ₹40L–₹60L | 4 BHK: ₹65L–₹90L.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mt-20 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2 text-amber-600">
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Frequently Asked Questions (FAQ)</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
              Everything You Need to Know (महाकाल प्रॉपर्टी)
            </h3>

            <div className="space-y-6 text-slate-600 text-xs sm:text-sm">
              <div className="pb-5 border-b border-slate-100">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  How far is Delhi and the nearest Metro Station from Indraprastha Yojana?
                </h4>
                <p className="leading-relaxed">
                  Delhi border is <strong>only 3 KM</strong> away (5–7 minutes drive). The nearest Metro Station is <strong>Dilshad Garden Metro Station (Red Line)</strong>, which is only <strong>10 minutes duration</strong> from our flats!
                </p>
              </div>

              <div className="pb-5 border-b border-slate-100">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  What are the exact rates for 2 BHK, 3 BHK, and 4 BHK flats?
                </h4>
                <p className="leading-relaxed font-semibold text-slate-800">
                  • <strong>2 BHK Fully Furnished Flats:</strong> ₹20 Lakhs to ₹35 Lakhs<br />
                  • <strong>3 BHK Fully Furnished Flats:</strong> ₹40 Lakhs to ₹60 Lakhs<br />
                  • <strong>4 BHK Luxury Furnished Floors:</strong> ₹65 Lakhs to ₹90 Lakhs
                </p>
              </div>

              <div className="pb-5 border-b border-slate-100">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  What is the booking amount and is bank loan available?
                </h4>
                <p className="leading-relaxed">
                  The initial token booking amount is <strong>only ₹5,100/-</strong>. Up to <strong>90% bank loan</strong> is approved by State Bank of India (SBI), Punjab National Bank (PNB), and HDFC Bank. You only pay 10% down payment.
                </p>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  How to visit Mahakal Property Office or request free cab pickup?
                </h4>
                <p className="leading-relaxed">
                  Our office is located at Pocket B, Indraprastha Yojana, Ghaziabad (Pin 201102). You can view our location on Google Maps at <a href={getMapsLink()} target="_blank" rel="noopener noreferrer" className="text-amber-600 font-bold underline">https://maps.app.goo.gl/H95uMghqPPZCSbRK6</a> or call us directly on <strong>9818720735</strong> for free car pickup from Dilshad Garden Metro Station.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Action WhatsApp & Call Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs group transition-all transform hover:scale-110 active:scale-95"
          title="WhatsApp Mahakal Property (9818720735)"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline pr-1">WhatsApp (9818720735)</span>
        </a>
        <a
          href={getCallLink()}
          className="p-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full shadow-2xl flex items-center gap-2 font-black text-xs group transition-all transform hover:scale-110 active:scale-95"
          title="Call Mahakal Property Office (9818720735)"
        >
          <Phone className="w-5 h-5 text-slate-950" />
          <span className="hidden sm:inline pr-1">Call: 9818720735</span>
        </a>
      </div>

      {/* Floating Action Leads & Register Button on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsRegistrationModalOpen(true)}
          className="px-3.5 py-3 bg-slate-900/90 hover:bg-slate-900 text-amber-400 font-black text-xs rounded-full shadow-2xl flex items-center gap-2 border border-amber-500/40 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95"
          title="Register Mobile Number"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span className="hidden md:inline">रजिस्टर मोबाइल</span>
        </button>

        <button
          onClick={() => setIsOwnerLeadsDrawerOpen(true)}
          className="px-3.5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-2xl flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
          title="मालिक के लीड्स और फ़ोन नंबर (9818720735)"
        >
          <Users className="w-4 h-4 text-slate-950" />
          <span>लीड्स ({leads.length})</span>
          {leads.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping"></span>
          )}
        </button>
      </div>

      {/* Global Modals & Drawers */}
      <PropertyDetailsModal />
      <PostPropertyModal />
      <MortgageCalculatorModal />
      <SiteVisitModal />
      <FavoritesDrawer />
      <RegistrationModal />
      <OwnerLeadsDrawer />
      <ToastNotification />

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <PropertyProvider>
      <MarketplaceContent />
    </PropertyProvider>
  );
}
