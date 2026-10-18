import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  X, 
  Phone, 
  MessageSquare, 
  User, 
  Calendar, 
  Clock, 
  Trash2, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  Download,
  Users
} from 'lucide-react';

export default function OwnerLeadsDrawer() {
  const { 
    isOwnerLeadsDrawerOpen, 
    setIsOwnerLeadsDrawerOpen, 
    leads, 
    clearAllLeads,
    removeLead,
    officeDetails 
  } = useProperties();

  const [copied, setCopied] = useState(false);

  if (!isOwnerLeadsDrawerOpen) return null;

  const handleCopyAll = () => {
    if (leads.length === 0) return;
    const text = leads
      .map((l, idx) => `${idx + 1}. ${l.name || 'Visitor'} - ${l.phone} (${l.type || 'Lead'}) - ${l.details || ''} - ${new Date(l.timestamp).toLocaleString('en-IN')}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span>मालिक लीड्स मैनेजर (Owner Leads)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                  {leads.length}
                </span>
              </h2>
              <p className="text-[11px] text-amber-300 font-semibold">
                Owner Phone: {officeDetails.phoneDisplay}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOwnerLeadsDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600">
            कुल ग्राहक संपर्क: <strong className="text-slate-900">{leads.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <>
                <button
                  onClick={handleCopyAll}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg border border-slate-300 flex items-center gap-1 shadow-2xs"
                  title="Copy All Leads to Clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy All'}</span>
                </button>

                <button
                  onClick={clearAllLeads}
                  className="px-2.5 py-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold rounded-lg transition-colors flex items-center gap-1"
                  title="Clear List"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {leads.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Users className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-600 mb-1">अभी कोई नई लीड नहीं है</p>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                जब भी कोई ग्राहक साइट पर मोबाइल नंबर रजिस्टर करेगा या अपॉइंटमेंट बुक करेगा, उसका नंबर और विवरण यहाँ और आपके फ़ोन ({officeDetails.phoneDisplay}) पर दिखाई देगा।
              </p>
            </div>
          ) : (
            leads.map((lead) => (
              <div 
                key={lead.id}
                className="p-3.5 bg-slate-50 hover:bg-amber-50/40 rounded-2xl border border-slate-200 transition-all shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1 ${
                      lead.type === 'Appointment'
                        ? 'bg-purple-100 text-purple-800'
                        : lead.type === 'Registration'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {lead.type || 'New Lead'}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>{lead.name || 'Website Visitor'}</span>
                    </h3>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap">
                    {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(lead.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-semibold mb-3 space-y-0.5">
                  <p className="flex items-center gap-1 text-slate-900 font-bold">
                    📱 <span className="font-mono text-sm">{lead.phone}</span>
                  </p>
                  {lead.details && (
                    <p className="text-slate-600 text-[11px] leading-tight">
                      📌 {lead.details}
                    </p>
                  )}
                  {lead.bhk && (
                    <p className="text-amber-800 text-[11px]">
                      🏠 पसंद: {lead.bhk}
                    </p>
                  )}
                  {lead.date && (
                    <p className="text-purple-800 text-[11px]">
                      📅 विजिट: {lead.date} ({lead.timeSlot || 'Anytime'})
                    </p>
                  )}
                </div>

                {/* Instant Call & WhatsApp Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-950" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Namaste, I am reaching out from Mahakal Property Office, Indraprastha Yojana Ghaziabad regarding your property requirement.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    onClick={() => removeLead(lead.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                    title="Remove Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-900 text-white text-[11px] border-t border-slate-800 space-y-1">
          <p className="text-amber-400 font-bold">
            ⚡ Direct Owner Notifications Active:
          </p>
          <p className="text-slate-300">
            जब भी कोई फॉर्म भरा जाता है, मालिक के मोबाइल <strong>{officeDetails.phoneDisplay}</strong> पर तुरंत मैसेज ट्रिगर होता है।
          </p>
        </div>

      </div>
    </div>
  );
}
