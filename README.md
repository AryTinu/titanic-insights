<<<<<<< HEAD
# Titanic Insights — Survival Prediction & Passenger Analytics

A modern, SaaS-inspired machine learning exploratory analytics and survival prediction dashboard built as a college-level academic mini-project.

![Titanic Insights Dashboard](https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Project Overview

**Problem Statement:**  
Analyze Titanic passenger manifest data to identify key socio-demographic survival correlates and demonstrate a complete machine learning classification workflow within an interactive Business Intelligence (BI) interface.

**Key Objectives:**
- Conduct exploratory data analysis (EDA) across age, fares, cabins, classes, and embarkation ports.
- Quantify empirical survival disparities (gender, socioeconomic class, family unit sizes).
- Benchmark classical machine learning algorithms (Logistic Regression, Decision Trees, Random Forest).
- Build a responsive, interactive analytics platform with multi-dataset switching and scenario simulation.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (Custom dark navy, slate, teal, and muted coral palette)
- **Data Visualizations:** Recharts (Donut charts, grouped bars, area distributions, ROC curves, feature importances)
- **Icons:** Lucide React
- **Architecture:** Client-side reactive virtual DOM with centralized `DatasetContext`
- **Data Engine:** Local deterministic datasets (891 training records + 418 test holdout records)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup & Run Instructions

1. **Clone or navigate to the project directory:**
   ```bash
   cd C:\Users\91983\.gemini\antigravity\scratch\titanic-insights
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and visit: `http://localhost:5173` (or the URL displayed in your terminal).

5. **Create a production build:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧭 Application Modules

### 1. Overview Dashboard
- Executive KPI summary cards (Total Passengers, Confirmed Survivors, Casualties, Overall Survival Rate).
- Survival outcome donut chart with center rate badge.
- Gender survival bar chart highlighting the historical "women and children first" maritime evacuation protocol.
- Passenger class survival gradient (1st Class vs 2nd Class vs 3rd Class).
- Binned age demographic histogram with missing-value handling.
- Ticket fare distribution area chart.
- Embarkation port and gender proportion breakdowns.

### 2. Dataset Explorer
- Searchable and multi-filter passenger data table.
- Filter by Gender, Passenger Class, Historical Status, and Age Demographics.
- Sortable columns (Passenger ID, Name, Age, Class, Fare, Survival).
- Configurable pagination (10, 25, 50, 100 rows per page).
- Passenger Dossier modal drawer on row click with detailed demographic breakdown.
- Client-side CSV export of filtered data slices.

### 3. Survival Analysis
- Bivariate disparity analysis comparing survival across demographic segments.
- Dynamically generated insight cards computed directly from active records.
- 1st Class vs 3rd Class deck access differential.
- Female vs Male survival likelihood progression bars.
- Port of embarkation and traveling family size (solo vs small family vs large group) survival charts.
- Clear observational disclaimer avoiding false causal assertions.

### 4. Model Performance
- Standardized classification evaluation across 3 baseline models:
  - **Logistic Regression** (L2 Regularized Linear Classifier)
  - **Decision Tree** (CART Gini Impurity Partitioner)
  - **Random Forest** (100-Tree Bagged Ensemble)
- Comparative grouped metrics chart (Accuracy, Precision, Recall, F1-Score, ROC-AUC).
- 2x2 Confusion Matrix heatmap with Type I / Type II error classification.
- Receiver Operating Characteristic (ROC) curve with random diagonal baseline.
- Random Forest Gini feature importance ranking.
- Complete ML methodology panel detailing 80/20 train/holdout splits and preprocessing.
- Fixed benchmark invariance: Global validation holdout metrics remain independent of passenger filter slices.

### 5. Passenger Prediction (Heuristic Simulation)
- Interactive passenger survival sandbox.
- Configurable attributes: Sex, Age, Class, Fare, SibSp, Parch, Embarkation Port.
- One-click archetype presets (e.g. *1st Class Woman*, *Child with Family*, *3rd Class Male*, *Steerage Family*).
- Deterministic heuristic survival probability output and confidence gauge.
- Transparent attribution breakdown showing positive and negative contributing factors.
- Explicit academic notice: *"Educational simulation only — not a trained predictive model."*

### 6. About Project
- Formal academic documentation including problem statement, core objectives, 7-stage ML pipeline flowchart, technology stack, and architectural limitations.

---

## 🔄 Dataset Switching Feature

The application provides a top navigation dataset selector that dynamically swaps the underlying data:

1. **Titanic Training Dataset (891 rows):** Full historical training partition with actual ground-truth survival labels.
2. **Titanic Test Dataset (418 rows):** Competition test split with unreleased ground truth (`Survived: null`). Simulated predictions are displayed with clear notices.
3. **First-Class Passengers (216 rows):** Filtered cohort of luxury upper-deck travelers.
4. **Female Passengers (314 rows):** Demographic slice of women aboard.
5. **Male Passengers (577 rows):** Demographic slice of men aboard.
6. **Family Travellers (307 rows):** Passengers traveling with siblings, spouses, parents, or children.

When switching datasets, all cards, charts, insights, and table rows update reactively, backed by toast notifications.

---

## ⚠️ Academic Demonstration Boundaries & Limitations

- **Frontend-Only Demonstration:** This application does not connect to a Python backend, Flask API, or live database. All data operations occur inside the React virtual DOM.
- **Simulated Inference:** The passenger prediction simulator utilizes a transparent deterministic logistic heuristic based on documented historical weights, not a live PyTorch/Scikit-learn model server.
- **Unlabelled Test Partition:** In accordance with the Kaggle competition specification, the 418 test passenger records omit true survival outcomes to demonstrate unlabelled evaluation workflows.
- **Metric Invariance:** The Model Performance benchmark metrics reflect standardized offline cross-validation results and do not dynamically alter when filtering passenger demographic slices.
=======
# titanic-insights
Using Machine learning algorithm on the famous Titanic Disaster Dataset for Predicting the survival of the passenger.
>>>>>>> 16531f4a7dc3a41b076fd4032e562f2ef85c9908
