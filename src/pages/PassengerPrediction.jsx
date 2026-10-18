import React, { useState } from 'react';
import { calculateSurvivalHeuristic } from '../utils/predictionDemo';
import { useDataset } from '../context/DatasetContext';
import {
  UserCheck,
  Sparkles,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  Info,
  CheckCircle2,
  Heart,
  Skull,
  User,
  Ticket,
  Users,
  Anchor,
  HelpCircle,
  Compass
} from 'lucide-react';

const PRESETS = [
  {
    name: '1st Class Woman (Cabin Deck)',
    data: { sex: 'female', age: 29, pclass: 1, fare: 110, sibSp: 0, parch: 0, embarked: 'C' }
  },
  {
    name: 'Child with Small Family',
    data: { sex: 'male', age: 5, pclass: 2, fare: 26, sibSp: 1, parch: 2, embarked: 'S' }
  },
  {
    name: '3rd Class Young Adult Male',
    data: { sex: 'male', age: 24, pclass: 3, fare: 8.05, sibSp: 0, parch: 0, embarked: 'S' }
  },
  {
    name: 'Large Steerage Family',
    data: { sex: 'female', age: 38, pclass: 3, fare: 31.28, sibSp: 1, parch: 5, embarked: 'Q' }
  }
];

export default function PassengerPrediction() {
  const { showToast } = useDataset();

  // Form State
  const [formData, setFormData] = useState({
    sex: 'female',
    age: 28,
    pclass: 1,
    fare: 75,
    sibSp: 0,
    parch: 0,
    embarked: 'S'
  });

  const [errors, setErrors] = useState({});
  const [predictionResult, setPredictionResult] = useState(() => calculateSurvivalHeuristic(formData));

  const validate = () => {
    const errs = {};
    if (formData.age === '' || isNaN(formData.age) || Number(formData.age) < 0 || Number(formData.age) > 100) {
      errs.age = 'Age must be between 0 and 100';
    }
    if (formData.fare === '' || isNaN(formData.fare) || Number(formData.fare) < 0) {
      errs.fare = 'Fare must be a positive number';
    }
    if (formData.sibSp === '' || Number(formData.sibSp) < 0) {
      errs.sibSp = 'Must be >= 0';
    }
    if (formData.parch === '' || Number(formData.parch) < 0) {
      errs.parch = 'Must be >= 0';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePredict = (e) => {
    if (e) e.preventDefault();
    if (!validate()) {
      showToast('Please correct form validation errors', 'warning');
      return;
    }
    const res = calculateSurvivalHeuristic(formData);
    setPredictionResult(res);
    showToast(`Simulation complete: ${res.percentage}% survival likelihood`, 'success');
  };

  const handleReset = () => {
    const defaultData = {
      sex: 'male',
      age: 30,
      pclass: 3,
      fare: 14.5,
      sibSp: 0,
      parch: 0,
      embarked: 'S'
    };
    setFormData(defaultData);
    setErrors({});
    setPredictionResult(calculateSurvivalHeuristic(defaultData));
    showToast('Simulation form reset to baseline', 'info');
  };

  const applyPreset = (preset) => {
    setFormData(preset.data);
    setErrors({});
    const res = calculateSurvivalHeuristic(preset.data);
    setPredictionResult(res);
    showToast(`Loaded preset: "${preset.name}"`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Deterministic Simulation Sandbox
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Interactive Passenger Survival Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Input custom passenger attributes to estimate simulated survival probability based on historical feature weights.
          </p>
        </div>

        {/* Clear Simulation Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-xs text-xs text-amber-900">
          <div className="flex items-center gap-1.5 font-bold mb-0.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Simulation Notice</span>
          </div>
          Educational simulation only — not a trained predictive model.
        </div>
      </div>

      {/* Quick Presets Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Quick Archetype Presets
          </span>
          <span className="text-[11px] text-slate-400">Click to instantly populate scenario</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-xs transition group"
            >
              <div className="font-semibold text-slate-800 group-hover:text-teal-900 truncate">
                {preset.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Class {preset.data.pclass} • {preset.data.sex} • {preset.data.age} yrs
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form & Prediction Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-teal-600" />
              Passenger Demographics & Ticket Attributes
            </h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">
            {/* Gender & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender / Sex
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, sex: 'female' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                      formData.sex === 'female'
                        ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, sex: 'male' })}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                      formData.sex === 'male'
                        ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Male
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
                {errors.age && <p className="text-[10px] text-rose-600 mt-0.5">{errors.age}</p>}
              </div>
            </div>

            {/* Passenger Class & Ticket Fare */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Passenger Class (Pclass)
                </label>
                <select
                  value={formData.pclass}
                  onChange={(e) => setFormData({ ...formData, pclass: Number(e.target.value) })}
                  className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-teal-500"
                >
                  <option value={1}>1st Class (Upper Deck Luxury)</option>
                  <option value={2}>2nd Class (Middle Promenade)</option>
                  <option value={3}>3rd Class (Lower Steerage)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ticket Fare ($ / £)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.fare}
                    onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
                    className="w-full text-xs py-2 pl-7 pr-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                {errors.fare && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fare}</p>}
              </div>
            </div>

            {/* Family Members (SibSp & Parch) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Siblings / Spouses Aboard (SibSp)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.sibSp}
                  onChange={(e) => setFormData({ ...formData, sibSp: e.target.value })}
                  className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-teal-500"
                />
                {errors.sibSp && <p className="text-[10px] text-rose-600 mt-0.5">{errors.sibSp}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parents / Children Aboard (Parch)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.parch}
                  onChange={(e) => setFormData({ ...formData, parch: e.target.value })}
                  className="w-full text-xs py-2 px-3 bg-white border border-slate-300 rounded-xl text-slate-800 focus:outline-hidden focus:border-teal-500"
                />
                {errors.parch && <p className="text-[10px] text-rose-600 mt-0.5">{errors.parch}</p>}
              </div>
            </div>

            {/* Embarkation Port */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Port of Embarkation
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, embarked: 'S' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                    formData.embarked === 'S'
                      ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Southampton (UK)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, embarked: 'C' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                    formData.embarked === 'C'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Cherbourg (FR)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, embarked: 'Q' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition ${
                    formData.embarked === 'Q'
                      ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Queenstown (IE)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Calculate Survival Likelihood</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Prediction Output Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Outcome Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Simulated Outcome
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  predictionResult.badgeColor === 'teal'
                    ? 'bg-teal-50 text-teal-700 border border-teal-200'
                    : predictionResult.badgeColor === 'rose'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {predictionResult.riskTier}
                </span>
              </div>

              {/* Big Prediction Outcome Banner */}
              <div className={`p-4 rounded-2xl border mb-4 flex items-center gap-4 ${
                predictionResult.survived
                  ? 'bg-teal-50/80 border-teal-200 text-teal-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                  predictionResult.survived ? 'bg-teal-600' : 'bg-rose-600'
                }`}>
                  {predictionResult.survived ? (
                    <Heart className="w-6 h-6 fill-white" />
                  ) : (
                    <Skull className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-black tracking-tight leading-tight">
                    {predictionResult.survived ? 'Predicted to Survive' : 'Predicted Casualty'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {predictionResult.survived
                      ? 'Attributes align with prioritized evacuation protocols.'
                      : 'Severe demographic and structural evacuation barriers.'}
                  </p>
                </div>
              </div>

              {/* Probability Gauge & Progress Bar */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Survival Likelihood Probability</span>
                  <span className="font-mono text-base font-black text-slate-900">
                    {predictionResult.percentage}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      predictionResult.survived ? 'bg-teal-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${predictionResult.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0% (Certain Loss)</span>
                  <span>50% Threshold</span>
                  <span>100% (Certain Rescue)</span>
                </div>
              </div>

              {/* Feature Impact Factors */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Contributing Heuristic Factors:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {predictionResult.factors.map((f, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="font-semibold text-slate-800">{f.feature}</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">{f.detail}</p>
                      </div>
                      <span className={`text-[11px] font-mono font-bold shrink-0 ${
                        f.effect === 'positive'
                          ? 'text-teal-600'
                          : f.effect === 'negative'
                          ? 'text-rose-600'
                          : 'text-slate-500'
                      }`}>
                        {f.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
              Deterministic heuristic sandbox for academic demonstration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
