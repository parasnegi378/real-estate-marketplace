import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  ALL_AMENITIES, 
  POCKETS, 
  SAMPLE_PHOTO_PRESETS 
} from '../data/properties';
import { 
  X, 
  Home, 
  KeyRound, 
  Check, 
  Sparkles,
  Building2
} from 'lucide-react';

export default function PostPropertyModal() {
  const { isPostModalOpen, setIsPostModalOpen, addProperty, showToast } = useProperties();

  const [purpose, setPurpose] = useState('sale'); // 'sale' | 'rent'
  const [bhk, setBhk] = useState('3');
  const [title, setTitle] = useState('');
  const [priceInLakhs, setPriceInLakhs] = useState('45');
  const [rentMonthly, setRentMonthly] = useState('15000');
  const [pocket, setPocket] = useState('Pocket B');
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('2nd of 4 Floors');
  const [facing, setFacing] = useState('North-East (Park Facing)');
  const [bathrooms, setBathrooms] = useState(2);
  const [balconies, setBalconies] = useState(2);
  const [areaSqFt, setAreaSqFt] = useState('1350');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([
    'GDA Approved Layout',
    'Bank Loan Available (SBI/PNB/HDFC)',
    'Covered Car Parking',
    'Lift with Power Backup',
    'Modular Kitchen with Chimney'
  ]);
  const [selectedPhotos, setSelectedPhotos] = useState([
    SAMPLE_PHOTO_PRESETS[0].url
  ]);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  if (!isPostModalOpen) return null;

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const togglePhoto = (url) => {
    if (selectedPhotos.includes(url)) {
      if (selectedPhotos.length > 1) {
        setSelectedPhotos(selectedPhotos.filter((u) => u !== url));
      } else {
        showToast('Please keep at least one property photo', 'warning');
      }
    } else {
      setSelectedPhotos([...selectedPhotos, url]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !address.trim() || !ownerName.trim() || !ownerPhone.trim()) {
      showToast('Please fill out all required fields (*)', 'warning');
      return;
    }

    const price = purpose === 'sale' 
      ? Number(priceInLakhs) * 100000 
      : Number(rentMonthly);

    const newProperty = {
      title: title.trim(),
      purpose,
      bhk: Number(bhk),
      propertyType: `${bhk} BHK Flat`,
      price,
      priceInLakhs: purpose === 'sale' ? Number(priceInLakhs) : undefined,
      rentFrequency: purpose === 'rent' ? 'month' : undefined,
      bedrooms: Number(bhk),
      bathrooms: Number(bathrooms),
      balconies: Number(balconies),
      areaSqFt: Number(areaSqFt) || 1200,
      floor,
      facing,
      address: address.trim(),
      pocket: pocket.split(' ')[0] + ' ' + (pocket.split(' ')[1] || ''),
      locality: 'Indraprastha Yojana',
      city: 'Ghaziabad',
      state: 'Uttar Pradesh',
      pinCode: '201005',
      gdaApproved: true,
      description: description.trim() || `${bhk} BHK flat in ${pocket}, Indraprastha Yojana, Ghaziabad with excellent ventilation, modular kitchen, lift, and parking.`,
      images: selectedPhotos.length > 0 ? selectedPhotos : [SAMPLE_PHOTO_PRESETS[0].url],
      amenities: selectedAmenities,
      agent: {
        name: ownerName.trim(),
        agency: 'Mahakal Property Verified Owner/Agent',
        phone: ownerPhone.trim(),
        whatsapp: ownerPhone.trim().replace(/[^0-9]/g, ''),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        rating: 5.0
      }
    };

    addProperty(newProperty);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              List Flat with Mahakal Property (फ्लैट लिस्ट करें)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Indraprastha Yojana, Ghaziabad • Get genuine buyer & tenant inquiries directly
            </p>
          </div>
          <button
            onClick={() => setIsPostModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          
          {/* Purpose: Sell or Rent */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Listing Purpose *
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setPurpose('sale')}
                className={`p-3 rounded-2xl border font-black text-xs flex items-center justify-center gap-2 transition-all ${
                  purpose === 'sale'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Home className="w-4 h-4 text-amber-600" />
                For Sale (बेचना है)
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`p-3 rounded-2xl border font-black text-xs flex items-center justify-center gap-2 transition-all ${
                  purpose === 'rent'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <KeyRound className="w-4 h-4 text-blue-600" />
                For Rent (किराये पर देना है)
              </button>
            </div>
          </div>

          {/* Configuration & Pocket */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Configuration *</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-extrabold text-slate-800"
              >
                <option value="2">2 BHK Flat</option>
                <option value="3">3 BHK Flat</option>
                <option value="4">4 BHK Luxury Flat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sector / Pocket *</label>
              <select
                value={pocket}
                onChange={(e) => setPocket(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800"
              >
                <option value="Pocket A">Pocket A (Prime & Luxury)</option>
                <option value="Pocket B">Pocket B (Near Central Park)</option>
                <option value="Pocket C">Pocket C (Near DME Highway)</option>
                <option value="Pocket D">Pocket D (Ready & Budget)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {purpose === 'sale' ? 'Demand Price (₹ Lakhs) *' : 'Monthly Rent (₹) *'}
              </label>
              <input
                type="number"
                required
                placeholder={purpose === 'sale' ? 'e.g. 42 (Lakhs)' : 'e.g. 15000'}
                value={purpose === 'sale' ? priceInLakhs : rentMonthly}
                onChange={(e) => purpose === 'sale' ? setPriceInLakhs(e.target.value) : setRentMonthly(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 focus:outline-amber-500"
              />
            </div>
          </div>

          {/* Title & Address */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Flat Headline Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. 3 BHK Corner Flat Park Facing with Lift & Stilt Parking"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address in Indraprastha Yojana *</label>
              <input
                type="text"
                required
                placeholder="e.g. Pocket B, Flat No. 204, Near Gate No. 1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Specs: Bathrooms, Balconies, Area, Floor, Facing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
              <select
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              >
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Baths</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Balconies</label>
              <select
                value={balconies}
                onChange={(e) => setBalconies(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              >
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Balcony</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Super Area (Sq.Ft.)</label>
              <input
                type="number"
                placeholder="e.g. 1350"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Floor Level</label>
              <input
                type="text"
                placeholder="e.g. 1st of 4 Floors"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description (विवरण)</label>
            <textarea
              rows={2}
              placeholder="Highlight nearby landmarks, park facing view, modular kitchen, wood work, water supply..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800"
            />
          </div>

          {/* Amenities Checklist */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Amenities (सुविधाएं)</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200">
              {ALL_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-950" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Property Photos</label>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {SAMPLE_PHOTO_PRESETS.map((preset, idx) => {
                const isPicked = selectedPhotos.includes(preset.url);
                return (
                  <div
                    key={idx}
                    onClick={() => togglePhoto(preset.url)}
                    className={`relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      isPicked ? 'border-amber-500 ring-2 ring-amber-500/20' : 'opacity-60 border-transparent hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                    {isPicked && (
                      <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Owner / Contact Details */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Owner / Seller Contact Details (मालिक का संपर्क)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Owner / Seller Name *"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
              />
              <input
                type="tel"
                required
                placeholder="Mobile / WhatsApp Number *"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Publish Listing with Mahakal Property</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
