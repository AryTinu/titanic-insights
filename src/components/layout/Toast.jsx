import React, { useEffect } from 'react';
import { useDataset } from '../../context/DatasetContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, closeToast } = useDataset();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, closeToast]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-slide-up max-w-md">
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />}
      {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
      {!isSuccess && !isWarning && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
      <span className="text-sm font-medium text-slate-100">{toast.message}</span>
      <button
        onClick={closeToast}
        className="ml-auto p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
