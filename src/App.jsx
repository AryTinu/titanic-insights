import React, { useState } from 'react';
import { DatasetProvider, useDataset } from './context/DatasetContext';
import Sidebar from './components/layout/Sidebar';
import TopNav from './components/layout/TopNav';
import Toast from './components/layout/Toast';
import PassengerDetailModal from './components/tables/PassengerDetailModal';

// Pages
import Overview from './pages/Overview';
import DatasetExplorer from './pages/DatasetExplorer';
import SurvivalAnalysis from './pages/SurvivalAnalysis';
import ModelPerformance from './pages/ModelPerformance';
import PassengerPrediction from './pages/PassengerPrediction';
import AboutProject from './pages/AboutProject';

function AppContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentPage, selectedPassengerForModal, setSelectedPassengerForModal } = useDataset();

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'explorer':
        return <DatasetExplorer />;
      case 'analysis':
        return <SurvivalAnalysis />;
      case 'models':
        return <ModelPerformance />;
      case 'prediction':
        return <PassengerPrediction />;
      case 'about':
        return <AboutProject />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Workspace (Offset for fixed 64 (16rem) sidebar on lg screens) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Top Navigation Bar */}
        <TopNav setMobileOpen={setMobileOpen} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderPage()}
        </main>

        {/* Minimal Footer */}
        <footer className="border-t border-slate-200 bg-white/80 py-4 px-6 text-center text-xs text-slate-400">
          Titanic Insights — College Mini Project in Machine Learning & Business Intelligence • React + Tailwind CSS + Recharts
        </footer>
      </div>

      {/* Global Interactive Modal */}
      {selectedPassengerForModal && (
        <PassengerDetailModal
          passenger={selectedPassengerForModal}
          onClose={() => setSelectedPassengerForModal(null)}
        />
      )}

      {/* Global Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <DatasetProvider>
      <AppContent />
    </DatasetProvider>
  );
}
