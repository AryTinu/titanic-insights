/**
 * Utility functions to calculate live demographic and survival analytics from passenger records
 */

export function computeDatasetStats(passengers = []) {
  const total = passengers.length;
  if (total === 0) {
    return {
      total: 0,
      survived: 0,
      died: 0,
      survivalRate: null,
      hasLabels: false,
      femaleCount: 0,
      maleCount: 0,
      avgAge: null,
      avgFare: null,
      missingAgeCount: 0
    };
  }

  // Check if dataset has labels (Survived !== null and Survived !== undefined)
  const labelledPassengers = passengers.filter(p => p.Survived !== null && p.Survived !== undefined);
  const hasLabels = labelledPassengers.length > 0;

  const survived = labelledPassengers.filter(p => p.Survived === 1).length;
  const died = labelledPassengers.filter(p => p.Survived === 0).length;
  const survivalRate = hasLabels && labelledPassengers.length > 0 ? (survived / labelledPassengers.length) * 100 : null;

  const femaleCount = passengers.filter(p => p.Sex === 'female').length;
  const maleCount = passengers.filter(p => p.Sex === 'male').length;

  const agesWithValues = passengers.filter(p => p.Age !== null && p.Age !== undefined).map(p => Number(p.Age));
  const avgAge = agesWithValues.length > 0 ? agesWithValues.reduce((a, b) => a + b, 0) / agesWithValues.length : null;
  const missingAgeCount = total - agesWithValues.length;

  const faresWithValues = passengers.filter(p => p.Fare !== null && p.Fare !== undefined).map(p => Number(p.Fare));
  const avgFare = faresWithValues.length > 0 ? faresWithValues.reduce((a, b) => a + b, 0) / faresWithValues.length : null;

  return {
    total,
    survived,
    died,
    survivalRate: survivalRate !== null ? Number(survivalRate.toFixed(1)) : null,
    hasLabels,
    femaleCount,
    maleCount,
    avgAge: avgAge !== null ? Number(avgAge.toFixed(1)) : null,
    avgFare: avgFare !== null ? Number(avgFare.toFixed(2)) : null,
    missingAgeCount
  };
}

export function computeSurvivalByGender(passengers = []) {
  const labelled = passengers.filter(p => p.Survived !== null && p.Survived !== undefined);
  if (labelled.length === 0) return [];

  const genders = ['female', 'male'];
  return genders.map(gender => {
    const subset = labelled.filter(p => p.Sex === gender);
    const total = subset.length;
    const survived = subset.filter(p => p.Survived === 1).length;
    const died = subset.filter(p => p.Survived === 0).length;
    const rate = total > 0 ? Number(((survived / total) * 100).toFixed(1)) : 0;

    return {
      gender: gender === 'female' ? 'Female' : 'Male',
      total,
      survived,
      died,
      rate
    };
  });
}

export function computeSurvivalByClass(passengers = []) {
  const labelled = passengers.filter(p => p.Survived !== null && p.Survived !== undefined);
  if (labelled.length === 0) return [];

  const classes = [1, 2, 3];
  const labels = { 1: '1st Class', 2: '2nd Class', 3: '3rd Class' };

  return classes.map(pclass => {
    const subset = labelled.filter(p => p.Pclass === pclass);
    const total = subset.length;
    const survived = subset.filter(p => p.Survived === 1).length;
    const died = subset.filter(p => p.Survived === 0).length;
    const rate = total > 0 ? Number(((survived / total) * 100).toFixed(1)) : 0;

    return {
      pclass: labels[pclass],
      classNum: pclass,
      total,
      survived,
      died,
      rate
    };
  });
}

