import React from 'react';

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeType = 'default',
  color = 'teal'
}) {
  const colorMap = {
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-100',
      glow: 'shadow-teal-500/5'
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      glow: 'shadow-rose-500/5'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      glow: 'shadow-indigo-500/5'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      glow: 'shadow-amber-500/5'
    },
    slate: {
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      border: 'border-slate-200',
      glow: 'shadow-slate-500/5'
    }
  };

  const scheme = colorMap[color] || colorMap.teal;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              {value}
            </span>
          </div>
        </div>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text} ${scheme.border} border shadow-2xs`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <span className="text-slate-500 font-normal truncate">{subtitle}</span>
        {badgeText && (
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            badgeType === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : badgeType === 'danger'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : badgeType === 'warning'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
