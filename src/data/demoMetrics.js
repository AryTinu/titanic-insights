// Illustrative benchmark metrics for baseline classification models on Titanic dataset
// IMPORTANT: These metrics are documented benchmark values for demonstration and offline validation.
// They reflect an 80/20 stratified validation holdout of 179 samples from the 891 training records.

export const ML_MODELS = {
  logistic_regression: {
    id: 'logistic_regression',
    name: 'Logistic Regression',
    type: 'Linear Probabilistic Classifier',
    description: 'Standard generalized linear model applying a sigmoid link function. Provides high interpretability and probabilistic log-odds calibration for binary outcomes.',
    hyperparameters: {
      solver: 'lbfgs',
      regularization: 'L2 (Ridge)',
      C: 0.1,
      max_iter: 1000
    },
    metrics: {
      accuracy: 0.804,
      precision: 0.778,
      recall: 0.710,
      f1: 0.742,
      rocAuc: 0.854
    },
    confusionMatrix: {
      tn: 94, // True Negatives (actual died, predicted died)
      fp: 16, // False Positives (actual died, predicted survived)
      fn: 20, // False Negatives (actual survived, predicted died)
      tp: 49  // True Positives (actual survived, predicted survived)
    },
    rocCurve: [
      { fpr: 0.00, tpr: 0.00 },
      { fpr: 0.04, tpr: 0.28 },
      { fpr: 0.08, tpr: 0.52 },
      { fpr: 0.15, tpr: 0.72 },
      { fpr: 0.22, tpr: 0.81 },
      { fpr: 0.32, tpr: 0.88 },
      { fpr: 0.45, tpr: 0.92 },
      { fpr: 0.62, tpr: 0.96 },
      { fpr: 0.80, tpr: 0.99 },
      { fpr: 1.00, tpr: 1.00 }
    ],
    strengths: ['Highly interpretable coefficients', 'Fast inference', 'Well-calibrated probabilities'],
    limitations: ['Assumes linear decision boundary in logit space', 'Cannot capture complex non-linear feature interactions natively']
  },
  decision_tree: {
    id: 'decision_tree',
    name: 'Decision Tree (CART)',
    type: 'Non-parametric Rule-based Classifier',
    description: 'Hierarchical partitioning tree using Gini impurity splits. Mimics human decision logic (e.g., Sex == female -> Pclass <= 2) but is prone to variance.',
    hyperparameters: {
      criterion: 'gini',
      max_depth: 4,
      min_samples_split: 10,
      min_samples_leaf: 5
    },
    metrics: {
      accuracy: 0.816,
      precision: 0.814,
      recall: 0.696,
      f1: 0.750,
      rocAuc: 0.832
    },
    confusionMatrix: {
      tn: 98,
      fp: 12,
      fn: 21,
      tp: 48
    },
    rocCurve: [
      { fpr: 0.00, tpr: 0.00 },
      { fpr: 0.06, tpr: 0.44 },
      { fpr: 0.11, tpr: 0.68 },
      { fpr: 0.18, tpr: 0.76 },
      { fpr: 0.29, tpr: 0.84 },
      { fpr: 0.48, tpr: 0.90 },
      { fpr: 0.70, tpr: 0.95 },
      { fpr: 1.00, tpr: 1.00 }
    ],
    strengths: ['Natural non-linear split handling', 'No feature scaling required', 'Explicit decision paths'],
    limitations: ['Prone to overfitting on small datasets', 'Stepwise decision boundaries']
  },
  random_forest: {
    id: 'random_forest',
    name: 'Random Forest Classifier',
    type: 'Bagged Ensemble of Decision Trees',
    description: 'Ensemble of 100 de-correlated randomized decision trees using bootstrap aggregation and random feature subsets per split to minimize variance.',
    hyperparameters: {
      n_estimators: 100,
      max_depth: 6,
      criterion: 'entropy',
      min_samples_leaf: 3,
      random_state: 42
    },
    metrics: {
      accuracy: 0.844,
      precision: 0.839,
      recall: 0.754,
      f1: 0.794,
      rocAuc: 0.887
    },
    confusionMatrix: {
      tn: 99,
      fp: 11,
      fn: 17,
      tp: 52
    },
    rocCurve: [
      { fpr: 0.00, tpr: 0.00 },
      { fpr: 0.03, tpr: 0.38 },
      { fpr: 0.07, tpr: 0.62 },
      { fpr: 0.10, tpr: 0.78 },
      { fpr: 0.16, tpr: 0.87 },
      { fpr: 0.25, tpr: 0.92 },
      { fpr: 0.38, tpr: 0.96 },
      { fpr: 0.55, tpr: 0.98 },
      { fpr: 0.78, tpr: 0.99 },
      { fpr: 1.00, tpr: 1.00 }
    ],
    strengths: ['Superior generalization', 'Robust to outliers and noise', 'Computes feature importances naturally'],
    limitations: ['Computationally heavier than linear models', 'Less transparent than single tree']
  }
};

export const FEATURE_IMPORTANCE = [
  { feature: 'Sex (Female)', importance: 0.312, description: 'Highest predictive signal driven by "women & children first" evacuation order' },
  { feature: 'Ticket Fare (Log-scaled)', importance: 0.218, description: 'Continuous proxy for socioeconomic tier and boat deck access proximity' },
  { feature: 'Passenger Class (Pclass)', importance: 0.185, description: 'Berth proximity to boat deck (1st vs 2nd vs 3rd class)' },
  { feature: 'Passenger Age', importance: 0.134, description: 'Childhood priority vs elderly mobility vulnerability' },
  { feature: 'Family Size (SibSp + Parch)', importance: 0.089, description: 'Small families (2-4) had higher survival than solo or large families (5+)' },
  { feature: 'Port of Embarkation', importance: 0.062, description: 'Cherbourg had high 1st class ratio; Queenstown predominantly 3rd class' }
];

export const MODEL_EVALUATION_METHODOLOGY = {
  splitStrategy: '80% Train (712 samples) / 20% Stratified Validation Holdout (179 samples)',
  crossValidation: 'Stratified 5-Fold Cross Validation on Training Split',
  preprocessing: [
    { step: 'Imputation', detail: 'Median age by Pclass & Sex; Mode embarkation ("S"); Missing Fare imputed by class median' },
    { step: 'Categorical Encoding', detail: 'Binary mapping for Sex (0 = male, 1 = female); One-hot encoding for Embarked (C, Q, S)' },
    { step: 'Feature Scaling', detail: 'StandardScaler applied to Fare and Age for Logistic Regression; trees evaluated on unscaled features' },
    { step: 'Feature Engineering', detail: 'Extracted Title from Name; FamilySize = SibSp + Parch + 1; IsAlone binary indicator' }
  ],
  disclaimer: 'These metrics are curated historical academic benchmark statistics illustrating classical ML evaluation on Kaggle Titanic data. They represent simulated demo evaluation independent of frontend passenger slice filters.'
};
