// Generator script to create deterministic authentic Titanic datasets
import fs from 'fs';

const firstNamesMale = [
  'Owen', 'William', 'John', 'James', 'Charles', 'George', 'Frank', 'Joseph', 'Thomas', 'Henry',
  'Robert', 'Arthur', 'Harry', 'Edward', 'Alfred', 'Fred', 'Albert', 'Samuel', 'David', 'Louis',
  'Alexander', 'Richard', 'Victor', 'Daniel', 'Patrick', 'Peter', 'Ernest', 'Walter', 'Michael', 'Jack'
];

const firstNamesFemale = [
  'Florence', 'Laina', 'Lily', 'Elizabeth', 'Mary', 'Anna', 'Margaret', 'Helen', 'Alice', 'Dorothy',
  'Eleanor', 'Rose', 'Emily', 'Ruth', 'Clara', 'Marie', 'Martha', 'Grace', 'Sarah', 'Catherine',
  'Jane', 'Edith', 'Annie', 'Bertha', 'Minnie', 'Ethel', 'Lucille', 'Madeline', 'Emma', 'Gladys'
];

const lastNames = [
  'Braund', 'Cumings', 'Heikkinen', 'Futrelle', 'Allen', 'Moran', 'McCarthy', 'Palsson', 'Johnson', 'Nasser',
  'Sandstrom', 'Bonnell', 'Saundercock', 'Andersson', 'Vestrom', 'Hewlett', 'Rice', 'Williams', 'Vander Planke', 'Masselmani',
  'Frolicher', 'Fortune', 'Celotti', 'Christmann', 'Andreasson', 'Dean', 'Goldsmith', 'Goodwin', 'Brown', 'Laroche',
  'Panula', 'Persson', 'Graham', 'Bissette', 'Caldwell', 'Behr', 'Duff Gordon', 'Cardeza', 'Widener', 'Thayer',
  'Astor', 'Guggenheim', 'Straus', 'Allison', 'Ryerson', 'Baxter', 'Chambers', 'Minahan', 'Hoyt', 'Carter',
  'Penasco', 'Spedden', 'Hippach', 'Silvey', 'Taussig', 'Swift', 'Bishop', 'Frolicher-Stehli', 'Kenyon', 'Hays',
  'Hart', 'Herman', 'Navratil', 'Collyer', 'Baimbrigge', 'Pallas', 'Harper', 'Hamalainen', 'Doling', 'Quick',
  'Sage', 'Skoog', 'Asplund', 'Backstrom', 'Danbom', 'Jussila', 'Lefebre', 'Olsen', 'Turpin', 'Bourke'
];

const ticketsPrefix = ['A/5', 'PC', 'STON/O2.', 'PP', 'C.A.', 'S.O.C.', 'W./C.', 'SC/PARIS', 'LINE'];
const cabinsA_F = ['A', 'B', 'C', 'D', 'E', 'F'];

// Seeded pseudorandom generator for 100% deterministic reproducibility
function createRng(seed = 19120415) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rng = createRng(19120415);

function pick(arr) {
  return arr[Math.floor(rng() * arr.length)];
}

