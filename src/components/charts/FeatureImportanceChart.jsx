import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function FeatureImportanceChart({ features }) {
  const sorted = [...features].sort((a, b) => b.importance - a.importance);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-lg border border-slate-700 max-w-xs space-y-1">
          <p className="font-bold text-teal-300">{d.feature}</p>
          <p className="text-slate-100 font-mono">Relative Importance: <strong className="text-white">{(d.importance * 100).toFixed(1)}%</strong></p>
          <p className="text-slate-400 text-[11px] leading-tight pt-1 border-t border-slate-700">{d.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 10, right: 25, left: 35, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            domain={[0, 0.35]}
            tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="feature"
            tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
            {sorted.map((entry, index) => (
              <Cell
                key={`feat-${index}`}
                fill={index === 0 ? '#0d9488' : index === 1 ? '#14b8a6' : index === 2 ? '#0284c7' : '#64748b'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
