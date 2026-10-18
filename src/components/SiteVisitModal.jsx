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
  ExternalLink
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
  const [visitDate, setVisitDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('11:00 AM (Morning)');
  const [bhkPreference, setBhkPreference] = useState(
    siteVisitProperty ? `${siteVisitProperty.bhk} BHK` : '3 BHK'
  );
  const [needPickup, setNeedPickup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('Dilshad Garden Metro Station');

  useEffect(() => {
    if (siteVisitProperty) {
      setBhkPreference(`${siteVisitProperty.bhk} BHK`);
    }
  }, [siteVisitProperty]);

  if (!isSiteVisitModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      return;
    }

    bookSiteVisit({
      propertyId: siteVisitProperty?.id || 'general-inquiry',
      propertyTitle: siteVisitProperty?.title || 'Fully Furnished Flat Visit',
      bhk: bhkPreference,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      date: visitDate,
      timeSlot,
      needPickup,
      pickupLocation: needPickup ? pickupLocation.trim() : 'Visiting Office Directly'
    });

    setClientName('');
    setClientPhone('');
  };

  const whatsappDirectUrl = getWhatsAppLink(
    siteVisitProperty?.title || 'Free Site Visit for Fully Furnished Flats',
    siteVisitProperty?.pocket || 'Indraprastha Yojana (Pin 201102)'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-amber-950/90 to-slate-900 text-white relative">
          <button
            onClick={() => setIsSiteVisitModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
              100% Free Site Visit
            </span>
            <span className="text-xs text-amber-200 font-bold">बुकिंग मात्र ₹5,100</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Book Site Visit with <span className="text-amber-400">Mahakal Property</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Indraprastha Yojana (Pin 201102) • Only 3 KM from Delhi • 10 Mins Dilshad Garden Metro
          </p>
        </div>

        {/* Selected property banner */}
        {siteVisitProperty && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between gap-3 text-xs">
            <div className="truncate">
              <span className="font-bold text-amber-900 block truncate">
                Visiting: {siteVisitProperty.title}
              </span>
              <span className="text-amber-700 text-[11px]">
                {siteVisitProperty.pocket} • ₹{siteVisitProperty.priceInLakhs || (siteVisitProperty.price / 100000)} Lakhs • 90% Loan Approved
              </span>
            </div>
            <span className="shrink-0 px-2.5 py-1 bg-amber-600 text-white text-[10px] font-black rounded-lg uppercase">
              {siteVisitProperty.bhk} BHK
            </span>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
          
          {/* Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name (नाम) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number (फ़ोन नंबर) *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit Mobile No."
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-amber-500"
              />
            </div>
          </div>

          {/* BHK Preference with exact user rates */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Flat Budget & Configuration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '2 BHK (₹20L-₹35L)', val: '2 BHK' },
                { label: '3 BHK (₹40L-₹60L)', val: '3 BHK' },
                { label: '4 BHK (₹65L-₹90L)', val: '4 BHK' }
              ].map((bhk) => (
                <button
                  key={bhk.val}
                  type="button"
                  onClick={() => setBhkPreference(bhk.val)}
                  className={`p-2 text-center text-xs font-black rounded-xl border transition-all ${
                    bhkPreference === bhk.val
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {bhk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Select Visit Date
              </label>
              <select
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="Today">Today (आज)</option>
                <option value="Tomorrow">Tomorrow (कल)</option>
                <option value="This Saturday">This Saturday (शनिवार)</option>
                <option value="This Sunday">This Sunday (रविवार)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Select Preferred Time
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <option value="10:00 AM (Morning)">10:00 AM (Morning)</option>
                <option value="11:30 AM (Morning)">11:30 AM (Morning)</option>
                <option value="02:00 PM (Afternoon)">02:00 PM (Afternoon)</option>
                <option value="04:30 PM (Evening)">04:30 PM (Evening)</option>
                <option value="06:00 PM (Evening)">06:00 PM (Evening)</option>
              </select>
            </div>
          </div>

          {/* Free Car Pickup Option */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={needPickup}
                onChange={(e) => setNeedPickup(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 accent-amber-500"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-600" />
                Need Free Cab Pickup from Dilshad Garden Metro / Delhi Border?
              </span>
            </label>

            {needPickup && (
              <div className="pt-2 animate-in fade-in">
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-amber-500"
                >
                  <option value="Dilshad Garden Metro Station (10 Mins)">Dilshad Garden Metro Station (10 Mins)</option>
                  <option value="Anand Vihar ISBT / Metro Station">Anand Vihar ISBT / Metro Station</option>
                  <option value="Vaishali Metro Station">Vaishali Metro Station</option>
                  <option value="Mohan Nagar Metro Station">Mohan Nagar Metro Station</option>
                </select>
              </div>
            )}
          </div>

          {/* Benefits summary */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600 pt-1">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Fully Furnished
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 90% Loan Available
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Token Booking: ₹5,100
            </span>
          </div>

          {/* Action Buttons: Confirm & WhatsApp */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
            >
              <span>Confirm Site Visit Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Mahakal Property (9548804676)</span>
            </a>

            <a
              href={getMapsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-amber-300"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>View Office Location on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-amber-600" />
            </a>
          </div>

        </form>

      </div>
    </div>
  );
}
