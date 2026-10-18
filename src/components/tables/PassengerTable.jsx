import React, { useState, useMemo } from 'react';
import { useDataset } from '../../context/DatasetContext';
import { exportPassengersToCSV } from '../../utils/csvExport';
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function PassengerTable() {
  const {
    activePassengers,
    activeMeta,
    stats,
    setSelectedPassengerForModal,
    showToast
  } = useDataset();

  // Search, filter, sort and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [sexFilter, setSexFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [survivalFilter, setSurvivalFilter] = useState('all');
  const [ageGroupFilter, setAgeGroupFilter] = useState('all');

  const [sortField, setSortField] = useState('PassengerId');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const hasLabels = stats.hasLabels;

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSexFilter('all');
    setClassFilter('all');
    setSurvivalFilter('all');
    setAgeGroupFilter('all');
    setCurrentPageNum(1);
    showToast('Filters cleared', 'info');
  };

  // Filter passengers
  const filteredPassengers = useMemo(() => {
    return activePassengers.filter(p => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = p.Name.toLowerCase().includes(query);
        const matchesId = String(p.PassengerId).includes(query);
        const matchesTicket = p.Ticket && p.Ticket.toLowerCase().includes(query);
        if (!matchesName && !matchesId && !matchesTicket) return false;
      }

      // Sex
      if (sexFilter !== 'all' && p.Sex !== sexFilter) return false;

      // Class
      if (classFilter !== 'all' && p.Pclass !== Number(classFilter)) return false;

      // Survival (if labelled)
      if (hasLabels && survivalFilter !== 'all') {
        if (survivalFilter === 'survived' && p.Survived !== 1) return false;
        if (survivalFilter === 'died' && p.Survived !== 0) return false;
      }

      // Age group
      if (ageGroupFilter !== 'all') {
        if (p.Age === null || p.Age === undefined) {
          if (ageGroupFilter !== 'unknown') return false;
        } else {
          const age = Number(p.Age);
          if (ageGroupFilter === 'child' && age >= 12) return false;
          if (ageGroupFilter === 'teen' && (age < 12 || age >= 20)) return false;
          if (ageGroupFilter === 'adult' && (age < 20 || age >= 60)) return false;
          if (ageGroupFilter === 'senior' && age < 60) return false;
        }
      }

      return true;
    });
  }, [activePassengers, searchTerm, sexFilter, classFilter, survivalFilter, ageGroupFilter, hasLabels]);

  // Sort passengers
  const sortedPassengers = useMemo(() => {
    const list = [...filteredPassengers];
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle nulls gracefully
      if (valA === null || valA === undefined) valA = -999999;
      if (valB === null || valB === undefined) valB = -999999;

      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? valA.localeCompare(String(valB))
          : String(valB).localeCompare(valA);
      }

      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
    return list;
  }, [filteredPassengers, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedPassengers.length / pageSize));
  const pageStart = (currentPageNum - 1) * pageSize;
  const paginatedPassengers = sortedPassengers.slice(pageStart, pageStart + pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExportCSV = () => {
    const count = exportPassengersToCSV(sortedPassengers, `${activeMeta.id}_export.csv`);
    showToast(`Exported ${count} passenger records to CSV`, 'success');
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-teal-600 font-bold" />
    ) : (
      <ArrowDown className="w-3 h-3 text-teal-600 font-bold" />
    );
  };

  const portBadge = (port) => {
    switch (port) {
      case 'C':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Cherbourg</span>;
      case 'Q':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Queenstown</span>;
      case 'S':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">Southampton</span>;
      default:
        return <span className="text-slate-400 text-xs">N/A</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Controls Bar */}
      <div className="p-4 border-b border-slate-200 space-y-3 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, ticket, or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition shadow-2xs"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition"
              title="Reset all search and filter conditions"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition"
              title="Export current view to CSV"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Sex */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Gender
            </label>
            <select
              value={sexFilter}
              onChange={(e) => { setSexFilter(e.target.value); setCurrentPageNum(1); }}
              className="w-full text-xs py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-hidden focus:border-teal-500 shadow-2xs"
            >
              <option value="all">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Passenger Class
            </label>
            <select
              value={classFilter}
              onChange={(e) => { setClassFilter(e.target.value); setCurrentPageNum(1); }}
              className="w-full text-xs py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-hidden focus:border-teal-500 shadow-2xs"
            >
              <option value="all">All Classes</option>
              <option value="1">1st Class (Upper)</option>
              <option value="2">2nd Class (Middle)</option>
              <option value="3">3rd Class (Steerage)</option>
            </select>
          </div>

          {/* Survival (if labelled) */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Historical Status
            </label>
            <select
              value={survivalFilter}
              disabled={!hasLabels}
              onChange={(e) => { setSurvivalFilter(e.target.value); setCurrentPageNum(1); }}
              className="w-full text-xs py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-slate-700 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-hidden focus:border-teal-500 shadow-2xs"
            >
              {hasLabels ? (
                <>
                  <option value="all">All Outcomes</option>
                  <option value="survived">Survived</option>
                  <option value="died">Casualties (Died)</option>
                </>
              ) : (
                <option value="all">Labels Unavailable</option>
              )}
            </select>
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Age Demographic
            </label>
            <select
              value={ageGroupFilter}
              onChange={(e) => { setAgeGroupFilter(e.target.value); setCurrentPageNum(1); }}
              className="w-full text-xs py-1.5 px-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:outline-hidden focus:border-teal-500 shadow-2xs"
            >
              <option value="all">All Age Groups</option>
              <option value="child">Child (&lt; 12 yrs)</option>
              <option value="teen">Teenager (12 - 19 yrs)</option>
              <option value="adult">Adult (20 - 59 yrs)</option>
              <option value="senior">Senior (60+ yrs)</option>
              <option value="unknown">Unrecorded Age</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dataset Warning Notice for Test Partition */}
      {!hasLabels && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Competition Test Partition Notice:</strong> Actual survival ground-truth is unreleased. Simulated probabilities shown below represent heuristic baseline estimates for demonstration.
          </span>
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th
                onClick={() => handleSort('PassengerId')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>ID</span>
                  {getSortIcon('PassengerId')}
                </div>
              </th>

              <th
                onClick={() => handleSort('Name')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Passenger Name</span>
                  {getSortIcon('Name')}
                </div>
              </th>

              <th className="py-3 px-3.5">Sex</th>

              <th
                onClick={() => handleSort('Age')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Age</span>
                  {getSortIcon('Age')}
                </div>
              </th>

              <th
                onClick={() => handleSort('Pclass')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Class</span>
                  {getSortIcon('Pclass')}
                </div>
              </th>

              <th
                onClick={() => handleSort('Fare')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>Fare</span>
                  {getSortIcon('Fare')}
                </div>
              </th>

              <th className="py-3 px-3.5">Family Size</th>
              <th className="py-3 px-3.5">Embarked</th>

              <th
                onClick={() => handleSort('Survived')}
                className="py-3 px-3.5 cursor-pointer hover:bg-slate-200/60 transition group select-none"
              >
                <div className="flex items-center gap-1.5">
                  <span>{hasLabels ? 'Status' : 'Sim. Prediction'}</span>
                  {hasLabels && getSortIcon('Survived')}
                </div>
              </th>

              <th className="py-3 px-3.5 text-right">Dossier</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedPassengers.length > 0 ? (
              paginatedPassengers.map((p) => {
                const isSurvived = p.Survived === 1;
                const famSize = (p.SibSp || 0) + (p.Parch || 0) + 1;

                return (
                  <tr
                    key={p.PassengerId}
                    onClick={() => setSelectedPassengerForModal(p)}
                    className="hover:bg-teal-50/40 transition cursor-pointer group"
                  >
                    <td className="py-2.5 px-3.5 font-mono text-slate-500 font-semibold">
                      #{p.PassengerId}
                    </td>

                    <td className="py-2.5 px-3.5 font-medium text-slate-900 max-w-[200px] truncate">
                      {p.Name}
                    </td>

                    <td className="py-2.5 px-3.5 capitalize text-slate-600">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        p.Sex === 'female'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {p.Sex}
                      </span>
                    </td>

                    <td className="py-2.5 px-3.5">
                      {p.Age !== null ? (
                        <span>{p.Age} <span className="text-[10px] text-slate-400">yr</span></span>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Unrecorded</span>
                      )}
                    </td>

                    <td className="py-2.5 px-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.Pclass === 1
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : p.Pclass === 2
                          ? 'bg-slate-100 text-slate-800 border border-slate-300'
                          : 'bg-orange-50 text-orange-800 border border-orange-200'
                      }`}>
                        Class {p.Pclass}
                      </span>
                    </td>

                    <td className="py-2.5 px-3.5 font-mono">
                      {p.Fare !== null ? `$${Number(p.Fare).toFixed(2)}` : <span className="text-slate-400 italic">N/A</span>}
                    </td>

                    <td className="py-2.5 px-3.5">
                      <span className="text-xs font-semibold text-slate-700">{famSize}</span>{' '}
                      <span className="text-[10px] text-slate-400">
                        ({p.SibSp} sib, {p.Parch} par)
                      </span>
                    </td>

                    <td className="py-2.5 px-3.5">
                      {portBadge(p.Embarked)}
                    </td>

                    <td className="py-2.5 px-3.5">
                      {hasLabels ? (
                        isSurvived ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            Survived
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Casualty
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Sim: {p.simulatedProbability ? `${Math.round(p.simulatedProbability * 100)}%` : 'N/A'}
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPassengerForModal(p);
                        }}
                        className="p-1 rounded-md text-slate-400 group-hover:text-teal-600 hover:bg-slate-200 transition"
                        title="View Full Dossier"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <Filter className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="font-semibold text-slate-700 text-sm">No matching passengers found</p>
                    <p className="text-xs text-slate-400">
                      Adjust your search query or reset the applied filters to view passengers.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Count Footer */}
      <div className="p-3.5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-slate-800">{sortedPassengers.length === 0 ? 0 : pageStart + 1}</strong> to{' '}
            <strong className="text-slate-800">{Math.min(pageStart + pageSize, sortedPassengers.length)}</strong> of{' '}
            <strong className="text-slate-800">{sortedPassengers.length}</strong> passengers
            {sortedPassengers.length !== activePassengers.length && (
              <span className="text-slate-400 ml-1">
                (filtered from {activePassengers.length})
              </span>
            )}
          </span>

          {/* Page size dropdown */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-slate-400 text-[11px]">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPageNum(1);
              }}
              className="py-1 px-1.5 text-xs bg-slate-50 border border-slate-300 rounded text-slate-700 focus:outline-hidden"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPageNum(1)}
            disabled={currentPageNum === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
            title="First Page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPageNum(p => Math.max(1, p - 1))}
            disabled={currentPageNum === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 font-medium text-slate-700">
            Page {currentPageNum} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPageNum(p => Math.min(totalPages, p + 1))}
            disabled={currentPageNum === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPageNum(totalPages)}
            disabled={currentPageNum === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition"
            title="Last Page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
