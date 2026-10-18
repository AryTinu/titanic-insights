import React, { useState, useRef, useEffect } from 'react';
import { useDataset } from '../../context/DatasetContext';
import {
  Menu,
  ChevronDown,
  Search,
  Database,
  Check,
  ShieldAlert,
  User,
  SlidersHorizontal,
  X
} from 'lucide-react';

const PAGE_TITLES = {
  overview: { title: 'Overview Dashboard', breadcrumb: 'Analytics / Overview' },
  explorer: { title: 'Dataset Explorer', breadcrumb: 'Data / Passenger Records' },
  analysis: { title: 'Survival Analysis', breadcrumb: 'Exploratory / Demographics & Survival' },
  models: { title: 'Model Performance', breadcrumb: 'ML Evaluation / Baseline Classifiers' },
  prediction: { title: 'Passenger Prediction', breadcrumb: 'Inference / Heuristic Simulator' },
  about: { title: 'About Project', breadcrumb: 'Documentation / Architecture & Goals' }
};

export default function TopNav({ setMobileOpen }) {
  const {
    currentPage,
    setCurrentPage,
    activeDatasetId,
    setDataset,
    datasetOptions,
    activeMeta,
    stats,
    activePassengers,
    setSelectedPassengerForModal
  } = useDataset();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pageInfo = PAGE_TITLES[currentPage] || { title: 'Titanic Insights', breadcrumb: 'Dashboard' };

  // Quick passenger search results (up to 5 items)
  const searchResults = searchQuery.trim().length > 1
    ? activePassengers
        .filter(p =>
          p.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(p.PassengerId).includes(searchQuery.trim())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left: Mobile Menu + Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
              {pageInfo.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              {stats.total} Records
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
            {pageInfo.breadcrumb}
          </p>
        </div>
      </div>

      {/* Middle / Right: Controls & Selectors */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Passenger Search Field with popover preview */}
        <div className="relative hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick search passenger / ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-56 lg:w-64 pl-9 pr-7 py-1.5 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick search popup results */}
          {searchFocused && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Matching Passengers ({searchResults.length})
              </div>
              {searchResults.map((p) => (
                <button
                  key={p.PassengerId}
                  onClick={() => {
                    setSelectedPassengerForModal(p);
                    setSearchFocused(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between group transition"
                >
                  <div className="truncate pr-2">
                    <span className="font-semibold text-slate-800">#{p.PassengerId}</span>{' '}
                    <span className="text-slate-700">{p.Name}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                    p.Survived === 1
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : p.Survived === 0
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {p.Survived === 1 ? 'Survived' : p.Survived === 0 ? 'Died' : 'Test Record'}
                  </span>
                </button>
              ))}
              <div className="px-3 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                Click a passenger to open full manifest dossier
              </div>
            </div>
          )}
        </div>

        {/* Dataset Selector Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition"
            title="Switch Active Dataset"
          >
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-slate-400 block leading-3">Dataset</span>
              <span className="font-semibold text-slate-800 text-xs block leading-tight truncate max-w-[130px]">
                {activeMeta.name}
              </span>
            </div>
            <span className="sm:hidden font-medium text-slate-800 text-xs">Dataset</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
              <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Select Active Dataset
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                  {datasetOptions.length} Presets
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto py-1">
                {datasetOptions.map((opt) => {
                  const isSelected = opt.id === activeDatasetId;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setDataset(opt.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-start gap-2.5 transition ${
                        isSelected ? 'bg-teal-50/70 border-l-2 border-teal-600' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isSelected ? (
                          <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-semibold truncate ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                            {opt.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0 font-medium">
                            {opt.count} rows
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {opt.description}
                        </p>
                        <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {opt.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/80 rounded-b-xl text-[10px] text-slate-500 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Test dataset will display simulated model inference without ground truth.</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo Environment Badge */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="hidden sm:inline">Demo Environment</span>
          <span className="sm:hidden">Demo</span>
        </span>

        {/* User Avatar with Initials */}
        <div
          className="w-8 h-8 rounded-full bg-slate-900 text-teal-400 font-semibold text-xs flex items-center justify-center shadow-xs border border-slate-700 select-none"
          title="Data Science Student (College Mini Project)"
        >
          DS
        </div>
      </div>
    </header>
  );
}
