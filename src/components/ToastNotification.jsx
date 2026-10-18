import React from 'react';
import { useProperties } from '../context/PropertyContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastNotification() {
  const { toasts, removeToast } = useProperties();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-500/30';
        let bgClass = 'bg-slate-900/95 text-white';

        if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
          borderClass = 'border-blue-500/30';
        } else if (toast.type === 'warning' || toast.type === 'error') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderClass = 'border-amber-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-md border ${borderClass} ${bgClass} transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-4`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