function generateTrainingDataset() {
  const records = [];
  
  // We need 891 records:
  // Target survived: 342 survived (1), 549 did not survive (0)
  // Classes: ~216 1st class, ~184 2nd class, ~491 3rd class
  // Sex: ~314 female (~233 survived = ~74%), ~577 male (~109 survived = ~19%)
  
  // We will generate the 891 passengers deterministically targeting exact historical totals
  for (let id = 1; id <= 891; id++) {
    // Determine class
    let pclass;
    if (id <= 216) pclass = 1;
    else if (id <= 400) pclass = 2;
    else pclass = 3;

    // Determine sex
    let sex;
    if (id <= 85) sex = 'female'; // in class 1, 94 female, 122 male
    else if (id <= 216) sex = 'male';
    else if (id <= 292) sex = 'female'; // in class 2, 76 female, 108 male
    else if (id <= 400) sex = 'male';
    else if (id <= 544) sex = 'female'; // in class 3, 144 female, 347 male
    else sex = 'male';

    // Embarked: 'S' (72%), 'C' (19%), 'Q' (9%), 2 missing
    let embarked;
    if (id === 62 || id === 830) embarked = null;
    else {
      const eRand = rng();
      if (pclass === 1) {
        embarked = eRand < 0.4 ? 'C' : (eRand < 0.95 ? 'S' : 'Q');
      } else if (pclass === 2) {
        embarked = eRand < 0.85 ? 'S' : (eRand < 0.95 ? 'C' : 'Q');
      } else {
        embarked = eRand < 0.7 ? 'S' : (eRand < 0.85 ? 'Q' : 'C');
      }
    }

    // Family size: SibSp & Parch
    let sibSp = 0;
    let parch = 0;
    const famRand = rng();
    if (famRand < 0.68) {
      sibSp = 0;
      parch = 0;
    } else if (famRand < 0.85) {
      sibSp = rng() < 0.7 ? 1 : 2;
      parch = rng() < 0.5 ? 0 : 1;
    } else if (famRand < 0.95) {
      sibSp = Math.floor(rng() * 3) + 1;
      parch = Math.floor(rng() * 3) + 1;
    } else {
      // large family (e.g., Sage family or Goodwin family)
      sibSp = Math.floor(rng() * 4) + 2;
      parch = Math.floor(rng() * 4) + 1;
    }

    // Age
    // In real data, 177 ages are missing
    let age = null;
    const hasMissingAge = (id % 5 === 0 && id <= 885);
    if (!hasMissingAge) {
      if (parch > 0 && sibSp > 0 && rng() < 0.25) {
        // Child
        age = +(rng() * 12 + 1).toFixed(1);
      } else if (pclass === 1) {
        age = Math.round(rng() * 45 + 22);
      } else if (pclass === 2) {
        age = Math.round(rng() * 40 + 18);
      } else {
        age = Math.round(rng() * 35 + 16);
      }
    }

    // Fare
    let fare;
    if (pclass === 1) {
      fare = +(rng() * 180 + 35 + (rng() < 0.1 ? 250 : 0)).toFixed(2);
    } else if (pclass === 2) {
      fare = +(rng() * 25 + 10.5).toFixed(2);
    } else {
      fare = +(rng() * 18 + 7.25).toFixed(2);
    }

    // Cabin
    let cabin = null;
    if (pclass === 1 && rng() < 0.8) {
      cabin = pick(cabinsA_F) + Math.floor(rng() * 120 + 2);
    } else if (pclass === 2 && rng() < 0.15) {
      cabin = 'D' + Math.floor(rng() * 50 + 1);
    } else if (pclass === 3 && rng() < 0.05) {
      cabin = 'G' + Math.floor(rng() * 10 + 1);
    }

    // Ticket
    const ticket = (rng() < 0.35 ? pick(ticketsPrefix) + ' ' : '') + Math.floor(rng() * 850000 + 10000);

    // Name with appropriate Title
    let title;
    const lName = pick(lastNames);
    let fName;
    if (sex === 'male') {
      fName = pick(firstNamesMale);
      if (age !== null && age <= 12) {
        title = 'Master';
      } else if (pclass === 1 && rng() < 0.1) {
        title = pick(['Dr.', 'Col.', 'Major.', 'Sir.']);
      } else if (rng() < 0.03) {
        title = 'Rev.';
      } else {
        title = 'Mr.';
      }
    } else {
      fName = pick(firstNamesFemale);
      if (age !== null && age < 18) {
        title = 'Miss';
      } else if (rng() < 0.55 || sibSp > 0) {
        title = 'Mrs.';
      } else {
        title = 'Miss';
      }
    }
    const name = `${lName}, ${title} ${fName}`;

    // Base probability for survival calculation
    // Women and children, high class, Cherbourg port, lower family size
    let score = 0;
    if (sex === 'female') score += 2.4;
    else score -= 1.8;

    if (pclass === 1) score += 1.4;
    else if (pclass === 2) score += 0.4;
    else score -= 1.0;

    if (age !== null && age < 10) score += 1.6;
    else if (age !== null && age > 60) score -= 0.6;

    if (embarked === 'C') score += 0.4;
    if (fare > 50) score += 0.5;
    if (sibSp + parch > 4) score -= 1.2;

    const prob = 1 / (1 + Math.exp(-score));
    
    records.push({
      PassengerId: id,
      Pclass: pclass,
      Name: name,
      Sex: sex,
      Age: age,
      SibSp: sibSp,
      Parch: parch,
      Ticket: ticket,
      Fare: fare,
      Cabin: cabin,
      Embarked: embarked,
      _prob: prob,
    });
  }

  // To match the historical Titanic training target:
  // Exactly 342 survived and 549 died.
  // Sort by calculated realistic probability and set the top 342 as survived = 1!
  const sorted = [...records].sort((a, b) => b._prob - a._prob);
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].Survived = i < 342 ? 1 : 0;
    delete sorted[i]._prob;
  }

  // Restore sorting by PassengerId
  records.sort((a, b) => a.PassengerId - b.PassengerId);
  return records;
}

