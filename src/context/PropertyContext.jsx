import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_PROPERTIES, OFFICE_DETAILS } from '../data/properties';

const PropertyContext = createContext(null);

const STORAGE_KEYS = {
  PROPERTIES: 'mahakal_properties_v4',
  FAVORITES: 'mahakal_favorites_v4',
  VISITS: 'mahakal_site_visits_v4',
  LEADS: 'mahakal_leads_v4',
  REGISTERED: 'mahakal_registered_v4'
};

const DEFAULT_FILTERS = {
  purpose: 'all', // 'all', 'sale', 'rent'
  bhk: 'all', // 'all', '2', '3', '4'
  pocket: 'All Pockets',
  query: '',
  priceMin: '',
  priceMax: '',
  amenities: [],
  sortBy: 'featured'
};

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROPERTIES;
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modals & Drawers
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [siteVisitProperty, setSiteVisitProperty] = useState(null);
  
  // Registration Modal for visitor mobile entry
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  // Owner Leads Drawer
  const [isOwnerLeadsDrawerOpen, setIsOwnerLeadsDrawerOpen] = useState(false);

  const [siteVisits, setSiteVisits] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VISITS);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);

  // Auto-prompt registration modal on initial visit if visitor hasn't registered yet
  useEffect(() => {
    try {
      const hasRegistered = localStorage.getItem(STORAGE_KEYS.REGISTERED);
      if (!hasRegistered) {
        const timer = setTimeout(() => {
          setIsRegistrationModalOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.error(e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(siteVisits));
    } catch (e) {
      console.error(e);
    }
  }, [siteVisits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Dispatch Notification to Owner's Phone: 9818720735
  const dispatchNotificationToOwner = ({
    type,
    name,
    phone,
    bhk,
    details,
    date,
    timeSlot,
    needPickup,
    pickupLocation
  }) => {
    let messageText = '';
    const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const nowDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    if (type === 'Registration') {
      messageText = 
        `🔔 *नया ग्राहक रजिस्टर हुआ! (Mahakal Property)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *ग्राहक का नाम:* ${name || 'वेबसाइट आगंतुक'}\n` +
        `📱 *मोबाइल नंबर:* ${phone}\n` +
        `🏠 *पसंद/बजट:* ${bhk || 'All BHK'}\n` +
        `📍 *स्थान:* Indraprastha Yojana, Ghaziabad (Pin 201102)\n` +
        `⏰ *समय:* ${nowTime}, ${nowDate}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 *कृपया इस ग्राहक से तुरंत संपर्क करें!*`;
    } else if (type === 'Appointment') {
      messageText = 
        `📅 *नई साइट विजिट बुक हुई! (Mahakal Property)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *ग्राहक:* ${name}\n` +
        `📱 *मोबाइल नंबर:* ${phone}\n` +
        `🏠 *प्रॉपर्टी:* ${details || '100% Fully Furnished Flat'}\n` +
        `🏠 *BHK:* ${bhk || 'Selected'}\n` +
        `📅 *विजिट की तारीख:* ${date}\n` +
        `⏰ *समय:* ${timeSlot}\n` +
        `🚗 *फ्री कैब पिकअप:* ${needPickup ? `हाँ (${pickupLocation || 'Dilshad Garden Metro'})` : 'नहीं (सीधे ऑफिस आएंगे)'}\n` +
        `📍 *स्थान:* Indraprastha Yojana, Ghaziabad (Pin 201102)\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 *कृपया तुरंत ग्राहक को कॉल करके अपॉइंटमेंट कन्फर्म करें!*`;
    } else {
      messageText = 
        `📞 *कॉल बैक अनुरोध! (Mahakal Property)*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📱 *मोबाइल नंबर:* ${phone}\n` +
        `📍 *स्थान:* Indraprastha Yojana, Ghaziabad (Pin 201102)\n` +
        `⏰ *समय:* ${nowTime}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👉 *कृपया 15 मिनट के अंदर ग्राहक को कॉल करें!*`;
    }

    const ownerWhatsApp = OFFICE_DETAILS.whatsapp; // 919818720735
    const waUrl = `https://wa.me/${ownerWhatsApp}?text=${encodeURIComponent(messageText)}`;

    // Store lead record
    const newLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      name: name || 'Website Visitor',
      phone,
      bhk,
      details,
      date,
      timeSlot,
      needPickup,
      pickupLocation,
      timestamp: new Date().toISOString()
    };

    setLeads((prev) => [newLead, ...prev]);

    // Trigger WhatsApp notification window
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.log('Direct window open blocked', e);
    }

    return waUrl;
  };

  // Register Visitor Lead
  const registerVisitorLead = (visitorData) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED, 'true');
      if (visitorData.name) localStorage.setItem('mahakal_user_name', visitorData.name);
      if (visitorData.phone) localStorage.setItem('mahakal_user_phone', visitorData.phone);
      if (visitorData.bhkPreference) localStorage.setItem('mahakal_user_bhk', visitorData.bhkPreference);
    } catch (e) {
      console.error(e);
    }

    const waUrl = dispatchNotificationToOwner({
      type: 'Registration',
      name: visitorData.name,
      phone: visitorData.phone,
      bhk: visitorData.bhkPreference
    });

    setIsRegistrationModalOpen(false);

    showToast(
      `धन्यवाद ${visitorData.name}! आपका रजिस्ट्रेशन हो गया है और महाकाल प्रॉपर्टी (${OFFICE_DETAILS.phoneDisplay}) पर अलर्ट भेज दिया गया है।`,
      'success'
    );

    return waUrl;
  };

  // Book Site Visit Appointment
  const bookSiteVisit = (visitData) => {
    const newVisit = {
      id: `visit-${Date.now()}`,
      ...visitData,
      createdAt: new Date().toISOString()
    };
    setSiteVisits((prev) => [newVisit, ...prev]);

    try {
      if (visitData.clientName) localStorage.setItem('mahakal_user_name', visitData.clientName);
      if (visitData.clientPhone) localStorage.setItem('mahakal_user_phone', visitData.clientPhone);
    } catch (e) {
      console.error(e);
    }

    // Dispatch WhatsApp Notification to Owner 9818720735
    const waUrl = dispatchNotificationToOwner({
      type: 'Appointment',
      name: visitData.clientName,
      phone: visitData.clientPhone,
      details: visitData.propertyTitle,
      bhk: visitData.bhk,
      date: visitData.date,
      timeSlot: visitData.timeSlot,
      needPickup: visitData.needPickup,
      pickupLocation: visitData.pickupLocation
    });

    showToast(
      `अपॉइंटमेंट बुक हो गई! साइट विजिट का मैसेज महाकाल प्रॉपर्टी मालिक (${OFFICE_DETAILS.phoneDisplay}) पर WhatsApp भेज दिया गया है।`,
      'success'
    );
    setIsSiteVisitModalOpen(false);

    return waUrl;
  };

  // Quick Callback Request
  const requestCallback = (phone) => {
    dispatchNotificationToOwner({
      type: 'Callback',
      phone
    });

    showToast(
      `कॉल बैक अनुरोध प्राप्त हुआ! महाकाल प्रॉपर्टी टीम (${OFFICE_DETAILS.phoneDisplay}) 15 मिनट में आपसे संपर्क करेगी।`,
      'success'
    );
  };

  const removeLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
    showToast('Lead removed from list', 'info');
  };

  const clearAllLeads = () => {
    setLeads([]);
    showToast('All leads cleared', 'info');
  };

  const toggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(propertyId);
      const updated = isFav ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      showToast(
        isFav ? 'Removed from saved flats' : 'Saved to your favorites list!',
        isFav ? 'info' : 'success'
      );
      return updated;
    });
  };

  const addProperty = (newProp) => {
    const formattedProp = {
      ...newProp,
      id: `prop-${Date.now()}`,
      slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      dateListed: new Date().toISOString().split('T')[0],
      featured: false,
      status: 'Available',
      pinCode: '201102',
      bookingAmount: '₹5,100 Only',
      delhiDistance: 'Only 3 KM',
      metroDistance: '10 Mins (Dilshad Garden Metro)'
    };
    setProperties((prev) => [formattedProp, ...prev]);
    showToast(`Property "${formattedProp.title}" listed successfully on Mahakal Property!`, 'success');
    setIsPostModalOpen(false);
  };

  const formatPrice = (amount, purpose = 'sale', rentFrequency = 'month') => {
    if (!amount) return '₹0';
    if (purpose === 'rent') {
      return `₹${Number(amount).toLocaleString('en-IN')}/${rentFrequency === 'year' ? 'yr' : 'mo'}`;
    }
    if (amount >= 10000000) {
      const cr = (amount / 10000000).toFixed(2);
      return `₹${cr} Cr`;
    } else if (amount >= 100000) {
      const lakhs = (amount / 100000);
      return Number.isInteger(lakhs) ? `₹${lakhs} Lakhs` : `₹${lakhs.toFixed(1)} Lakhs`;
    }
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  const getWhatsAppLink = (propertyTitle = '', pocket = '') => {
    const phone = OFFICE_DETAILS.whatsapp; // 919818720735
    let text = `Namaste Mahakal Property, I am interested in buying/renting fully furnished flat in Indraprastha Yojana (Pin 201102). Please share details regarding 90% loan and ₹5,100 booking.`;
    if (propertyTitle) {
      text = `Namaste Mahakal Property, I am interested in "${propertyTitle}" (${pocket}, Pin 201102). Please share full details regarding 90% loan, ₹5,100 booking amount, and arrange a free site visit.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  const getCallLink = () => `tel:${OFFICE_DETAILS.phoneDisplay}`;
  const getMapsLink = () => OFFICE_DETAILS.mapsUrl;

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
    setIsDetailsModalOpen(true);
  };

  const openSiteVisit = (property = null) => {
    setSiteVisitProperty(property);
    setIsSiteVisitModalOpen(true);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
        return false;
      }
      if (filters.bhk !== 'all') {
        if (Number(prop.bhk) !== Number(filters.bhk)) {
          return false;
        }
      }
      if (filters.pocket !== 'All Pockets') {
        const pocketClean = filters.pocket.split(' ')[0] + ' ' + filters.pocket.split(' ')[1];
        if (!prop.pocket?.toLowerCase().includes(pocketClean.toLowerCase())) {
          return false;
        }
      }
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesPocket = prop.pocket ? prop.pocket.toLowerCase().includes(q) : false;
        const matchesAddress = prop.address.toLowerCase().includes(q);
        const matchesType = prop.propertyType.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesPocket && !matchesAddress && !matchesType && !matchesDesc) {
          return false;
        }
      }
      if (filters.priceMin !== '' && !isNaN(Number(filters.priceMin))) {
        if (prop.price < Number(filters.priceMin)) return false;
      }
      if (filters.priceMax !== '' && !isNaN(Number(filters.priceMax))) {
        if (prop.price > Number(filters.priceMax)) return false;
      }
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((amenity) =>
          prop.amenities?.includes(amenity)
        );
        if (!hasAll) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'bhk-high') return b.bhk - a.bhk;
      if (filters.sortBy === 'area-high') return b.areaSqFt - a.areaSqFt;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.dateListed || 0) - new Date(a.dateListed || 0);
    });
  }, [properties, filters]);

  const value = {
    properties,
    favorites,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    viewMode,
    setViewMode,
    filteredProperties,
    selectedProperty,
    setSelectedProperty,
    openPropertyDetails,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    isPostModalOpen,
    setIsPostModalOpen,
    isCalculatorModalOpen,
    setIsCalculatorModalOpen,
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    isSiteVisitModalOpen,
    setIsSiteVisitModalOpen,
    siteVisitProperty,
    openSiteVisit,
    bookSiteVisit,
    toggleFavorite,
    addProperty,
    formatPrice,
    getWhatsAppLink,
    getCallLink,
    getMapsLink,
    toasts,
    showToast,
    removeToast,
    siteVisits,
    officeDetails: OFFICE_DETAILS,
    // New Lead & Registration Features
    isRegistrationModalOpen,
    setIsRegistrationModalOpen,
    registerVisitorLead,
    isOwnerLeadsDrawerOpen,
    setIsOwnerLeadsDrawerOpen,
    leads,
    removeLead,
    clearAllLeads,
    requestCallback,
    dispatchNotificationToOwner
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
