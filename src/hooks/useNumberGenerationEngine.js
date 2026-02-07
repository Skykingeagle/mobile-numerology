import { useState } from 'react';
import { calculateDriverNumber, calculateConductorNumber, calculateSDT } from '../utils/helpers';
import { useAnalysisEngine } from './useAnalysisEngine';
import { getLoShuGridAnalysis } from '../utils/helpers';

const DISFAVORED_NUMBERS = ['0', '2', '4', '7', '8'];

export const useNumberGenerationEngine = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedNumbers, setGeneratedNumbers] = useState([]);
    const { analysisEngine } = useAnalysisEngine();

    const generationEngine = (criteria, dob) => {
        setIsGenerating(true);
        setGeneratedNumbers([]);

        const driver = calculateDriverNumber(dob);
        const conductor = calculateConductorNumber(dob);
        const { fixedDigits, sdt, last4sdt } = criteria;

        // UPDATED FUNCTION CALL: Get missing numbers from the complete Lo Shu grid
        const { missing: missingNumbers } = getLoShuGridAnalysis(dob, driver, conductor);
        const missingNumbersAsStrings = missingNumbers.map(n => String(n));

        setTimeout(() => {
            const results = [];
            const template = fixedDigits.map(d => d === '' ? null : d);
            const emptyIndices = template.map((d, i) => d === null ? i : -1).filter(i => i !== -1);
            
            const maxAttempts = 50000;
            let attempts = 0;
            const uniqueNumbers = new Set();

            while (attempts < maxAttempts && results.length < 200) {
                let newNumberArr = [...template];
                emptyIndices.forEach(i => {
                    const shouldUseMissing = Math.random() < 0.7 && missingNumbersAsStrings.length > 0;
                    if (shouldUseMissing) {
                        const randomIndex = Math.floor(Math.random() * missingNumbersAsStrings.length);
                        newNumberArr[i] = missingNumbersAsStrings[randomIndex];
                    } else {
                        newNumberArr[i] = String(Math.floor(Math.random() * 10));
                    }
                });
                const newNumber = newNumberArr.join('');

                if (uniqueNumbers.has(newNumber)) { attempts++; continue; }
                if (sdt && calculateSDT(newNumber) !== parseInt(sdt, 10)) { attempts++; continue; }
                if (last4sdt && calculateSDT(newNumber.substring(6)) !== parseInt(last4sdt, 10)) { attempts++; continue; }
                const disfavoredCount = newNumber.split('').filter(d => DISFAVORED_NUMBERS.includes(d)).length;
                if (disfavoredCount > 2) { attempts++; continue; }

                const analysis = analysisEngine(newNumber, dob);
                if (analysis && analysis.strength >= 50) {
                    uniqueNumbers.add(newNumber);
                    results.push(analysis);
                }
                attempts++;
            }
            
            results.sort((a, b) => b.strength - a.strength);
            setGeneratedNumbers(results.length > 0 ? results : [{ noResults: true }]);
            setIsGenerating(false);
        }, 500);
    };

    return { generatedNumbers, isGenerating, generationEngine };
};