import React from 'react';
import { useDataset } from '../context/DatasetContext';
import InsightCard from '../components/cards/InsightCard';
import {
  TrendingUp,
  Scale,
  Users,
  Anchor,
  ShieldAlert,
  Percent,
  HelpCircle,
  Lightbulb,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function SurvivalAnalysis() {
  const {
    activeMeta,
    stats,
    genderBreakdown,
    classBreakdown,
    ageDistribution,
    embarkationStats,
    familySizeStats,
    insights
  } = useDataset();

  const hasLabels = stats.hasLabels;

  // Comparison metrics for 1st vs 3rd class
  const class1 = classBreakdown.find(c => c.classNum === 1);
  const class3 = classBreakdown.find(c => c.classNum === 3);
  const classDiff = class1 && class3 && class1.rate !== null && class3.rate !== null
    ? (class1.rate - class3.rate).toFixed(1)
    : null;

  // Comparison metrics for Female vs Male
  const femaleData = genderBreakdown.find(g => g.gender === 'Female');
  const maleData = genderBreakdown.find(g => g.gender === 'Male');
  const genderDiff = femaleData && maleData && femaleData.rate !== null && maleData.rate !== null
    ? (femaleData.rate - maleData.rate).toFixed(1)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bivariate & Demographic Disparities
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">
              Cohort: {activeMeta.name}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Survival Rate Disparity Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Examine empirical survival probabilities across gender, social class, age demographics, family cohorts, and embarkation points.
          </p>
        </div>

        {/* Causal Disclaimer Note */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 max-w-xs text-right text-[11px] text-slate-500">
          <div className="flex items-center justify-end gap-1 font-semibold text-slate-700 mb-0.5">
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            <span>Academic Note</span>
          </div>
          Observational correlations indicate historical survival disparities without asserting direct unconfounded causation.
        </div>
      </div>

      {/* Dynamic Grounded Insights Strip */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Dynamically Computed Cohort Insights</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <InsightCard
              key={idx}
              title={insight.title}
              text={insight.text}
              type={insight.type}
            />
          ))}
        </div>
      </div>

      {/* Main Analysis Comparison Cards */}
      {hasLabels ? (
        <>
          {/* Top 2 Focus Areas: Gender & 1st vs 3rd Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gender Disparity Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    Gender Survival Differential
                  </h3>
                  {genderDiff && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      +{genderDiff}% Female Premium
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Evacuation priority directed lifeboats primarily to women and children.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-teal-800">Female Rate</span>
                    <div className="text-2xl font-black text-teal-950 font-mono mt-1">
                      {femaleData ? `${femaleData.rate}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-teal-700">
                      {femaleData ? `${femaleData.survived} / ${femaleData.total} survived` : ''}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-600">Male Rate</span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      {maleData ? `${maleData.rate}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {maleData ? `${maleData.survived} / ${maleData.total} survived` : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Comparison */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-700">
                    <span>Female Survival Likelihood</span>
                    <span>{femaleData?.rate || 0}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${femaleData?.rate || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-700">
                    <span>Male Survival Likelihood</span>
                    <span>{maleData?.rate || 0}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full transition-all duration-500"
                      style={{ width: `${maleData?.rate || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 1st Class vs 3rd Class Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-indigo-600" />
                    1st Class vs 3rd Class Gradient
                  </h3>
                  {classDiff && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      +{classDiff}% Class Gap
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Cabin altitude and proximity to Boat Deck dictated escape velocity.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-indigo-800">1st Class Rate</span>
                    <div className="text-2xl font-black text-indigo-950 font-mono mt-1">
                      {class1 ? `${class1.rate}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-indigo-700">
                      {class1 ? `${class1.survived} / ${class1.total} survived` : ''}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-600">3rd Class Rate</span>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                      {class3 ? `${class3.rate}%` : 'N/A'}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {class3 ? `${class3.survived} / ${class3.total} survived` : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Comparison */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-700">
                    <span>1st Class Survival Likelihood</span>
                    <span>{class1?.rate || 0}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${class1?.rate || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-700">
                    <span>3rd Class Survival Likelihood</span>
                    <span>{class3?.rate || 0}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full transition-all duration-500"
                      style={{ width: `${class3?.rate || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Survival Rates by Dimensions: 3 Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Survival by Age Group */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Survival Rate by Age Bracket
                </h3>
                <p className="text-xs text-slate-500">
                  Children under 10 had highest survival rates.
                </p>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ageDistribution.filter(a => a.rate !== null)}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 9, fill: '#475569' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val) => [`${val}%`, 'Survival Rate']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="rate" name="Survival Rate" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Survival by Family Size */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Survival Rate by Family Size
                </h3>
                <p className="text-xs text-slate-500">
                  Small units (2-4) outperformed solo and large families.
                </p>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={familySizeStats}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="category"
                      tick={{ fontSize: 10, fill: '#475569' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val) => [`${val}%`, 'Survival Rate']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="rate" name="Survival Rate" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Survival by Embarkation Port */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Survival Rate by Embarkation
                </h3>
                <p className="text-xs text-slate-500">
                  Cherbourg higher due to affluent 1st class passenger ratio.
                </p>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={embarkationStats.filter(e => e.rate !== null)}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="portCode"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(val, name, item) => [`${val}% (${item.payload.portName})`, 'Survival Rate']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="rate" name="Survival Rate" radius={[4, 4, 0, 0]}>
                      {embarkationStats.map((entry, index) => (
                        <Cell
                          key={`port-cell-${index}`}
                          fill={entry.portCode === 'C' ? '#0d9488' : entry.portCode === 'S' ? '#3b82f6' : '#f59e0b'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-xl mx-auto space-y-3">
          <ShieldAlert className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Survival Labels Unreleased for Active Split</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            The active dataset is the <strong>Titanic Test Dataset</strong> (418 records). Ground-truth survival labels were withheld by the Kaggle benchmark to evaluate generalization. Switch to the <strong>Titanic Training Dataset</strong> or a filtered training cohort from the top navigation to analyze empirical rates.
          </p>
        </div>
      )}
    </div>
  );
}
