import React from 'react';

export default function ConfusionMatrix({ matrix, modelName }) {
  const { tn, fp, fn, tp } = matrix;
  const total = tn + fp + fn + tp;

  const tnPct = ((tn / total) * 100).toFixed(1);
  const fpPct = ((fp / total) * 100).toFixed(1);
  const fnPct = ((fn / total) * 100).toFixed(1);
  const tpPct = ((tp / total) * 100).toFixed(1);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <span>Evaluated on <strong className="text-slate-800">{total} holdout samples</strong></span>
        <span className="font-mono text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
          {modelName}
        </span>
      </div>

      {/* Grid Table */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {/* True Negative */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              True Negative (TN)
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Correct
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-emerald-950 font-mono">{tn}</div>
            <div className="text-xs text-emerald-700">{tnPct}% of holdout</div>
          </div>
          <p className="text-[11px] text-slate-600">
            Actual: <strong>Casualty</strong> | Predicted: <strong>Casualty</strong>
          </p>
        </div>

        {/* False Positive */}
        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              False Positive (FP)
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
              Type I Error
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-rose-950 font-mono">{fp}</div>
            <div className="text-xs text-rose-700">{fpPct}% of holdout</div>
          </div>
          <p className="text-[11px] text-slate-600">
            Actual: <strong>Casualty</strong> | Predicted: <strong>Survived</strong>
          </p>
        </div>

        {/* False Negative */}
        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              False Negative (FN)
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
              Type II Error
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-rose-950 font-mono">{fn}</div>
            <div className="text-xs text-rose-700">{fnPct}% of holdout</div>
          </div>
          <p className="text-[11px] text-slate-600">
            Actual: <strong>Survived</strong> | Predicted: <strong>Casualty</strong>
          </p>
        </div>

        {/* True Positive */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              True Positive (TP)
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Correct
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-emerald-950 font-mono">{tp}</div>
            <div className="text-xs text-emerald-700">{tpPct}% of holdout</div>
          </div>
          <p className="text-[11px] text-slate-600">
            Actual: <strong>Survived</strong> | Predicted: <strong>Survived</strong>
          </p>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Correct Predictions: <strong className="text-slate-800">{tn + tp}</strong> / {total}</span>
        <span>Accuracy: <strong className="text-teal-700 font-semibold">{(((tn + tp) / total) * 100).toFixed(1)}%</strong></span>
      </div>
    </div>
  );
}
