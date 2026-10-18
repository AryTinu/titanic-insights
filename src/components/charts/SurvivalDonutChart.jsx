import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';

const COLORS = ['#0d9488', '#f43f5e']; // Teal for survived, Muted Coral for casualties

export default function SurvivalDonutChart({ stats }) {
  if (!stats.hasLabels) {
    return (
      <div className="h-64 flex flex-col items-center justify-center p-6 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <Info className="w-8 h-8 text-amber-500 mb-2" />
        <h4 className="text-sm font-semibold text-slate-800">Survival Labels Unavailable</h4>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          This test split does not include ground-truth labels. Actual survival distribution cannot be calculated.
        </p>
      </div>
    );
  }

  const data = [
    { name: 'Survived', value: stats.survived },
    { name: 'Casualties (Died)', value: stats.died }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      const pct = stats.total > 0 ? ((p.value / (stats.survived + stats.died)) * 100).toFixed(1) : 0;
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
          <p className="font-semibold text-slate-200">{p.name}</p>
          <p className="text-teal-300 font-bold mt-0.5">{p.value.toLocaleString()} passengers ({pct}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={86}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-9">
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          {stats.survivalRate !== null ? `${stats.survivalRate}%` : 'N/A'}
        </span>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Survival Rate
        </span>
      </div>
    </div>
  );
}
