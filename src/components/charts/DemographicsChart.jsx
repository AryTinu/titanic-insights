import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DemographicsChart({ stats, embarkationStats }) {
  const [view, setView] = useState('port'); // 'port' or 'gender'

  const portData = embarkationStats.map(e => ({
    name: e.portCode === 'S' ? 'Southampton' : e.portCode === 'C' ? 'Cherbourg' : e.portCode === 'Q' ? 'Queenstown' : 'Unknown',
    count: e.total,
    pct: stats.total > 0 ? ((e.total / stats.total) * 100).toFixed(1) : 0,
    color: e.portCode === 'S' ? '#3b82f6' : e.portCode === 'C' ? '#0d9488' : '#f59e0b'
  }));

  const genderData = [
    { name: 'Female', count: stats.femaleCount, pct: stats.total > 0 ? ((stats.femaleCount / stats.total) * 100).toFixed(1) : 0, color: '#ec4899' },
    { name: 'Male', count: stats.maleCount, pct: stats.total > 0 ? ((stats.maleCount / stats.total) * 100).toFixed(1) : 0, color: '#0284c7' }
  ];

  const activeData = view === 'port' ? portData : genderData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
          <p className="font-semibold text-slate-200">{d.name}</p>
          <p className="text-teal-300 font-bold mt-0.5">{d.count} passengers ({d.pct}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 flex flex-col">
      <div className="flex items-center justify-end gap-1 mb-2">
        <button
          onClick={() => setView('port')}
          className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition ${
            view === 'port'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Embarkation Ports
        </button>
        <button
          onClick={() => setView('gender')}
          className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition ${
            view === 'gender'
              ? 'bg-slate-900 text-white shadow-2xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Gender Ratio
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activeData}
            layout="vertical"
            margin={{ top: 5, right: 25, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              width={85}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {activeData.map((entry, index) => (
                <Cell key={`dem-cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
