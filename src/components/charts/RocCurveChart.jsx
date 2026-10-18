import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function RocCurveChart({ rocPoints, rocAuc, modelName }) {
  // Format roc points
  const data = (rocPoints || []).map(p => ({
    fpr: p.fpr,
    tpr: p.tpr,
    randomBaseline: p.fpr
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg border border-slate-700 space-y-1">
          <p className="font-semibold text-teal-400">{modelName}</p>
          <p className="text-slate-300">True Positive Rate (Sensitivity): <strong className="text-white">{d.tpr}</strong></p>
          <p className="text-slate-300">False Positive Rate (1 - Specificity): <strong className="text-white">{d.fpr}</strong></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="fpr"
            type="number"
            domain={[0, 1]}
            tickCount={6}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
            label={{ value: 'False Positive Rate (FPR)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#94a3b8' }}
          />
          <YAxis
            type="number"
            domain={[0, 1]}
            tickCount={6}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft', offset: 15, fontSize: 10, fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="randomBaseline"
            name="Random Guessing (AUC = 0.50)"
            stroke="#94a3b8"
            strokeDasharray="4 4"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="tpr"
            name={modelName}
            stroke="#0d9488"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#0d9488' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* AUC Pill */}
      <div className="absolute top-2 right-4 bg-white/95 border border-slate-200 shadow-xs px-2.5 py-1 rounded-lg text-xs flex items-center gap-2">
        <span className="text-slate-500 font-medium">ROC-AUC:</span>
        <span className="text-teal-700 font-bold font-mono text-sm">{rocAuc}</span>
      </div>
    </div>
  );
}
