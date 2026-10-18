import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AgeDistributionChart({ ageDistribution, hasLabels }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = ageDistribution.find(a => a.label === label);
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg text-xs shadow-lg border border-slate-700 space-y-1">
          <p className="font-bold text-slate-100">Age Bracket: {label}</p>
          <p className="text-slate-300 font-medium">Total Passengers: {item?.total}</p>
          {hasLabels && (
            <>
              <p className="text-teal-400 font-medium">Survived: {item?.survived} ({item?.rate}%)</p>
              <p className="text-rose-400 font-medium">Casualties: {item?.died}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ageDistribution}
          margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#475569' }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {hasLabels ? (
            <>
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '10px' }}
                formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
              />
              <Bar dataKey="survived" name="Survived" stackId="a" fill="#0d9488" />
              <Bar dataKey="died" name="Casualties" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </>
          ) : (
            <Bar dataKey="total" name="Total Passengers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
