/**
 * Deterministic local heuristic prediction model for Titanic survival
 * NOTE: Educational simulation only — not a trained predictive model.
 */

export function calculateSurvivalHeuristic(inputs) {
  const {
    sex,
    age,
    pclass,
    fare,
    sibSp,
    parch,
    embarked
  } = inputs;

  let logit = -0.65; // Base intercept representing overall ~38% baseline survival log-odds
  const factors = [];

  // 1. Gender Impact (Strongest historical factor: "women & children first")
  if (sex === 'female') {
    logit += 2.45;
    factors.push({
      feature: 'Gender (Female)',
      effect: 'positive',
      impact: '+42%',
      detail: 'Adherence to maritime evacuation prioritizing female passengers.'
    });
  } else {
    logit -= 1.65;
    factors.push({
      feature: 'Gender (Male)',
      effect: 'negative',
      impact: '-35%',
      detail: 'Male passengers faced stern restrictions accessing lifeboats until women boarded.'
    });
  }

  // 2. Passenger Class Impact
  const classNum = Number(pclass);
  if (classNum === 1) {
    logit += 1.40;
    factors.push({
      feature: '1st Class Ticket',
      effect: 'positive',
      impact: '+24%',
      detail: 'Immediate boat deck access and higher proportion of assigned lifeboat seats.'
    });
  } else if (classNum === 2) {
    logit += 0.25;
    factors.push({
      feature: '2nd Class Ticket',
      effect: 'neutral',
      impact: '+5%',
      detail: 'Moderate proximity to upper decks; moderate survival rate.'
    });
  } else {
    logit -= 1.10;
    factors.push({
      feature: '3rd Class Ticket',
      effect: 'negative',
      impact: '-20%',
      detail: 'Lower deck compartments with gates and complex passageway layouts to boat decks.'
    });
  }

  // 3. Age Impact
  const numAge = Number(age);
  if (!isNaN(numAge)) {
    if (numAge < 10) {
      logit += 1.55;
      factors.push({
        feature: 'Young Child (< 10 yrs)',
        effect: 'positive',
        impact: '+28%',
        detail: 'Direct prioritization by crew during emergency lifeboat loading.'
      });
    } else if (numAge < 18) {
      logit += 0.45;
      factors.push({
        feature: 'Youth / Teenager (10-17 yrs)',
        effect: 'positive',
        impact: '+8%',
        detail: 'Moderate rescue prioritization.'
      });
    } else if (numAge >= 60) {
      logit -= 0.85;
      factors.push({
        feature: 'Senior Passenger (60+ yrs)',
        effect: 'negative',
        impact: '-15%',
        detail: 'Mobility limitations during sudden flooding and steep stair evacuations.'
      });
    }
  }

  // 4. Family Dynamics (SibSp + Parch)
  const familySize = Number(sibSp || 0) + Number(parch || 0) + 1;
  if (familySize === 1) {
    // Traveling alone
    logit -= 0.25;
    factors.push({
      feature: 'Solo Traveler',
      effect: 'negative',
      impact: '-5%',
      detail: 'Lacked group support or companion notification, lowering survival slightly.'
    });
  } else if (familySize >= 2 && familySize <= 4) {
    logit += 0.65;
    factors.push({
      feature: 'Small Family Unit (2-4)',
      effect: 'positive',
      impact: '+12%',
      detail: 'Optimal cohesion: mutual assistance without severe group fragmentation.'
    });
  } else {
    logit -= 1.20;
    factors.push({
      feature: `Large Family Unit (${familySize} people)`,
      effect: 'negative',
      impact: '-22%',
      detail: 'Severe coordination difficulty gathering everyone amidst panic and crowded stairwells.'
    });
  }

  // 5. Fare Continuous Factor
  const numFare = Number(fare);
  if (!isNaN(numFare)) {
    if (numFare >= 75) {
      logit += 0.45;
      factors.push({
        feature: `Premium Fare ($${numFare.toFixed(2)})`,
        effect: 'positive',
        impact: '+8%',
        detail: 'Correlated with premium staterooms located directly beneath the boat deck.'
      });
    } else if (numFare < 12) {
      logit -= 0.35;
      factors.push({
        feature: `Low-cost Fare ($${numFare.toFixed(2)})`,
        effect: 'negative',
        impact: '-6%',
        detail: 'Typical steerage accommodation with restricted deck egress.'
      });
    }
  }

  // 6. Embarkation Port
  if (embarked === 'C') {
    logit += 0.35;
    factors.push({
      feature: 'Embarked: Cherbourg',
      effect: 'positive',
      impact: '+6%',
      detail: 'Historical proxy for wealthy continental passengers with higher survival probability.'
    });
  }

  // Calculate sigmoid probability
  const probability = 1 / (1 + Math.exp(-logit));
  const roundedProb = Math.min(0.98, Math.max(0.02, Number(probability.toFixed(3))));
  const isSurviving = roundedProb >= 0.5;

  let riskTier = 'Moderate Survival Likelihood';
  let badgeColor = 'amber';
  if (roundedProb >= 0.70) {
    riskTier = 'High Survival Likelihood';
    badgeColor = 'teal';
  } else if (roundedProb <= 0.35) {
    riskTier = 'Low Survival Likelihood';
    badgeColor = 'rose';
  }

  return {
    survived: isSurviving,
    probability: roundedProb,
    percentage: Math.round(roundedProb * 100),
    riskTier,
    badgeColor,
    factors,
    simulationNotice: 'Educational simulation only — not a trained predictive model.'
  };
}
