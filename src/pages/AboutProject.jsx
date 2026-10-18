import React from 'react';
import {
  Info,
  Target,
  FileText,
  Workflow,
  Cpu,
  ShieldAlert,
  Code2,
  CheckCircle2,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function AboutProject() {
  const steps = [
    { num: '01', title: 'Dataset Ingestion', desc: 'Sourcing 891 training records and 418 test records from the historical Kaggle benchmark repository.' },
    { num: '02', title: 'Data Cleaning', desc: 'Imputing missing ages using class/sex medians; handling sparse cabin tags and unrecorded embarkation ports.' },
    { num: '03', title: 'Exploratory EDA', desc: 'Analyzing univariate distributions, bivariate survival disparities, and socioeconomic deck gradients.' },
    { num: '04', title: 'Feature Engineering', desc: 'Extracting honorific titles (Mr., Mrs., Miss, Master), computing family size (SibSp + Parch + 1), and one-hot encoding.' },
    { num: '05', title: 'Model Architectures', desc: 'Formulating Logistic Regression, CART Decision Trees, and Random Forest ensemble classifiers.' },
    { num: '06', title: 'Evaluation & Tuning', desc: '5-fold stratified cross validation, confusion matrix decomposition, and ROC-AUC curve mapping.' },
    { num: '07', title: 'Interactive BI Dashboard', desc: 'Engineering reactive React dashboards with Recharts, custom cohort filtering, and heuristic simulation.' }
  ];

  const techStack = [
    { name: 'React 19', role: 'Component hierarchy and reactive state management' },
    { name: 'Vite', role: 'Blazing fast ESM bundler and development server' },
    { name: 'Tailwind CSS v4', role: 'Modern utility-first styling with custom SaaS palette' },
    { name: 'Recharts', role: 'Responsive SVG data visualizations and charting engine' },
    { name: 'Lucide React', role: 'Clean, consistent system iconography' },
    { name: 'Deterministic Engine', role: 'Pure client-side analytics and heuristic inference' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
            <BookOpen className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Academic Project Documentation
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-semibold">
            B.Tech / B.E. Mini Project
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Titanic Insights — Survival Prediction & Passenger Analytics
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          A modern, academic machine learning mini-project exploring historical passenger demographics, survival correlates, and classification algorithms from the 1912 RMS Titanic disaster.
        </p>
      </div>

      {/* Problem Statement & Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Statement */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <FileText className="w-5 h-5 text-teal-600" />
            <h3>Problem Statement</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The sinking of the RMS Titanic is one of the most infamous maritime shipwrecks in history. On April 15, 1912, after colliding with an iceberg, the ship sank, resulting in the death of 1,502 out of 2,224 passengers and crew.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            While there was an element of chance involved in surviving, evidence shows certain demographic cohorts (women, children, and the upper-class) were substantially more likely to survive than others due to evacuation protocols and physical cabin placement.
          </p>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
            <strong>Core Challenge:</strong> Analyze passenger manifest records to identify key survival determinants and construct predictive classification models capable of distinguishing survivors from casualties.
          </div>
        </div>

        {/* Project Objectives */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3>Project Objectives</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Exploratory Data Analysis:</strong> Clean and profile distributions across age, ticket fare, cabin locations, and embarkation points.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Demographic Correlates:</strong> Quantify empirical survival disparities across gender, passenger class tiers, and traveling family cohorts.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Classifier Evaluation:</strong> Benchmark Logistic Regression, Decision Tree, and Random Forest models using standard holdout metrics (ROC-AUC, F1, Confusion Matrix).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Interactive Analytics UI:</strong> Deliver a production-grade dashboard supporting live dataset switching, custom filtering, and heuristic scenario simulations.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Methodology Pipeline Flow */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-teal-600" />
          <h3 className="text-base font-bold text-slate-900">
            End-to-End Machine Learning & Analytics Methodology
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-teal-500 hover:bg-teal-50/20 transition group"
            >
              <div>
                <span className="font-mono text-xs font-black text-teal-600 group-hover:text-teal-700">
                  {st.num}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-1 leading-snug">
                  {st.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack & Implementation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            Frontend Technology Stack
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {techStack.map((tech, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="font-bold text-xs text-slate-900 block">{tech.name}</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Limitations & Academic Boundaries */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3 text-amber-950">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <h3>Demonstration Scope & Architectural Limitations</h3>
        </div>
        <p className="text-xs leading-relaxed text-amber-900/90">
          This system is an interactive educational demonstration designed to illustrate machine learning evaluation and exploratory data analytics entirely within a modern client-side React architecture:
        </p>
        <ul className="space-y-1.5 text-xs text-amber-900/90 list-disc list-inside">
          <li><strong>Client-Side Only:</strong> No backend server, Python runtime, or external database is queried during runtime. All data processing is handled within the React virtual DOM.</li>
          <li><strong>Offline Benchmark Metrics:</strong> Classification metrics (Accuracy, ROC-AUC, F1, Confusion Matrix) reflect published baseline benchmarks on standard validation splits and remain invariant to transient passenger slices.</li>
          <li><strong>Heuristic Simulation Sandbox:</strong> The passenger prediction interface employs a transparent, deterministic logistic heuristic based on historical weights rather than calling an active model server.</li>
          <li><strong>Unlabelled Test Set:</strong> The competition test partition (418 records) purposefully withholds ground-truth labels to simulate real-world blind inference.</li>
        </ul>
      </div>
    </div>
  );
}