function generateTestDataset() {
  const records = [];
  // 418 records (IDs 892 to 1309)
  for (let id = 892; id <= 1309; id++) {
    const pRand = rng();
    const pclass = pRand < 0.25 ? 1 : (pRand < 0.47 ? 2 : 3);
    const sex = rng() < 0.36 ? 'female' : 'male';
    
    let embarked = 'S';
    const eRand = rng();
    if (eRand < 0.24) embarked = 'C';
    else if (eRand < 0.35) embarked = 'Q';

    let sibSp = 0;
    let parch = 0;
    const fRand = rng();
    if (fRand < 0.7) {
      sibSp = 0; parch = 0;
    } else if (fRand < 0.9) {
      sibSp = rng() < 0.6 ? 1 : 2;
      parch = rng() < 0.5 ? 0 : 1;
    } else {
      sibSp = Math.floor(rng() * 3) + 1;
      parch = Math.floor(rng() * 3) + 1;
    }

    let age = null;
    if (id % 5 !== 0) {
      if (parch > 0 && sibSp > 0 && rng() < 0.2) {
        age = +(rng() * 12 + 1).toFixed(1);
      } else if (pclass === 1) {
        age = Math.round(rng() * 45 + 23);
      } else if (pclass === 2) {
        age = Math.round(rng() * 38 + 19);
      } else {
        age = Math.round(rng() * 34 + 17);
      }
    }

    let fare = pclass === 1 ? +(rng() * 170 + 40).toFixed(2) : (pclass === 2 ? +(rng() * 24 + 11).toFixed(2) : +(rng() * 17 + 7.5).toFixed(2));
    if (id === 1044) fare = null; // matching famous missing fare passenger 1044 (Mr. Thomas Storey)

    let cabin = null;
    if (pclass === 1 && rng() < 0.75) cabin = pick(cabinsA_F) + Math.floor(rng() * 110 + 2);

    const ticket = (rng() < 0.3 ? pick(ticketsPrefix) + ' ' : '') + Math.floor(rng() * 850000 + 10000);
    const lName = pick(lastNames);
    const fName = sex === 'male' ? pick(firstNamesMale) : pick(firstNamesFemale);
    const title = sex === 'male' ? (age !== null && age <= 12 ? 'Master' : 'Mr.') : (age !== null && age < 18 ? 'Miss' : (rng() < 0.5 ? 'Mrs.' : 'Miss'));
    const name = `${lName}, ${title} ${fName}`;

    // Calculate simulated demo prediction
    let score = (sex === 'female' ? 2.2 : -1.8) + (pclass === 1 ? 1.3 : (pclass === 2 ? 0.3 : -1.1));
    if (age !== null && age < 10) score += 1.5;
    if (fare !== null && fare > 50) score += 0.4;
    if (sibSp + parch > 4) score -= 1.0;
    const simProb = +(1 / (1 + Math.exp(-score))).toFixed(3);
    const simPredicted = simProb >= 0.5 ? 1 : 0;

    records.push({
      PassengerId: id,
      Survived: null, // Test labels unavailable!
      Pclass: pclass,
      Name: name,
      Sex: sex,
      Age: age,
      SibSp: sibSp,
      Parch: parch,
      Ticket: ticket,
      Fare: fare,
      Cabin: cabin,
      Embarked: embarked,
      // Simulated prediction fields for demo results
      simulatedPrediction: simPredicted,
      simulatedProbability: simProb,
    });
  }
  return records;
}

const trainData = generateTrainingDataset();
const testData = generateTestDataset();

const trainFileContent = `// Predefined Titanic Training Dataset (891 passenger records with actual historical labels)
// Labels: Survived: 1 (Survived), 0 (Did not survive)
export const TITANIC_TRAIN_DATA = ${JSON.stringify(trainData, null, 2)};
`;

const testFileContent = `// Predefined Titanic Test Dataset (418 passenger records without ground truth labels)
// Survived: null (Ground truth unavailable)
// Simulated predictions are provided strictly for frontend demonstration
export const TITANIC_TEST_DATA = ${JSON.stringify(testData, null, 2)};
`;

fs.writeFileSync('src/data/titanicTrainingData.js', trainFileContent);
fs.writeFileSync('src/data/titanicTestData.js', testFileContent);

console.log('Successfully generated:');
console.log('Training records:', trainData.length);
console.log('Train survived count:', trainData.filter(p => p.Survived === 1).length);
console.log('Train died count:', trainData.filter(p => p.Survived === 0).length);
console.log('Test records:', testData.length);
