import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Phone,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function PropertyCard({ property }) {
  const { 
    formatPrice, 
    favorites, 
    toggleFavorite, 
    openPropertyDetails, 
    openSiteVisit, 
    viewMode,
    getWhatsAppLink,
    getCallLink 
  } = useProperties();

  const isFav = favorites.includes(property.id);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"];

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleSiteVisitClick = (e) => {
    e.stopPropagation();
    openSiteVisit(property);
  };

  const whatsappUrl = getWhatsAppLink(property.title, property.pocket);

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => openPropertyDetails(property)}
        className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden flex flex-col md:flex-row cursor-pointer"
      >
        {/* Photo Container */}
        <div className="relative md:w-80 h-64 md:h-auto shrink-0 overflow-hidden bg-slate-900">
          <img
            src={images[currentImgIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wide bg-amber-500 text-slate-950 shadow-sm">
              {property.bhk} BHK
            </span>
            <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase bg-purple-600 text-white shadow-sm">
              Fully Furnished
            </span>
          </div>

          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 transition-all shadow-md z-10 group/btn"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Slider buttons */}
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handlePrevImg} className="p-1 rounded-full bg-black/60 text-white">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleNextImg} className="p-1 rounded-full bg-black/60 text-white">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Distance badges bottom left */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1">
            <span className="text-[10px] font-black bg-slate-900/90 text-amber-300 px-2 py-0.5 rounded-md">
              3 KM Delhi
            </span>
            <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md">
              10 Min Metro
            </span>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-start justify-between gap-4 mb-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {property.pocket} • Pin 201102
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Booking: ₹5,100 Only
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                  {property.title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-slate-900">
                  {formatPrice(property.price, property.purpose, property.rentFrequency)}
                </p>
                {property.purpose === 'sale' && (
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    90% Loan Available
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{property.address}, Indraprastha Yojana, Ghaziabad - 201102</span>
            </p>

            <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            {/* Indian Flat Specs */}
            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-amber-600" />
                <span>{property.bedrooms} Bedrooms (Fully Furnished)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-amber-600" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-amber-600" />
                <span>{property.areaSqFt} Sq. Ft.</span>
              </div>
              {property.balconies && (
                <div className="text-emerald-700 font-bold">
                  {property.balconies} Balconies
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3 KM Delhi • 10 Mins Dilshad Garden Metro</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={handleSiteVisitClick}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment / Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout
  return (
    <div 
      onClick={() => openPropertyDetails(property)}
      className="group bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-amber-300 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Photo with Overlay Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
        <img
          src={images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
            {property.bhk} BHK
          </span>
          <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase bg-purple-600 text-white shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Fully Furnished
          </span>
        </div>

        {/* Wishlist */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 transition-all shadow-md z-10 group/btn"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Image slider arrows */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={handlePrevImg} className="p-1 rounded-full bg-black/60 text-white">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full">
              {currentImgIndex + 1}/{images.length}
            </span>
            <button onClick={handleNextImg} className="p-1 rounded-full bg-black/60 text-white">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Tag on Image: Delhi Distance & Metro */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md shadow-xs">
            3 KM to Delhi
          </span>
          <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-md shadow-xs">
            10 Min Dilshad Garden Metro
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          {/* Price & 90% Loan Tag */}
          <div className="flex items-baseline justify-between mb-1">
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {formatPrice(property.price, property.purpose, property.rentFrequency)}
            </p>
            {property.purpose === 'sale' && (
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                90% Loan Approved
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              Book at ₹5,100 Only
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              Pin 201102
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
            {property.title}
          </h3>

          {/* Address */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{property.address}, Indraprastha Yojana (201102)</span>
          </p>

          {/* Specs: BHK, Baths, Sqft */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 text-slate-700 text-xs font-bold text-center">
            <div className="bg-slate-50 p-1.5 rounded-xl">
              <span className="text-amber-700 block">{property.bhk} BHK</span>
              <span className="text-[10px] text-purple-700 font-bold">Furnished</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl">
              <span className="text-amber-700 block">{property.bathrooms} Baths</span>
              <span className="text-[10px] text-slate-400 font-medium">{property.balconies || 1} Balcony</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl">
              <span className="text-amber-700 block">{property.areaSqFt}</span>
              <span className="text-[10px] text-slate-400 font-medium">Sq. Ft.</span>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={handleSiteVisitClick}
            className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 transition-all transform active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-950" />
            <span>Book Appointment / Site Visit</span>
          </button>
        </div>

      </div>
    </div>
  );
}
