/**
 * Generates and downloads a CSV file from passenger records
 */
export function exportPassengersToCSV(passengers = [], filename = 'titanic_passengers_export.csv') {
  if (!passengers || passengers.length === 0) return 0;

  const headers = [
    'PassengerId',
    'Survived',
    'Pclass',
    'Name',
    'Sex',
    'Age',
    'SibSp',
    'Parch',
    'Ticket',
    'Fare',
    'Cabin',
    'Embarked'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = passengers.map(p => {
    return [
      p.PassengerId,
      p.Survived !== null && p.Survived !== undefined ? p.Survived : 'N/A',
      p.Pclass,
      escapeCSV(p.Name),
      p.Sex,
      p.Age !== null ? p.Age : '',
      p.SibSp,
      p.Parch,
      escapeCSV(p.Ticket),
      p.Fare !== null ? p.Fare : '',
      escapeCSV(p.Cabin || ''),
      p.Embarked || ''
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return passengers.length;
}
