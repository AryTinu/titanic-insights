import React from 'react';
import { useDataset } from '../../context/DatasetContext';
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  Cpu,
  UserCheck,
  Info,
  Ship,
  Sparkles,
  GraduationCap,
  Layers,
  X
} from 'lucide-react';

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { currentPage, setCurrentPage, activeMeta, stats } = useDataset();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'explorer', label: 'Dataset Explorer', icon: Database },
    { id: 'analysis', label: 'Survival Analysis', icon: TrendingUp },
    { id: 'models', label: 'Model Performance', icon: Cpu },
    { id: 'prediction', label: 'Passenger Prediction', icon: UserCheck },
    { id: 'about', label: 'About Project', icon: Info },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white tracking-tight text-base flex items-center gap-1.5">
                Titanic Insights
              </div>
              <p className="text-[11px] text-slate-400 font-normal">Survival & Passenger ML</p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30 shadow-xs shadow-teal-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'prediction' && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold">
                    Sim
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/70 space-y-3">
          {/* Active Dataset Status indicator */}
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                Active Dataset
              </span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            </div>
            <div className="font-semibold text-slate-200 truncate">{activeMeta.name}</div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between">
              <span>{stats.total.toLocaleString()} passengers</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {activeMeta.hasLabels ? 'Labelled' : 'Unlabelled'}
              </span>
            </div>
          </div>

          {/* Academic & Tech Badges */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                College Mini Project
              </span>
              <span className="text-slate-400">SEM VI</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                ML Analytics & BI
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                React+Vite
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
