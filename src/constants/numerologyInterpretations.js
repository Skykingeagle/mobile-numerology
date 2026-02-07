export const driverConductorInterpretations = {
  1: "Represents leadership, ambition, and independence. You are a natural-born leader, innovative and driven.",
  2: "Symbolizes diplomacy, cooperation, and sensitivity. You are intuitive, supportive, and work well in partnerships.",
  3: "Signifies creativity, communication, and social charm. You are optimistic, expressive, and have a gift for words.",
  4: "Stands for discipline, hard work, and stability. You are practical, organized, and dedicated to building a secure foundation.",
  5: "Represents freedom, adventure, and change. You are adaptable, resourceful, and thrive on new experiences.",
  6: "Symbolizes responsibility, harmony, and nurturing. You are caring, protective, and a pillar for your family and community.",
  7: "Signifies introspection, analysis, and spirituality. You are a seeker of truth, with a sharp mind and a deep intuition.",
  8: "Stands for power, authority, and material success. You have strong executive skills and the potential for great achievements.",
  9: "Represents compassion, humanitarianism, and completion. You are a selfless idealist with a desire to make the world a better place."
};

export const getLoShuInterpretation = (missing, repeating, driver, conductor) => {
    let text = [];
    if (missing.length === 0) {
        text.push("Your Lo Shu grid is complete, indicating a well-rounded personality with balanced energies from birth.");
    } else {
        missing.forEach(num => {
            if (num == driver) text.push(`Missing your Driver Number (${driver}) is a significant challenge, indicating a lifelong lesson in mastering your core identity.`);
            if (num == conductor) text.push(`Missing your Conductor Number (${conductor}) suggests you may struggle to align with your life's ultimate path and purpose.`);
            // Add more specific interpretations if needed
        });
    }
    if (repeating.length > 0) {
        repeating.forEach(item => {
            if (item.num == driver) text.push(`The repetition of your Driver Number (${driver}) amplifies your core traits but may cause them to become excessive.`);
        });
    }
    return text.length > 0 ? text.join(' ') : "Your birth numbers show a balanced energy profile.";
};

export const placementInterpretation = {
    D1: "Identity: This digit represents your 'face' to the world. It's the first impression you give and the core identity of the number. It must be strong and independent.",
    D2: "Partnership: This relates to relationships, diplomacy, intuition, and connection with others. It should be sensitive and cooperative.",
    D3: "Expression: This governs communication, creativity, social interaction, and joy. It should be vibrant and expressive.",
    D4: "Foundation: This is the pillar of the number, representing stability, hard work, security, and physical manifestation. It needs to be reliable and grounded.",
    D5: "Freedom/Change: The midpoint. This represents travel, adventure, communication, and the ability to adapt. It should be dynamic and versatile.",
    D6: "Harmony/Home: This governs family, responsibility, love, healing, and domestic matters. It should be nurturing and stable.",
    D7: "Spiritual/Analysis: This relates to introspection, analysis, research, and the inner self. It is a solitary, truth-seeking energy.",
    D8: "Power/Finance: This governs money, ambition, authority, and karma. It is the position of worldly success and requires a strong, balanced number.",
    D9: "Humanitarian: This relates to compassion, completion, universal love, and letting go. It is a position of wisdom and broad perspective.",
    D10: "Legacy: This is the final outcome, the long-term result of the number's vibration. It defines what the number ultimately delivers."
};

export const loShuInterpretations = {
  missing: {
    1: "Missing 1 may indicate challenges with self-confidence. Focus on building self-reliance.",
    2: "Missing 2 suggests a need to develop intuition and sensitivity towards others.",
    3: "Missing 3 can point to difficulties in self-expression and creativity.",
    4: "Missing 4 may indicate a lack of practicality and discipline. Focus on organized planning.",
    5: "Missing 5 suggests a resistance to change. Try to embrace new opportunities.",
    6: "Missing 6 can indicate challenges with domestic responsibilities and family matters.",
    7: "Missing 7 may point to a neglect of inner-self and spiritual growth.",
    8: "Missing 8 suggests difficulties in managing finances and asserting authority.",
    9: "Missing 9 can indicate a lack of humanitarian drive. Engage in acts of service."
  },
  repeating: {
    1: "Repeating 1s signify strong leadership but can lead to being overly assertive.",
    2: "Repeating 2s indicate high intuition but can lead to over-emotional states.",
    3: "Repeating 3s boost creativity but may result in scattered energy.",
    4: "Repeating 4s enhance practicality but can lead to being overly rigid.",
    5: "Repeating 5s amplify adaptability but may cause restlessness.",
    6: "Repeating 6s strengthen a responsible nature but can lead to anxiety.",
    7: "Repeating 7s deepen analytical tendencies but may result in isolation.",
    8: "Repeating 8s increase potential for material success but can lead to being materialistic.",
    9: "Repeating 9s enhance compassion but may result in feeling emotionally drained."
  }
};

export const placementRatingInterpretations = {
  good: "This digit is in a powerful and favorable position, enhancing its positive qualities.",
  neutral: "This digit is in a neutral position. It does not significantly harm or enhance the number's energy.",
  bad: "This digit is in a challenging position, which may weaken its positive traits or introduce obstacles."
};

export const pairHarmonyRatingInterpretations = {
  G: "This is a 'Good' pair. It creates a harmonious and supportive energy, promoting success.",
  N: "This is a 'Neutral' pair. It has a balanced and stable influence.",
  B: "This is a 'Bad' pair. This combination can create conflict or unfavorable energy. It's an area to be mindful of."
};