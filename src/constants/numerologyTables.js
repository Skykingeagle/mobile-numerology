/**
 * T1: PLACEMENT OF DIGITS - Defines the quality of a digit in a specific position.
 */
export const placementTable = {
  // D1-D10
  1: ["good", "good", "good", "bad", "good", "neutral", "good", "bad", "good", "good"],
  2: ["good", "good", "good", "bad", "good", "good", "bad", "bad", "neutral", "neutral"],
  3: ["good", "good", "good", "neutral", "good", "bad", "good", "bad", "good", "good"],
  4: ["bad", "neutral", "neutral", "good", "neutral", "good", "bad", "bad", "neutral", "bad"],
  5: ["good", "good", "good", "neutral", "good", "good", "bad", "neutral", "good", "good"],
  6: ["good", "neutral", "good", "good", "good", "good", "good", "good", "good", "good"],
  7: ["neutral", "neutral", "bad", "bad", "bad", "neutral", "good", "neutral", "neutral", "neutral"],
  8: ["bad", "bad", "bad", "bad", "bad", "good", "bad", "good", "neutral", "bad"],
  9: ["good", "good", "good", "bad", "good", "bad", "good", "bad", "good", "good"],
  0: ["forbidden", "forbidden", "forbidden", "forbidden", "neutral", "neutral", "neutral", "neutral", "neutral", "forbidden"],
};

// Positional scores/weightage for T1 (Digit Placement)
export const placementPositionScores = [8, 6, 7, 5, 9, 7, 6, 5, 8, 8]; // Index 0 is D1, Index 9 is D10

// Positional scores/weightage for T2 (Pair Harmony)
export const pairPositionScores = [8, 6, 7, 5, 9, 7, 6, 5, 8]; // Index 0 is Pair 1, Index 8 is Pair 9

/**
 * T2: PAIR HARMONY - Defines the energy of every two-digit pair.
 * G = Good, B = Bad, N = Neutral
 */
export const pairHarmony = {
  "00": "N", "01": "G", "02": "B", "03": "G", "04": "B", "05": "G", "06": "G", "07": "N", "08": "B", "09": "G",
  "10": "G", "11": "B", "12": "G", "13": "G", "14": "B", "15": "G", "16": "B", "17": "G", "18": "B", "19": "G",
  "20": "B", "21": "B", "22": "B", "23": "B", "24": "B", "25": "G", "26": "B", "27": "B", "28": "B", "29": "G",
  "30": "G", "31": "G", "32": "B", "33": "G", "34": "B", "35": "G", "36": "G", "37": "G", "38": "B", "39": "G",
  "40": "B", "41": "B", "42": "B", "43": "B", "44": "B", "45": "B", "46": "B", "47": "G", "48": "B", "49": "B",
  "50": "G", "51": "G", "52": "G", "53": "G", "54": "B", "55": "G", "56": "B", "57": "G", "58": "B", "59": "G",
  "60": "G", "61": "B", "62": "B", "63": "G", "64": "B", "65": "B", "66": "G", "67": "G", "68": "B", "69": "G",
  "70": "G", "71": "G", "72": "B", "73": "G", "74": "G", "75": "G", "76": "G", "77": "B", "78": "G", "79": "B",
  "80": "B", "81": "B", "82": "B", "83": "B", "84": "B", "85": "B", "86": "B", "87": "G", "88": "B", "89": "B",
  "90": "G", "91": "G", "92": "G", "93": "G", "94": "B", "95": "G", "96": "G", "97": "B", "98": "B", "99": "B"
};

/**
 * Defines friendly, enemy, and neutral relationships between numbers.
 * F = Friend, E = Enemy, N = Neutral
 */
export const numberRelationships = {
  1: { 1: "N", 2: "F", 3: "F", 4: "F", 5: "F", 6: "E", 7: "F", 8: "E", 9: "F" },
  2: { 1: "F", 2: "N", 3: "E", 4: "E", 5: "F", 6: "F", 7: "F", 8: "E", 9: "E" },
  3: { 1: "F", 2: "E", 3: "N", 4: "E", 5: "F", 6: "E", 7: "F", 8: "N", 9: "F" },
  4: { 1: "F", 2: "E", 3: "E", 4: "N", 5: "F", 6: "F", 7: "F", 8: "E", 9: "E" },
  5: { 1: "F", 2: "F", 3: "F", 4: "F", 5: "N", 6: "F", 7: "E", 8: "E", 9: "F" },
  6: { 1: "E", 2: "F", 3: "E", 4: "F", 5: "F", 6: "N", 7: "E", 8: "F", 9: "F" },
  7: { 1: "F", 2: "F", 3: "F", 4: "F", 5: "E", 6: "E", 7: "N", 8: "E", 9: "E" },
  8: { 1: "E", 2: "E", 3: "N", 4: "E", 5: "F", 6: "F", 7: "E", 8: "N", 9: "E" },
  9: { 1: "F", 2: "E", 3: "F", 4: "E", 5: "F", 6: "F", 7: "E", 8: "E", 9: "N" },
};

export const maxPlacementScore = placementPositionScores.reduce((a, b) => a + b, 0);
export const maxPairScore = pairPositionScores.reduce((a, b) => a + b, 0);