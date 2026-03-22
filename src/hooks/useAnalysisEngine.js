import { useState } from 'react';
import {
    placementTable,
    pairHarmony,
    placementPositionScores,
    pairPositionScores,
    numberRelationships,
    maxPlacementScore,
    maxPairScore
} from '../constants/numerologyTables';
import { getLoShuInterpretation, placementInterpretation, pairHarmonyRatingInterpretations } from '../constants/numerologyInterpretations';
import { calculateAge, calculateDriverNumber, calculateConductorNumber, getLoShuGridAnalysis, calculateSDT, formatWithSDT } from '../utils/helpers';

export const useAnalysisEngine = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analysisEngine = (mobileNumber, dob) => {
        if (!mobileNumber || mobileNumber.length !== 10) return null;
        setIsAnalyzing(true);
        
        const driverNumber = calculateDriverNumber(dob);
        const conductorNumber = calculateConductorNumber(dob);
        const numberSDT = calculateSDT(mobileNumber);
        const last4SDT = calculateSDT(mobileNumber.substring(6));

        // 1. Placement Score Calculation
        let placementScore = 0;
        const placementDetails = mobileNumber.split('').map((digit, index) => {
            const rating = placementTable[digit][index];
            const score = placementPositionScores[index];
            let points = 0;
            if (rating === 'good') points = score;
            else if (rating === 'bad') points = -score;
            else if (rating === 'forbidden') points = -2 * score;
            placementScore += points;
            return { position: index + 1, digit, rating, description: placementInterpretation[`D${index + 1}`], points };
        });

        // 2. Pair Harmony Score Calculation
        let pairScore = 0;
        const pairDetails = [];
        for (let i = 0; i < 9; i++) {
            const pair = mobileNumber.substring(i, i + 2);
            const rating = pairHarmony[pair];
            const score = pairPositionScores[i];
            let points = 0;
            if (rating === 'G') points = score;
            else if (rating === 'B') points = -score;
            pairScore += points;
            pairDetails.push({ pair, rating, points });
        }

        // 3. Alignment Score Calculation
        let alignmentScore = 0;
        if (driverNumber && numberSDT && numberRelationships[driverNumber]?.[numberSDT] === 'F') alignmentScore++;
        if (driverNumber && numberSDT && numberRelationships[driverNumber]?.[numberSDT] === 'E') alignmentScore--;
        if (conductorNumber && numberSDT && numberRelationships[conductorNumber]?.[numberSDT] === 'F') alignmentScore++;
        if (conductorNumber && numberSDT && numberRelationships[conductorNumber]?.[numberSDT] === 'E') alignmentScore--;
        if (driverNumber && last4SDT && numberRelationships[driverNumber]?.[last4SDT] === 'F') alignmentScore++;
        if (driverNumber && last4SDT && numberRelationships[driverNumber]?.[last4SDT] === 'E') alignmentScore--;
        if (conductorNumber && last4SDT && numberRelationships[conductorNumber]?.[last4SDT] === 'F') alignmentScore++;
        if (conductorNumber && last4SDT && numberRelationships[conductorNumber]?.[last4SDT] === 'E') alignmentScore--;

        // --- NEW, STRICTER SCORING LOGIC ---
        const maxPositiveScore = maxPlacementScore + maxPairScore;
        const actualScore = placementScore + pairScore;
        let strength = (actualScore / maxPositiveScore) * 100;
        strength += (alignmentScore * 2.5);
        const finalStrength = Math.max(0, Math.min(100, Math.round(strength)));
        
        const loShu = getLoShuGridAnalysis(dob, driverNumber, conductorNumber);
        loShu.analysisText = getLoShuInterpretation(loShu.missing, loShu.repeating, driverNumber, conductorNumber);

        setIsAnalyzing(false);
        return {
            strength: finalStrength,
            recommendation: finalStrength >= 70 ? "This is a strong and supportive number." : "Changing this number is recommended for better energy alignment.",
            mobileNumber,
            age: calculateAge(dob),
            driverNumber, conductorNumber,
            sdt: formatWithSDT(mobileNumber),
            last4sdt: formatWithSDT(mobileNumber.substring(6)),
            loShu,
            placement: { score: placementScore, details: placementDetails },
            pairHarmony: { score: pairScore, details: pairDetails },
        };
    };

    return { analysisEngine, isAnalyzing };
};