import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ModelComparisonChart({ models }) {
  // Format data across metrics
  const metrics = [
    { key: 'accuracy', label: 'Accuracy' },
    { key: 'precision', label: 'Precision' },
    { key: 'recall', label: 'Recall' },
    { key: 'f1', label: 'F1-Score' },
    { key: 'rocAuc', label: 'ROC-AUC' }
  ];

  const data = metrics.map(m => ({
    metric: m.label,
    'Logistic Regression': +(models.logistic_regression.metrics[m.key] * 100).toFixed(1),
    'Decision Tree': +(models.decision_tree.metrics[m.key] * 100).toFixed(1),
    'Random Forest': +(models.random_forest.metrics[m.key] * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-lg border border-slate-700 space-y-1">
          <p className="font-bold text-slate-100">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} style={{ color: entry.color }} className="font-medium flex items-center justify-between gap-4">
              <span>{entry.name}:</span>
              <span className="font-bold">{entry.value}%</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 15, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="metric"
            tick={{ fontSize: 11, fill: '#475569' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            domain={[50, 100]}
            unit="%"
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '12px' }}
            formatter={(value) => <span className="text-xs font-semibold text-slate-700">{value}</span>}
          />
          <Bar dataKey="Logistic Regression" fill="#64748b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Decision Tree" fill="#0284c7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Random Forest" fill="#0d9488" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
