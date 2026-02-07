import { differenceInYears } from 'date-fns';
import { format } from 'date-fns';
import { loShuInterpretations } from '../constants/numerologyInterpretations';

export const calculateAge = (dob) => {
  if (!dob || !(dob instanceof Date) || isNaN(dob)) return null;
  return differenceInYears(new Date(), dob);
};

export const reduceToOneDigit = (num) => {
  let sum = num;
  while (sum > 9) {
    sum = String(sum).split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  }
  return sum;
};

export const calculateDriverNumber = (dob) => {
  if (!dob || !(dob instanceof Date) || isNaN(dob)) return null;
  return reduceToOneDigit(dob.getDate());
};

export const calculateConductorNumber = (dob) => {
  if (!dob || !(dob instanceof Date) || isNaN(dob)) return null;
  const day = reduceToOneDigit(dob.getDate());
  const month = reduceToOneDigit(dob.getMonth() + 1);
  const year = reduceToOneDigit(String(dob.getFullYear()).split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0));
  return reduceToOneDigit(day + month + year);
};

export const calculateSDT = (numberStr) => {
  if (!numberStr || typeof numberStr !== 'string') return 0;
  const total = numberStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return reduceToOneDigit(total);
};

export const formatWithSDT = (numberStr) => {
    if (!numberStr) return "";
    const total = numberStr.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    return `${total}/${reduceToOneDigit(total)}`;
};

/**
 * UPDATED FUNCTION: Now accepts driver and conductor to include in the grid calculation.
 */
export const getLoShuGridAnalysis = (dob, driverNumber, conductorNumber) => {
  const grid = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  if (!dob || !(dob instanceof Date) || isNaN(dob)) {
    return { grid, missing: Object.keys(grid), repeating: [], score: 0, analysisText: "Invalid Date of Birth." };
  }

  // Combine digits from DOB string, Driver Number, and Conductor Number
  let fullNumberString = format(dob, 'ddMMyyyy');
  if (driverNumber) fullNumberString += String(driverNumber);
  if (conductorNumber) fullNumberString += String(conductorNumber);

  // Process the combined string to populate the grid
  fullNumberString.split('').forEach(digit => {
    if (digit !== '0' && grid.hasOwnProperty(digit)) {
      grid[digit]++;
    }
  });

  const missing = Object.keys(grid).filter(num => grid[num] === 0);
  const repeating = Object.keys(grid).filter(num => grid[num] > 1).map(num => ({ num, count: grid[num] }));
  let score = 100 - (missing.length * 10);
  repeating.forEach(item => { score -= (item.count - 1) * 5; });
  
  return { grid, missing, repeating, score: Math.max(0, score) };
};