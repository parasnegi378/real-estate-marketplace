import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { BHK_OPTIONS, POCKETS, ALL_AMENITIES } from '../data/properties';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Home, 
  KeyRound, 
  Check, 
  X,
  MapPin,
  Calendar
} from 'lucide-react';

export default function FilterBar() {
  const { 
    filters, 
    updateFilter, 
    resetFilters, 
    filteredProperties,
    viewMode, 
    setViewMode,
    openSiteVisit
  } = useProperties();

  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      updateFilter('amenities', current.filter((a) => a !== amenity));
    } else {
      updateFilter('amenities', [...current, amenity]);
    }
  };

  const hasActiveFilters = 
    filters.purpose !== 'all' || 
    filters.bhk !== 'all' || 
    filters.pocket !== 'All Pockets' || 
    filters.query !== '' || 
    filters.priceMin !== '' || 
    filters.priceMax !== '' || 
    filters.amenities.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-5 mb-8">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        
        {/* Purpose Pills: All / For Sale / For Rent */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => updateFilter('purpose', 'all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filters.purpose === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Listings
          </button>
          <button
            onClick={() => updateFilter('purpose', 'sale')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filters.purpose === 'sale'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Flats For Sale (₹20L - ₹90L)
          </button>
          <button
            onClick={() => updateFilter('purpose', 'rent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              filters.purpose === 'rent'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            Flats For Rent
          </button>
        </div>

        {/* Results Counter and View Mode */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            Showing <span className="text-amber-600 font-black">{filteredProperties.length}</span> Verified Flats
          </span>

          <div className="flex items-center gap-2">
            {/* View Switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showAdvanced || hasActiveFilters
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Options</span>
            </button>

            {/* Clear All */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1"
                title="Reset Filters"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Main Filter Dropdowns Row */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* BHK Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Configuration (BHK)</label>
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
            {['all', '2', '3', '4'].map((bhk) => (
              <button
                key={bhk}
                type="button"
                onClick={() => updateFilter('bhk', bhk)}
                className={`py-1.5 text-xs font-extrabold rounded-lg transition-colors ${
                  filters.bhk === bhk
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {bhk === 'all' ? 'All' : `${bhk} BHK`}
              </button>
            ))}
          </div>
        </div>

        {/* Pocket Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Sector / Pocket</label>
          <select
            value={filters.pocket}
            onChange={(e) => updateFilter('pocket', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-amber-500"
          >
            {POCKETS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Price Budget Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Budget Filter</label>
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'all') {
                updateFilter('priceMin', '');
                updateFilter('priceMax', '');
              } else if (val === '20-35') {
                updateFilter('priceMin', 2000000);
                updateFilter('priceMax', 3500000);
              } else if (val === '35-60') {
                updateFilter('priceMin', 3500000);
                updateFilter('priceMax', 6000000);
              } else if (val === '60-90') {
                updateFilter('priceMin', 6000000);
                updateFilter('priceMax', 9000000);
              }
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-amber-500"
          >
            <option value="all">All Budgets (₹20L - ₹90L)</option>
            <option value="20-35">₹20 Lakhs – ₹35 Lakhs (2 BHK)</option>
            <option value="35-60">₹35 Lakhs – ₹60 Lakhs (3 BHK)</option>
            <option value="60-90">₹60 Lakhs – ₹90 Lakhs (Luxury Floors)</option>
          </select>
        </div>

        {/* Sort Listings */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Sort Properties</label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-amber-500"
          >
            <option value="featured">Featured First (Recommended)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="bhk-high">Highest BHK First</option>
            <option value="area-high">Largest Area (Sq Ft)</option>
          </select>
        </div>

      </div>

      {/* Advanced Amenities Checklist */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Amenities & Features (क्लिक करके फ़िल्टर करें)
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-2xl border border-slate-200">
            {ALL_AMENITIES.map((amenity) => {
              const isSelected = filters.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-slate-950" />}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Active:</span>
          {filters.purpose !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              {filters.purpose === 'sale' ? 'For Sale' : 'For Rent'}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('purpose', 'all')} />
            </span>
          )}
          {filters.bhk !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              {filters.bhk} BHK
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('bhk', 'all')} />
            </span>
          )}
          {filters.pocket !== 'All Pockets' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
              {filters.pocket}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('pocket', 'All Pockets')} />
            </span>
          )}
        </div>
      )}

    </div>
  );
}
