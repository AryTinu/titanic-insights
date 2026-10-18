import React, { useState } from 'react';
import { useDataset } from '../context/DatasetContext';
import { ML_MODELS, FEATURE_IMPORTANCE, MODEL_EVALUATION_METHODOLOGY } from '../data/demoMetrics';
import ModelComparisonChart from '../components/charts/ModelComparisonChart';
import ConfusionMatrix from '../components/charts/ConfusionMatrix';
import RocCurveChart from '../components/charts/RocCurveChart';
import FeatureImportanceChart from '../components/charts/FeatureImportanceChart';
import {
  Cpu,
  Layers,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Check,
  TrendingUp,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export default function ModelPerformance() {
  const { activeMeta } = useDataset();
  const [selectedModelId, setSelectedModelId] = useState('random_forest');

  const selectedModel = ML_MODELS[selectedModelId];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Supervised Classification Benchmarks
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">
              Offline Holdout Evaluation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Classifier Performance & Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Compare benchmark algorithms evaluated on standard Titanic holdout validation data. Metrics illustrate model capacity, generalization, and feature weighting.
          </p>
        </div>

        {/* Global Validation Independence Note */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 max-w-xs text-right text-[11px] text-slate-500">
          <div className="flex items-center justify-end gap-1 font-semibold text-slate-700 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Benchmark Invariance</span>
          </div>
          Model evaluation metrics reflect standardized offline cross-validation splits and remain invariant to temporary frontend passenger filters.
        </div>
      </div>

      {/* Model Selection Selector & Metric Summary Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Select Architecture for Deep-Dive</h3>
            <p className="text-xs text-slate-500">Inspect confusion matrix, hyperparameters, and ROC coordinates.</p>
          </div>

          <div className="flex items-center gap-2">
            {Object.values(ML_MODELS).map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedModelId === model.id
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Model Description Banner */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-slate-800">{selectedModel.name}</span>{' '}
            <span className="text-slate-400">({selectedModel.type})</span>
            <p className="text-slate-600 mt-0.5 max-w-3xl">{selectedModel.description}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Tuned Parameters:</span>
            {Object.entries(selectedModel.hyperparameters).slice(0, 3).map(([key, val]) => (
              <span key={key} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                {key}={String(val)}
              </span>
            ))}
          </div>
        </div>

        {/* Active Model KPI Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200">
            <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Accuracy</span>
            <div className="text-xl font-black text-teal-950 font-mono mt-0.5">
              {(selectedModel.metrics.accuracy * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-teal-700">Overall Correct</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Precision</span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {(selectedModel.metrics.precision * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500">TP / (TP + FP)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Recall</span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {(selectedModel.metrics.recall * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500">TP / (TP + FN)</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">F1-Score</span>
            <div className="text-xl font-black text-slate-900 font-mono mt-0.5">
              {(selectedModel.metrics.f1 * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500">Harmonic Mean</span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">ROC-AUC</span>
            <div className="text-xl font-black text-indigo-950 font-mono mt-0.5">
              {selectedModel.metrics.rocAuc}
            </div>
            <span className="text-[10px] text-indigo-700">Discrimination Power</span>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Comparison Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                Multi-Model Performance Benchmark
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Comparative Metrics
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Side-by-side evaluation of Logistic Regression, Decision Tree, and Random Forest.
            </p>
          </div>
          <ModelComparisonChart models={ML_MODELS} />
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Ensemble Advantage</span>
            <span className="font-semibold text-teal-700">Random Forest leads on F1 (79.4%)</span>
          </div>
        </div>

        {/* Confusion Matrix Heatmap */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                Confusion Matrix: {selectedModel.name}
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Holdout Split
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Distribution of true vs predicted outcomes on the 179-passenger validation holdout.
            </p>
          </div>
          <ConfusionMatrix matrix={selectedModel.confusionMatrix} modelName={selectedModel.name} />
        </div>
      </div>

      {/* ROC Curve & Feature Importance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROC Curve */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                ROC Curve & Discrimination
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Sensitivity vs Specificity
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              True Positive Rate plotted against False Positive Rate across decision thresholds.
            </p>
          </div>
          <RocCurveChart
            rocPoints={selectedModel.rocCurve}
            rocAuc={selectedModel.metrics.rocAuc}
            modelName={selectedModel.name}
          />
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Baseline Reference</span>
            <span className="font-mono text-slate-600">Diagonal = Random Guessing (0.50)</span>
          </div>
        </div>

        {/* Feature Importance (Random Forest) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">
                Random Forest Feature Importance
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Mean Decrease Impurity
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Relative importance contribution of each passenger feature to decision tree splits.
            </p>
          </div>
          <FeatureImportanceChart features={FEATURE_IMPORTANCE} />
          <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Primary Driver</span>
            <span className="font-semibold text-teal-700">Sex (Female) accounts for 31.2%</span>
          </div>
        </div>
      </div>

      {/* Evaluation Methodology Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-bold text-slate-900">
            Simulated ML Evaluation Methodology & Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-800">Partition & Cross-Validation Strategy</h4>
            <p className="text-slate-600 leading-relaxed">
              <strong>Split:</strong> {MODEL_EVALUATION_METHODOLOGY.splitStrategy}
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>Validation:</strong> {MODEL_EVALUATION_METHODOLOGY.crossValidation} to minimize fold variance and prevent data leakage between train and test splits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-800">Feature Engineering & Preprocessing Pipeline</h4>
            <ul className="space-y-1.5 text-slate-600">
              {MODEL_EVALUATION_METHODOLOGY.preprocessing.map((prep, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span><strong>{prep.step}:</strong> {prep.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Educational Demonstration Disclaimer:</strong> {MODEL_EVALUATION_METHODOLOGY.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
