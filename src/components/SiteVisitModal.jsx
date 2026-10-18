import React, { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight,
  ExternalLink,
  User,
  Home
} from 'lucide-react';

export default function SiteVisitModal() {
  const { 
    isSiteVisitModalOpen, 
    setIsSiteVisitModalOpen, 
    siteVisitProperty, 
    bookSiteVisit, 
    officeDetails,
    getWhatsAppLink,
    getMapsLink 
  } = useProperties();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [dateType, setDateType] = useState('Tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM (Morning)');
  const [bhkPreference, setBhkPreference] = useState(
    siteVisitProperty ? `${siteVisitProperty.bhk} BHK` : '2 BHK'
  );
  const [needPickup, setNeedPickup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('Dilshad Garden Metro Station (10 Mins)');
  const [error, setError] = useState('');

  // Auto-fill customer details from localStorage if they already registered
  useEffect(() => {
    if (isSiteVisitModalOpen) {
      try {
        const savedName = localStorage.getItem('mahakal_user_name');
        const savedPhone = localStorage.getItem('mahakal_user_phone');
        const savedBhk = localStorage.getItem('mahakal_user_bhk');
        if (savedName && !clientName) setClientName(savedName);
        if (savedPhone && !clientPhone) setClientPhone(savedPhone);
        if (siteVisitProperty) {
          setBhkPreference(`${siteVisitProperty.bhk} BHK`);
        } else if (savedBhk) {
          setBhkPreference(savedBhk.split(' ')[0] + ' BHK');
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isSiteVisitModalOpen, siteVisitProperty]);

  if (!isSiteVisitModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = clientPhone.replace(/[^0-9]/g, '');

    if (!clientName.trim()) {
      setError('कृपया अपना नाम दर्ज करें (Please enter your name)');
      return;
    }

    if (cleanPhone.length !== 10) {
      setError('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें');
      return;
    }

    setError('');

    const finalDate = dateType === 'Custom' && customDate ? customDate : dateType;

    bookSiteVisit({
      propertyId: siteVisitProperty?.id || 'general-inquiry',
      propertyTitle: siteVisitProperty?.title || 'Fully Furnished Flat Visit',
      bhk: bhkPreference,
      clientName: clientName.trim(),
      clientPhone: cleanPhone,
      date: finalDate,
      timeSlot,
      needPickup,
      pickupLocation: needPickup ? pickupLocation : 'Direct Office Visit'
    });
  };

  const whatsappDirectUrl = getWhatsAppLink(
    siteVisitProperty?.title || 'Site Visit Appointment for Fully Furnished Flats',
    siteVisitProperty?.pocket || 'Indraprastha Yojana (Pin 201102)'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white relative shrink-0">
          <button
            onClick={() => setIsSiteVisitModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
              100% Free Site Visit
            </span>
            <span className="text-xs text-amber-200 font-bold">टोकन बुकिंग ₹5,100 • 90% लोन</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-400" />
            <span>Book Appointment / Site Visit</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            महाकाल प्रॉपर्टी • इंद्रप्रस्थ योजना, गाजियाबाद (पिन 201102) • दिल्ली मात्र 3 KM
          </p>
        </div>

        {/* Selected property banner */}
        {siteVisitProperty && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-between gap-3 text-xs shrink-0">
            <div className="truncate">
              <span className="font-bold text-amber-900 block truncate">
                Selected: {siteVisitProperty.title}
              </span>
              <span className="text-amber-700 text-[11px]">
                {siteVisitProperty.pocket} • ₹{siteVisitProperty.priceInLakhs || (siteVisitProperty.price / 100000)} Lakhs • 90% Loan
              </span>
            </div>
            <span className="shrink-0 px-2.5 py-1 bg-amber-600 text-white text-[10px] font-black rounded-lg uppercase">
              {siteVisitProperty.bhk} BHK
            </span>
          </div>
        )}

        {/* Booking Form with overflow-y-auto */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm flex-1">
          
          {error && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {error}
            </div>
          )}

          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>आपका नाम (Full Name) *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. राहुल शर्मा"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>मोबाइल नंबर (10-Digit Mobile) *</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9818720735"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:border-amber-500 focus:bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* BHK Preference with exact user rates */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              <span>फ्लैट की पसंद व बजट (Select BHK & Rate)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '2 BHK', rate: '₹20L–₹35L', val: '2 BHK' },
                { label: '3 BHK', rate: '₹40L–₹60L', val: '3 BHK' },
                { label: '4 BHK', rate: '₹65L–₹90L', val: '4 BHK' }
              ].map((bhk) => (
                <button
                  key={bhk.val}
                  type="button"
                  onClick={() => setBhkPreference(bhk.val)}
                  className={`p-2 text-center rounded-xl border transition-all ${
                    bhkPreference.includes(bhk.val)
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-black shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <span className="block text-xs font-black">{bhk.label}</span>
                  <span className="block text-[10px] opacity-90">{bhk.rate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>अपॉइंटमेंट तारीख (Select Date)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                {['Today (आज)', 'Tomorrow (कल)', 'Saturday', 'Sunday'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setDateType(d);
                    }}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition-colors ${
                      dateType === d
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setDateType('Custom');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
                placeholder="या अन्य तारीख चुनें"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>समय (Preferred Time Slot)</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-amber-500"
              >
                <option value="10:00 AM (Morning)">10:00 AM (सुबह 10 बजे)</option>
                <option value="11:30 AM (Morning)">11:30 AM (सुबह 11:30 बजे)</option>
                <option value="02:00 PM (Afternoon)">02:00 PM (दोपहर 2 बजे)</option>
                <option value="04:30 PM (Evening)">04:30 PM (शाम 4:30 बजे)</option>
                <option value="06:00 PM (Evening)">06:00 PM (शाम 6 बजे)</option>
              </select>
            </div>
          </div>

          {/* Free Car Pickup Option */}
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={needPickup}
                onChange={(e) => setNeedPickup(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-500"
              />
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-600" />
                दिलशाद गार्डन मेट्रो या दिल्ली बॉर्डर से फ्री कैब पिकअप चाहिए?
              </span>
            </label>

            {needPickup && (
              <div className="pt-1.5 animate-in fade-in">
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-amber-500"
                >
                  <option value="Dilshad Garden Metro Station (10 Mins)">Dilshad Garden Metro Station (मात्र 10 मिनट)</option>
                  <option value="Anand Vihar ISBT / Metro Station">Anand Vihar ISBT / Metro Station</option>
                  <option value="Vaishali Metro Station">Vaishali Metro Station</option>
                  <option value="Mohan Nagar Metro Station">Mohan Nagar Metro Station</option>
                  <option value="Delhi-Dehradun Expressway Entry">Delhi-Dehradun Expressway Entry</option>
                </select>
              </div>
            )}
          </div>

          {/* Benefits summary */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-700">
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Fully Furnished
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 90% बैंक लोन
            </span>
            <span className="flex items-center gap-1 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> बुकिंग: ₹5,100
            </span>
          </div>

          {/* Submit Button & Direct WhatsApp Links */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>अपॉइंटमेंट बुक करें और WhatsApp भेजें (Confirm Appointment)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: 9818720735</span>
              </a>

              <a
                href={getMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-amber-300"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Office Map Link</span>
                <ExternalLink className="w-3 h-3 text-amber-600" />
              </a>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
