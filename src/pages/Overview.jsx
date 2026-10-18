import React from 'react';
import { useDataset } from '../context/DatasetContext';
import SummaryCard from '../components/cards/SummaryCard';
import SurvivalDonutChart from '../components/charts/SurvivalDonutChart';
import SurvivalByGenderChart from '../components/charts/SurvivalByGenderChart';
import SurvivalByClassChart from '../components/charts/SurvivalByClassChart';
import AgeDistributionChart from '../components/charts/AgeDistributionChart';
import FareDistributionChart from '../components/charts/FareDistributionChart';
import DemographicsChart from '../components/charts/DemographicsChart';
import {
  Users,
  Heart,
  Skull,
  TrendingUp,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export default function Overview() {
  const {
    activeMeta,
    stats,
    genderBreakdown,
    classBreakdown,
    ageDistribution,
    fareDistribution,
    embarkationStats,
    setCurrentPage,
    setDataset
  } = useDataset();

  const hasLabels = stats.hasLabels;

  return (
    <div className="space-y-6">
      {/* Top Banner & Context Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                Active Cohort: {activeMeta.name}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium font-mono">
                {stats.total.toLocaleString()} manifest records
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Executive Survival & Passenger Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeMeta.description}
            </p>
          </div>

          {/* Quick Dataset Switcher Chips */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => setCurrentPage('explorer')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-2xs"
            >
              <span>Explore All Passengers</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
            <button
              onClick={() => setCurrentPage('prediction')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Simulate Custom Passenger</span>
            </button>
          </div>
        </div>

        {/* Warning Banner if Test Split is active */}
        {!hasLabels && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50/90 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Simulated Test Mode:</strong> Ground-truth survival labels are unavailable for the Titanic competition test set (418 passengers). Survival distribution and class rates cannot be evaluated; simulated heuristic inference is enabled in the explorer table.
            </div>
          </div>
        )}
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Passengers */}
        <SummaryCard
          title="Total Passengers"
          value={stats.total.toLocaleString()}
          subtitle="Cohort Manifest Size"
          icon={Users}
          color="indigo"
          badgeText={`${stats.femaleCount} F / ${stats.maleCount} M`}
          badgeType="default"
        />

        {/* Survivors */}
        <SummaryCard
          title="Survivors"
          value={hasLabels ? stats.survived.toLocaleString() : 'N/A'}
          subtitle={hasLabels ? `${stats.survivalRate}% of cohort survived` : 'Labels Unreleased'}
          icon={Heart}
          color="teal"
          badgeText={hasLabels ? 'Confirmed Live' : 'Test Holdout'}
          badgeType={hasLabels ? 'success' : 'warning'}
        />

        {/* Casualties */}
        <SummaryCard
          title="Casualties (Died)"
          value={hasLabels ? stats.died.toLocaleString() : 'N/A'}
          subtitle={hasLabels ? `${(100 - stats.survivalRate).toFixed(1)}% mortality rate` : 'Labels Unreleased'}
          icon={Skull}
          color="rose"
          badgeText={hasLabels ? 'Historical Loss' : 'Test Holdout'}
          badgeType={hasLabels ? 'danger' : 'warning'}
        />

        {/* Survival Rate */}
        <SummaryCard
          title="Survival Rate"
          value={hasLabels ? `${stats.survivalRate}%` : 'N/A'}
          subtitle={stats.avgAge ? `Avg Age: ${stats.avgAge} yrs` : 'Demographic Summary'}
          icon={TrendingUp}
          color="amber"
          badgeText={hasLabels ? (stats.survivalRate > 40 ? 'High Rate' : 'Historical Mean') : 'Simulated Only'}
          badgeType={hasLabels ? 'default' : 'warning'}
        />
      </div>

      {/* Primary Analytics Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart: Survival Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Survival Distribution
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Outcome Share
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Proportion of rescued survivors versus casualties.
            </p>
          </div>
          <SurvivalDonutChart stats={stats} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Rescue Priority Impact</span>
            <span className="font-semibold text-slate-700">38.4% Base Benchmark</span>
          </div>
        </div>

        {/* Bar Chart: Survival By Gender */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Survival by Gender
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Gender Outcomes
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Comparison of male and female passenger outcomes.
            </p>
          </div>
          <SurvivalByGenderChart genderBreakdown={genderBreakdown} hasLabels={hasLabels} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Maritime Rule: "Women First"</span>
            <span className="font-semibold text-teal-700">~74% Female Rate</span>
          </div>
        </div>

        {/* Bar Chart: Survival By Passenger Class */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Survival by Class
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Socioeconomic Tier
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Outcomes stratified across 1st, 2nd, and 3rd class berths.
            </p>
          </div>
          <SurvivalByClassChart classBreakdown={classBreakdown} hasLabels={hasLabels} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Deck Access Disparity</span>
            <span className="font-semibold text-slate-700">1st: 62.9% vs 3rd: 24.2%</span>
          </div>
        </div>
      </div>

      {/* Secondary Demographic Charts: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Age Distribution Histogram */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Age Demographic Bins
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Age Groups
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Passenger age histogram {hasLabels ? 'with survival breakdown' : 'counts'}.
            </p>
          </div>
          <AgeDistributionChart ageDistribution={ageDistribution} hasLabels={hasLabels} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Missing Records Handled</span>
            <span className="font-mono text-slate-700">{stats.missingAgeCount} unrecorded</span>
          </div>
        </div>

        {/* Fare Distribution Curve */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Ticket Fare Distribution
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Fare Brackets
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Passenger distribution across British Pound (£/$) fare tiers.
            </p>
          </div>
          <FareDistributionChart fareDistribution={fareDistribution} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Mean Cohort Fare</span>
            <span className="font-semibold text-slate-700 font-mono">${stats.avgFare || 0}</span>
          </div>
        </div>

        {/* Demographics / Embarkation / Gender Proportions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Demographics & Ports
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Port & Sex Shares
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Distribution of boarding ports and gender ratios.
            </p>
          </div>
          <DemographicsChart stats={stats} embarkationStats={embarkationStats} />
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Southampton Majority</span>
            <span className="font-semibold text-slate-700">72.4% Port Share</span>
          </div>
        </div>
      </div>
    </div>
  );
}
