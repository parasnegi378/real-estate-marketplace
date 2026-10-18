import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  X, 
  Heart, 
  Trash2, 
  ArrowRight, 
  BedDouble, 
  Bath, 
  Maximize2,
  Building
} from 'lucide-react';

export default function FavoritesDrawer() {
  const { 
    isFavoritesDrawerOpen, 
    setIsFavoritesDrawerOpen, 
    favorites, 
    properties, 
    toggleFavorite, 
    openPropertyDetails, 
    formatPrice 
  } = useProperties();

  if (!isFavoritesDrawerOpen) return null;

  const savedProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Saved Properties</h3>
              <p className="text-xs text-slate-500 font-medium">
                {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} bookmarked
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFavoritesDrawerOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">No Saved Properties Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Click the heart icon on any property card to save your favorite homes and compare them later.
              </p>
              <button
                onClick={() => setIsFavoritesDrawerOpen(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  openPropertyDetails(prop);
                  setIsFavoritesDrawerOpen(false);
                }}
                className="group p-3 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all bg-white flex gap-3 cursor-pointer"
              >
                {/* Photo */}
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-900 relative">
                  <img
                    src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase text-white ${
                    prop.purpose === 'sale' ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}>
                    {prop.purpose}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs truncate group-hover:text-emerald-600">
                      {prop.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {prop.city}, {prop.state}
                    </p>
                    <p className="font-black text-slate-900 text-sm mt-1">
                      {formatPrice(prop.price, prop.purpose, prop.rentFrequency)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-600 font-semibold">
                    <span>{prop.bedrooms} bd • {prop.bathrooms} ba</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(prop.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedProperties.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => {
                setIsFavoritesDrawerOpen(false);
                const el = document.getElementById('listings-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Back to Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
