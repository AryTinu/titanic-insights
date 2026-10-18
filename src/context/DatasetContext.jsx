import React, { createContext, useContext, useState, useMemo } from 'react';
import { TITANIC_TRAIN_DATA } from '../data/titanicTrainingData';
import { TITANIC_TEST_DATA } from '../data/titanicTestData';
import {
  computeDatasetStats,
  computeSurvivalByGender,
  computeSurvivalByClass,
  computeAgeDistribution,
  computeFareDistribution,
  computeEmbarkationStats,
  computeFamilySizeStats,
  generateDatasetInsights
} from '../utils/analytics';

const DatasetContext = createContext();

export const DATASET_OPTIONS = [
  {
    id: 'titanic_train',
    name: 'Titanic Training Dataset',
    category: 'Benchmark Splits',
    count: 891,
    hasLabels: true,
    description: 'Standard historical training partition of 891 passengers with verified ground-truth survival labels (342 survivors, 549 casualties).',
    badge: 'Ground Truth Labels'
  },
  {
    id: 'titanic_test',
    name: 'Titanic Test Dataset',
    category: 'Benchmark Splits',
    count: 418,
    hasLabels: false,
    description: 'Competition evaluation split of 418 passengers without actual survival outcomes. Demonstrates simulated model inference.',
    badge: 'Labels Unavailable (Simulated)'
  },
  {
    id: 'first_class',
    name: 'First-Class Passengers',
    category: 'Filtered Cohorts',
    count: TITANIC_TRAIN_DATA.filter(p => p.Pclass === 1).length,
    hasLabels: true,
    description: 'Filtered cohort of passengers traveling in First Class (Pclass = 1), showcasing upper-deck survival dynamics and luxury cabin berths.',
    badge: 'Pclass = 1 Cohort'
  },
  {
    id: 'female_passengers',
    name: 'Female Passengers',
    category: 'Filtered Cohorts',
    count: TITANIC_TRAIN_DATA.filter(p => p.Sex === 'female').length,
    hasLabels: true,
    description: 'Demographic slice of all female passengers from the training set, illustrating high historical survival under the "women & children first" rule.',
    badge: 'Sex = Female'
  },
  {
    id: 'male_passengers',
    name: 'Male Passengers',
    category: 'Filtered Cohorts',
    count: TITANIC_TRAIN_DATA.filter(p => p.Sex === 'male').length,
    hasLabels: true,
    description: 'Demographic slice of male passengers aboard Titanic, highlighting severe casualty rates among adult men.',
    badge: 'Sex = Male'
  },
  {
    id: 'family_travellers',
    name: 'Family Travellers',
    category: 'Filtered Cohorts',
    count: TITANIC_TRAIN_DATA.filter(p => (p.SibSp > 0 || p.Parch > 0)).length,
    hasLabels: true,
    description: 'Filtered subset of passengers traveling with at least one sibling, spouse, parent, or child aboard (SibSp > 0 or Parch > 0).',
    badge: 'With Family (SibSp+Parch > 0)'
  }
];

export function DatasetProvider({ children }) {
  const [activeDatasetId, setActiveDatasetId] = useState('titanic_train');
  const [currentPage, setCurrentPage] = useState('overview');
  const [toast, setToast] = useState(null);
  const [selectedPassengerForModal, setSelectedPassengerForModal] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleSelectDataset = (id) => {
    if (id === activeDatasetId) return;
    setActiveDatasetId(id);
    const meta = DATASET_OPTIONS.find(d => d.id === id);
    showToast(`Switched active dataset to "${meta.name}" (${meta.count} records)`, 'success');
  };

  // Derive active records from underlying data
  const activePassengers = useMemo(() => {
    switch (activeDatasetId) {
      case 'titanic_train':
        return TITANIC_TRAIN_DATA;
      case 'titanic_test':
        return TITANIC_TEST_DATA;
      case 'first_class':
        return TITANIC_TRAIN_DATA.filter(p => p.Pclass === 1);
      case 'female_passengers':
        return TITANIC_TRAIN_DATA.filter(p => p.Sex === 'female');
      case 'male_passengers':
        return TITANIC_TRAIN_DATA.filter(p => p.Sex === 'male');
      case 'family_travellers':
        return TITANIC_TRAIN_DATA.filter(p => (p.SibSp > 0 || p.Parch > 0));
      default:
        return TITANIC_TRAIN_DATA;
    }
  }, [activeDatasetId]);

  const activeMeta = useMemo(() => {
    return DATASET_OPTIONS.find(d => d.id === activeDatasetId) || DATASET_OPTIONS[0];
  }, [activeDatasetId]);

  // Derived real-time analytics
  const stats = useMemo(() => computeDatasetStats(activePassengers), [activePassengers]);
  const genderBreakdown = useMemo(() => computeSurvivalByGender(activePassengers), [activePassengers]);
  const classBreakdown = useMemo(() => computeSurvivalByClass(activePassengers), [activePassengers]);
  const ageDistribution = useMemo(() => computeAgeDistribution(activePassengers), [activePassengers]);
  const fareDistribution = useMemo(() => computeFareDistribution(activePassengers), [activePassengers]);
  const embarkationStats = useMemo(() => computeEmbarkationStats(activePassengers), [activePassengers]);
  const familySizeStats = useMemo(() => computeFamilySizeStats(activePassengers), [activePassengers]);
  const insights = useMemo(() => generateDatasetInsights(activePassengers), [activePassengers]);

  const value = {
    activeDatasetId,
    activeMeta,
    activePassengers,
    datasetOptions: DATASET_OPTIONS,
    setDataset: handleSelectDataset,
    currentPage,
    setCurrentPage,
    stats,
    genderBreakdown,
    classBreakdown,
    ageDistribution,
    fareDistribution,
    embarkationStats,
    familySizeStats,
    insights,
    toast,
    showToast,
    closeToast,
    selectedPassengerForModal,
    setSelectedPassengerForModal
  };

  return (
    <DatasetContext.Provider value={value}>
      {children}
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  const context = useContext(DatasetContext);
  if (!context) {
    throw new Error('useDataset must be used within a DatasetProvider');
  }
  return context;
}
