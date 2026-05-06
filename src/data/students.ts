
export interface StudentGrade {
  code: string;
  name: string;
  scores: number[];
  average: number;
}

export interface StudentData {
  no: number;
  name: string;
  kelas: string;
  nisn: string;
  subjects: StudentGrade[];
  totalAverage: number;
}

const parseNum = (val: string): number => {
  if (!val) return 0;
  // Replace comma with dot for decimal parsing
  const cleaned = val.replace(',', '.').trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

// Import parts of raw data to stay within token limits
import { rawData_A_B_C } from './rawData_A_B_C';
import { rawData_D_E_F } from './rawData_D_E_F';
import { rawData_G_H } from './rawData_G_H';
import { rawData_I_J } from './rawData_I_J';

const rawData = [rawData_A_B_C, rawData_D_E_F, rawData_G_H, rawData_I_J].join('\n');

export const students: StudentData[] = rawData.split('\n')
  .filter(line => line.trim().length > 0 && !line.startsWith('NO'))
  .map(line => {
    let cols: string[];
    if (line.includes('\t')) {
      cols = line.split('\t');
    } else {
      // Split CSV but handle quoted commas in decimals
      // Pattern: replace "91,2" with 91.2
      const processedLine = line.replace(/"(\d+),(\d+)"/g, '$1.$2');
      cols = processedLine.split(',');
    }
    
    // Ensure we have enough columns
    if (cols.length < 47) {
      console.warn(`Line with insufficient columns: ${line.substring(0, 30)}...`);
      return null;
    }
  
  const subjects = [
    { code: "PAI", name: "Pendidikan Agama", start: 4 },
    { code: "PPKN", name: "PPKn", start: 10 },
    { code: "BIN", name: "Bahasa Indonesia", start: 16 },
    { code: "BING", name: "Bahasa Inggris", start: 22 },
    { code: "MAT", name: "Matematika", start: 28 },
    { code: "IPA", name: "IPA", start: 34 },
    { code: "IPS", name: "IPS", start: 40 }
  ].map(s => ({
    code: s.code,
    name: s.name,
    scores: [
      parseNum(cols[s.start]),
      parseNum(cols[s.start+1]),
      parseNum(cols[s.start+2]),
      parseNum(cols[s.start+3]),
      parseNum(cols[s.start+4])
    ],
    average: parseNum(cols[s.start+5])
  }));

  return {
    no: parseInt(cols[0]),
    name: cols[1],
    kelas: cols[2],
    nisn: cols[3],
    subjects: subjects,
    totalAverage: parseNum(cols[46])
  };
}).filter((s): s is StudentData => s !== null);

export const findStudent = (loginName: string, nisn: string): StudentData | undefined => {
  return students.find(s => {
    // Exact NISN match
    if (s.nisn !== nisn) return false;
    
    // Name match: check if first 2 words match or contains
    const dbName = s.name.toLowerCase();
    const inputName = loginName.toLowerCase().trim();
    
    // Exact match
    if (dbName === inputName) return true;
    
    // First 2 words match
    const dbWords = dbName.split(' ');
    const firstTwoDb = dbWords.slice(0, 2).join(' ');
    
    return firstTwoDb === inputName || dbName.startsWith(inputName);
  });
};
