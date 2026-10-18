import React from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, Compass } from 'lucide-react';

export default function InsightCard({ title, text, type = 'primary' }) {
  const styles = {
    primary: {
      bg: 'bg-teal-50/60',
      border: 'border-teal-200',
      text: 'text-teal-900',
      icon: TrendingUp,
      iconColor: 'text-teal-600',
      tag: 'Key Finding'
    },
    teal: {
      bg: 'bg-emerald-50/60',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      icon: Lightbulb,
      iconColor: 'text-emerald-600',
      tag: 'Class Effect'
    },
    slate: {
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      text: 'text-slate-800',
      icon: Compass,
      iconColor: 'text-slate-600',
      tag: 'Cohort Pattern'
    },
    amber: {
      bg: 'bg-amber-50/70',
      border: 'border-amber-200',
      text: 'text-amber-900',
      icon: Lightbulb,
      iconColor: 'text-amber-600',
      tag: 'Port Factor'
    },
    warning: {
      bg: 'bg-amber-50/80',
      border: 'border-amber-300',
      text: 'text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      tag: 'Notice'
    }
  };

  const current = styles[type] || styles.primary;
  const Icon = current.icon;

  return (
    <div className={`rounded-xl border ${current.border} ${current.bg} p-4 text-xs transition`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Icon className={`w-4 h-4 ${current.iconColor}`} />
          <span>{title}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-slate-200/80 text-slate-600 shadow-2xs">
          {current.tag}
        </span>
      </div>
      <p className="text-slate-600 leading-relaxed font-normal">{text}</p>
    </div>
  );
}
