import React, { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';
import { NEARBY_LANDMARKS } from '../data/properties';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Car, 
  MessageSquare, 
  Sparkles,
  Calculator, 
  Clock, 
  ArrowRight,
  Landmark,
  Building2,
  Zap,
  ExternalLink
} from 'lucide-react';

export default function PropertyDetailsModal() {
  const { 
    selectedProperty, 
    isDetailsModalOpen, 
    setIsDetailsModalOpen, 
    formatPrice, 
    favorites, 
    toggleFavorite, 
    openSiteVisit, 
    showToast, 
    getWhatsAppLink, 
    getCallLink,
    getMapsLink,
    officeDetails 
  } = useProperties();

  if (!isDetailsModalOpen || !selectedProperty) return null;

  const isFav = favorites.includes(selectedProperty.id);
  const images = selectedProperty.images || [];
  const [activeImage, setActiveImage] = useState(images[0] || '');

  // Indian Home Loan EMI Calculator State with 90% Loan (10% Down Payment default)
  const flatPrice = selectedProperty.price;
  const [downPaymentPct, setDownPaymentPct] = useState(10); // 10% down payment
  const [loanTenureYears, setLoanTenureYears] = useState(20); // 20 years
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% SBI/HDFC

  useEffect(() => {
    if (selectedProperty && selectedProperty.images && selectedProperty.images.length > 0) {
      setActiveImage(selectedProperty.images[0]);
    }
  }, [selectedProperty]);

  const downPaymentAmount = Math.round((flatPrice * downPaymentPct) / 100);
  const principalLoan = Math.max(0, flatPrice - downPaymentAmount);
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;

  const monthlyEmi = principalLoan > 0 && monthlyInterestRate > 0
    ? Math.round(
        (principalLoan * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
      )
    : 0;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Listing link copied to clipboard!', 'info');
  };

  const whatsappUrl = getWhatsAppLink(selectedProperty.title, selectedProperty.pocket);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Sticky Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/95 sticky top-0 z-30">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
              {selectedProperty.bhk} BHK Flat
            </span>
            <span className="px-2.5 py-1 rounded-xl text-xs font-black uppercase bg-purple-600 text-white">
              100% Fully Furnished
            </span>
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-xl flex items-center gap-1">
              3 KM to Delhi
            </span>
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl hidden sm:inline border border-emerald-300">
              Booking: ₹5,100 Only
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              title="Share flat details"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => toggleFavorite(selectedProperty.id)}
              className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
              title="Save flat"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => setIsDetailsModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors ml-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Photos Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={activeImage}
                alt={selectedProperty.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-amber-400 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Fully Furnished • 3 KM from Delhi Border • 10 Mins Dilshad Garden Metro
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img
                        ? 'border-amber-500 ring-2 ring-amber-500/20 scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Photo ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Location & Price Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  {selectedProperty.propertyType} • {selectedProperty.pocket}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  90% Loan Approved
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  Booking Amount: ₹5,100
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {selectedProperty.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {selectedProperty.address}, Indraprastha Yojana, Ghaziabad, UP - <strong>201102</strong>
                </span>
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 lg:text-right shrink-0">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-0.5">
                {selectedProperty.purpose === 'sale' ? 'Demand Price' : 'Monthly Rent'}
              </span>
              <p className="text-3xl font-black text-slate-950">
                {formatPrice(selectedProperty.price, selectedProperty.purpose, selectedProperty.rentFrequency)}
              </p>
              {selectedProperty.purpose === 'sale' && (
                <p className="text-xs text-emerald-800 font-extrabold mt-1">
                  Pay Only 10% (₹{(downPaymentAmount / 100000).toFixed(1)}L) • Rest 90% via Bank Loan
                </p>
              )}
            </div>
          </div>

          {/* Key Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <BedDouble className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-base font-black text-slate-900">{selectedProperty.bedrooms} BHK</p>
              <p className="text-[10px] font-bold text-purple-700 uppercase">Fully Furnished</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <Bath className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-base font-black text-slate-900">{selectedProperty.bathrooms} Baths</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Bathrooms</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <Maximize2 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-base font-black text-slate-900">{selectedProperty.areaSqFt}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Super Area (Sq.Ft.)</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <p className="text-base font-black text-amber-700">3 KM</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Delhi Distance</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-base font-black text-blue-700">10 Mins</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Dilshad Garden Metro</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-base font-black text-emerald-700">₹5,100</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Booking Amount</p>
            </div>
          </div>

          {/* 2 Columns: Description & Features vs Booking / Office Action Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Detailed Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Property Description</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Fully Furnished Inclusions Box */}
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2">
                <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-700" />
                  Included in Fully Furnished Package:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-purple-950">
                  <div className="flex items-center gap-1.5">✓ King-Size Beds with Storage & Mattresses</div>
                  <div className="flex items-center gap-1.5">✓ Modular Kitchen with Chimney & RO System</div>
                  <div className="flex items-center gap-1.5">✓ Designer Full-Wall Wardrobes</div>
                  <div className="flex items-center gap-1.5">✓ False Ceiling with Ambient LED Profile Lights</div>
                  <div className="flex items-center gap-1.5">✓ Western Bathrooms with Hot Water Geysers</div>
                  <div className="flex items-center gap-1.5">✓ Ceiling Fans & Exhaust Installed</div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2.5">Features & Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(selectedProperty.amenities || []).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proximity to Delhi and Metro */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-600" />
                  Distance to Key Locations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {NEARBY_LANDMARKS.map((landmark, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-white rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-700">{landmark.name}:</span>
                      <span className="font-bold text-amber-800">{landmark.distance}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 90% Home Loan Monthly EMI Estimator */}
              {selectedProperty.purpose === 'sale' && (
                <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-emerald-900 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-emerald-700" />
                      90% Bank Loan EMI Breakdown (मात्र 10% डाउन पेमेंट)
                    </h3>
                    <span className="text-base font-black text-emerald-800">
                      ₹{monthlyEmi.toLocaleString('en-IN')}/mo
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-medium text-slate-700 mb-3">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Down Payment (10%)</span>
                      <span className="font-bold text-slate-900">₹{downPaymentAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">90% Bank Loan Amount</span>
                      <span className="font-bold text-emerald-700">₹{principalLoan.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Interest Rate</span>
                      <span className="font-bold text-slate-900">{interestRate}% ({loanTenureYears} Years)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-[11px] text-emerald-900 font-semibold space-y-1">
                    <p>✓ <strong>Token booking amount: Only ₹5,100/-</strong>. 90% loan approved by SBI, PNB & HDFC Bank.</p>
                    <p>✓ Mahakal Property handles complete doorstep documentation and registry processing.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Right 5 Columns: Office Contact & Site Visit Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-6 space-y-5">
              
              {/* Mahakal Property Office Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{officeDetails.name}</h4>
                  <p className="text-[11px] text-slate-600 font-semibold">Indraprastha Yojana (Pin 201102)</p>
                  <p className="text-[11px] text-amber-900 font-bold">3 KM Delhi • 10 Min Metro</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5">
                <button
                  onClick={() => openSiteVisit(selectedProperty)}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Site Visit (Free Cab)</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp (9548804676)</span>
                </a>

                <a
                  href={getCallLink()}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call: 9548804676</span>
                </a>

                {/* Google Maps Button */}
                <a
                  href={getMapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-xs rounded-2xl border border-amber-300 flex items-center justify-center gap-1.5 transition-all"
                >
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Open Office Location on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-amber-600" />
                </a>
              </div>

              {/* Office Address Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Office Address:
                </p>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {officeDetails.address}, Pin Code: <strong>201102</strong>
                </p>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Booking: ₹5,100
                </span>
                <span className="text-amber-800 font-bold">
                  90% Loan Approved
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