export function computeAgeDistribution(passengers = []) {
  const bins = [
    { label: '0-9 (Child)', min: 0, max: 9, total: 0, survived: 0, died: 0 },
    { label: '10-19 (Teen)', min: 10, max: 19, total: 0, survived: 0, died: 0 },
    { label: '20-29', min: 20, max: 29, total: 0, survived: 0, died: 0 },
    { label: '30-39', min: 30, max: 39, total: 0, survived: 0, died: 0 },
    { label: '40-49', min: 40, max: 49, total: 0, survived: 0, died: 0 },
    { label: '50-59', min: 50, max: 59, total: 0, survived: 0, died: 0 },
    { label: '60+ (Senior)', min: 60, max: 150, total: 0, survived: 0, died: 0 },
    { label: 'Unknown', min: -1, max: -1, total: 0, survived: 0, died: 0 }
  ];

  passengers.forEach(p => {
    if (p.Age === null || p.Age === undefined) {
      bins[7].total++;
      if (p.Survived === 1) bins[7].survived++;
      if (p.Survived === 0) bins[7].died++;
    } else {
      const age = Number(p.Age);
      const bin = bins.slice(0, 7).find(b => age >= b.min && age <= b.max);
      if (bin) {
        bin.total++;
        if (p.Survived === 1) bin.survived++;
        if (p.Survived === 0) bin.died++;
      }
    }
  });

  return bins.map(b => ({
    ...b,
    rate: b.survived + b.died > 0 ? Number(((b.survived / (b.survived + b.died)) * 100).toFixed(1)) : null
  }));
}

export function computeFareDistribution(passengers = []) {
  const bins = [
    { range: '$0 - 10', min: 0, max: 10, count: 0 },
    { range: '$10 - 25', min: 10, max: 25, count: 0 },
    { range: '$25 - 50', min: 25, max: 50, count: 0 },
    { range: '$50 - 100', min: 50, max: 100, count: 0 },
    { range: '$100+', min: 100, max: 999999, count: 0 },
    { range: 'Unknown', min: -1, max: -1, count: 0 }
  ];

  passengers.forEach(p => {
    if (p.Fare === null || p.Fare === undefined) {
      bins[5].count++;
    } else {
      const fare = Number(p.Fare);
      const bin = bins.slice(0, 5).find(b => fare >= b.min && (b.max === 999999 ? fare >= b.min : fare < b.max));
      if (bin) bin.count++;
      else bins[4].count++;
    }
  });

  return bins;
}

export function computeEmbarkationStats(passengers = []) {
  const portNames = {
    'C': 'Cherbourg (FR)',
    'Q': 'Queenstown (IE)',
    'S': 'Southampton (UK)',
    'Unknown': 'Unrecorded'
  };

  const ports = ['S', 'C', 'Q', 'Unknown'];
  return ports.map(port => {
    const subset = passengers.filter(p => (port === 'Unknown' ? !p.Embarked : p.Embarked === port));
    const total = subset.length;
    const labelled = subset.filter(p => p.Survived !== null && p.Survived !== undefined);
    const survived = labelled.filter(p => p.Survived === 1).length;
    const died = labelled.filter(p => p.Survived === 0).length;
    const rate = labelled.length > 0 ? Number(((survived / labelled.length) * 100).toFixed(1)) : null;

    return {
      portCode: port,
      portName: portNames[port],
      total,
      survived,
      died,
      rate
    };
  });
}

export function computeFamilySizeStats(passengers = []) {
  const categories = [
    { label: 'Solo (1 person)', filter: p => (p.SibSp === 0 && p.Parch === 0) },
    { label: 'Small Family (2-4)', filter: p => {
      const size = (p.SibSp || 0) + (p.Parch || 0) + 1;
      return size >= 2 && size <= 4;
    }},
    { label: 'Large Family (5+)', filter: p => {
      const size = (p.SibSp || 0) + (p.Parch || 0) + 1;
      return size >= 5;
    }}
  ];

  return categories.map(cat => {
    const subset = passengers.filter(cat.filter);
    const total = subset.length;
    const labelled = subset.filter(p => p.Survived !== null && p.Survived !== undefined);
    const survived = labelled.filter(p => p.Survived === 1).length;
    const died = labelled.filter(p => p.Survived === 0).length;
    const rate = labelled.length > 0 ? Number(((survived / labelled.length) * 100).toFixed(1)) : null;

    return {
      category: cat.label,
      total,
      survived,
      died,
      rate
    };
  });
}

