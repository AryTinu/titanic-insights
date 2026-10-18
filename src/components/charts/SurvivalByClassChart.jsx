import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

export default function SurvivalByClassChart({ classBreakdown, hasLabels }) {
  if (!hasLabels || !classBreakdown || classBreakdown.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center p-6 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <Info className="w-8 h-8 text-amber-500 mb-2" />
        <h4 className="text-sm font-semibold text-slate-800">Survival Labels Unavailable</h4>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Class-wise outcomes cannot be computed for unlabelled test records.
        </p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = classBreakdown.find(c => c.pclass === label);
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-lg border border-slate-700 space-y-1">
          <p className="font-bold text-slate-100">{label}</p>
          <p className="text-teal-400 font-medium">Survived: {payload[0]?.value} ({item?.rate}%)</p>
          <p className="text-rose-400 font-medium">Died: {payload[1]?.value} ({item ? (100 - item.rate).toFixed(1) : 0}%)</p>
          <p className="text-slate-400 pt-1 border-t border-slate-700 text-[10px]">Total in Class: {item?.total}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={classBreakdown}
          margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="pclass"
            tick={{ fontSize: 12, fill: '#475569' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px' }}
            formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
          />
          <Bar dataKey="survived" name="Survived" fill="#0d9488" radius={[4, 4, 0, 0]} />
          <Bar dataKey="died" name="Casualties" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
