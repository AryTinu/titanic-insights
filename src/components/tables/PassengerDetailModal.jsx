import React from 'react';
import { X, User, Heart, AlertOctagon, Anchor, Compass, Ticket, Home, Users } from 'lucide-react';

export default function PassengerDetailModal({ passenger, onClose }) {
  if (!passenger) return null;

  const portNames = {
    'S': 'Southampton (UK)',
    'C': 'Cherbourg (FR)',
    'Q': 'Queenstown (IE)'
  };

  const hasLabels = passenger.Survived !== null && passenger.Survived !== undefined;
  const isSurvived = passenger.Survived === 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              hasLabels
                ? isSurvived
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
            }`}>
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-teal-400 font-bold">
                  Passenger #{passenger.PassengerId}
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Class {passenger.Pclass}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 leading-snug">
                {passenger.Name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Banner */}
        <div className={`px-5 py-3 border-b flex items-center justify-between text-xs ${
          hasLabels
            ? isSurvived
              ? 'bg-teal-50 text-teal-900 border-teal-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
            : 'bg-slate-50 text-slate-800 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 font-semibold">
            {hasLabels ? (
              isSurvived ? (
                <>
                  <Heart className="w-4 h-4 text-teal-600 fill-teal-600" />
                  <span>Historical Outcome: Survived the Disaster</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-4 h-4 text-rose-600 fill-rose-600/20" />
                  <span>Historical Outcome: Casualty (Did Not Survive)</span>
                </>
              )
            ) : (
              <>
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Test Split: Ground Truth Unrecorded</span>
              </>
            )}
          </div>
          {!hasLabels && passenger.simulatedProbability !== undefined && (
            <span className="font-mono text-[11px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
              Simulated: {(passenger.simulatedProbability * 100).toFixed(0)}%
            </span>
          )}
        </div>

        {/* Passenger Dossier Grid */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> Sex & Demographics
              </span>
              <p className="mt-1 font-semibold text-slate-800 capitalize">
                {passenger.Sex} • {passenger.Age !== null ? `${passenger.Age} yrs old` : 'Age Unrecorded'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-slate-500" /> Embarkation Port
              </span>
              <p className="mt-1 font-semibold text-slate-800">
                {portNames[passenger.Embarked] || passenger.Embarked || 'Unknown Port'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-slate-500" /> Ticket & Fare
              </span>
              <p className="mt-1 font-semibold text-slate-800 truncate">
                {passenger.Ticket} • {passenger.Fare !== null ? `$${Number(passenger.Fare).toFixed(2)}` : 'N/A'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-slate-500" /> Cabin Assignment
              </span>
              <p className="mt-1 font-semibold text-slate-800">
                {passenger.Cabin ? passenger.Cabin : 'No Cabin Berth (Steerage/Open)'}
              </p>
            </div>
          </div>

          {/* Family Relations */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
              <Users className="w-3.5 h-3.5 text-slate-500" /> Family Network Aboard
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="font-mono text-base font-bold text-slate-900">{passenger.SibSp}</div>
                <div className="text-[10px] text-slate-500">Siblings / Spouse</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="font-mono text-base font-bold text-slate-900">{passenger.Parch}</div>
                <div className="text-[10px] text-slate-500">Parents / Children</div>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-200">
                <div className="font-mono text-base font-bold text-teal-700">
                  {passenger.SibSp + passenger.Parch + 1}
                </div>
                <div className="text-[10px] text-slate-500">Total Party Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-2xs"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
