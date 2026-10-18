import React from 'react';
import { useDataset } from '../context/DatasetContext';
import PassengerTable from '../components/tables/PassengerTable';
import { Database, FileSpreadsheet, ShieldAlert, Sparkles, Filter } from 'lucide-react';

export default function DatasetExplorer() {
  const { activeMeta, stats } = useDataset();

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Database className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tabular Manifest Explorer
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">
              {stats.total} Total Records
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Passenger Manifest & Feature Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Inspect individual passenger records, search by surname or ticket number, apply multi-attribute filters, and export customized tabular slices to CSV.
          </p>
        </div>

        {/* Info Pill */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-right shrink-0">
          <span className="text-xs font-semibold text-slate-800">
            {activeMeta.name}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            stats.hasLabels
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {stats.hasLabels ? 'Ground-Truth Available' : 'Simulated Test Records'}
          </span>
        </div>
      </div>

      {/* Main Table Component */}
      <PassengerTable />
    </div>
  );
}