/**
 * Dynamically generate observational insights grounded in the active dataset
 */
export function generateDatasetInsights(passengers = []) {
  const insights = [];
  const labelled = passengers.filter(p => p.Survived !== null && p.Survived !== undefined);

  if (labelled.length === 0) {
    return [
      {
        title: 'Survival Labels Unavailable',
        type: 'warning',
        text: 'The active dataset contains unlabelled test records. Ground truth survival outcomes cannot be evaluated for this partition, preventing causal or rate comparisons.'
      }
    ];
  }

  // 1. Gender Disparity
  const females = labelled.filter(p => p.Sex === 'female');
  const males = labelled.filter(p => p.Sex === 'male');
  if (females.length > 5 && males.length > 5) {
    const fRate = (females.filter(p => p.Survived === 1).length / females.length) * 100;
    const mRate = (males.filter(p => p.Survived === 1).length / males.length) * 100;
    const diff = (fRate - mRate).toFixed(1);
    insights.push({
      title: 'Pronounced Gender Disparity',
      type: 'primary',
      text: `Within this selection, female passengers exhibited a ${fRate.toFixed(1)}% survival rate compared to ${mRate.toFixed(1)}% for males (+${diff}% differential), reflecting the historical "women and children first" maritime evacuation protocol.`
    });
  }

  // 2. Class Disparity (1st vs 3rd)
  const c1 = labelled.filter(p => p.Pclass === 1);
  const c3 = labelled.filter(p => p.Pclass === 3);
  if (c1.length > 5 && c3.length > 5) {
    const c1Rate = (c1.filter(p => p.Survived === 1).length / c1.length) * 100;
    const c3Rate = (c3.filter(p => p.Survived === 1).length / c3.length) * 100;
    const diff = (c1Rate - c3Rate).toFixed(1);
    insights.push({
      title: 'Socioeconomic Deck Access Gradient',
      type: 'teal',
      text: `First-class passengers achieved a ${c1Rate.toFixed(1)}% survival rate versus ${c3Rate.toFixed(1)}% in third-class (+${diff}% gap). Proximity of upper-deck cabins to the boat deck was a strong structural determinant.`
    });
  }

  // 3. Family Size Dynamics
  const smallFamilies = labelled.filter(p => {
    const size = (p.SibSp || 0) + (p.Parch || 0) + 1;
    return size >= 2 && size <= 4;
  });
  const solos = labelled.filter(p => (p.SibSp === 0 && p.Parch === 0));
  if (smallFamilies.length > 5 && solos.length > 5) {
    const sfRate = (smallFamilies.filter(p => p.Survived === 1).length / smallFamilies.length) * 100;
    const soloRate = (solos.filter(p => p.Survived === 1).length / solos.length) * 100;
    insights.push({
      title: 'Family Cohort Effect',
      type: 'slate',
      text: `Passengers traveling in small groups of 2-4 had a ${sfRate.toFixed(1)}% survival rate, exceeding solo passengers (${soloRate.toFixed(1)}%). Large groups of 5+, however, faced acute assembly and lifeboat coordination friction.`
    });
  }

  // 4. Embarkation Port Differential
  const cPort = labelled.filter(p => p.Embarked === 'C');
  const sPort = labelled.filter(p => p.Embarked === 'S');
  if (cPort.length > 5 && sPort.length > 5) {
    const cRate = (cPort.filter(p => p.Survived === 1).length / cPort.length) * 100;
    const sRate = (sPort.filter(p => p.Survived === 1).length / sPort.length) * 100;
    insights.push({
      title: 'Embarkation Port Distribution Effect',
      type: 'amber',
      text: `Cherbourg embarkees experienced a higher survival rate (${cRate.toFixed(1)}%) than Southampton (${sRate.toFixed(1)}%), largely confounding with a higher proportion of wealthy first-class ticket holders boarding in France.`
    });
  }

  return insights;
}
