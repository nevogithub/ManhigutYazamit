import { User, QuestionnaireResponse } from '../types';

interface MatchScore {
  score: number;
  explanation: string[];
}

export function calculateMatchScore(
  user1: QuestionnaireResponse,
  user2: QuestionnaireResponse
): MatchScore {
  let score = 0;
  const explanation: string[] = [];

  // Political spectrum alignment
  const spectrumDistance = getPoliticalSpectrumDistance(
    user1.politicalSpectrum,
    user2.politicalSpectrum
  );

  // Match based on preference
  if (user1.matchPreference === 'similar') {
    score += (5 - spectrumDistance) * 20; // Higher score for similar views
    if (spectrumDistance < 2) {
      explanation.push('Political views closely aligned');
    }
  } else if (user1.matchPreference === 'opposite') {
    score += spectrumDistance * 20; // Higher score for opposing views
    if (spectrumDistance > 3) {
      explanation.push('Opposing political perspectives');
    }
  } else {
    score += 50; // Neutral score for 'any' preference
  }

  // Policy alignment scoring
  const policyScore = comparePolicies(user1.keyPolicies, user2.keyPolicies);
  score += policyScore.score;
  explanation.push(...policyScore.explanations);

  // Debate style compatibility
  if (user1.preferredDebateStyle === user2.preferredDebateStyle) {
    score += 20;
    explanation.push(`Matching debate style: ${user1.preferredDebateStyle}`);
  }

  return {
    score: Math.min(100, Math.max(0, score)), // Normalize to 0-100
    explanation
  };
}

function getPoliticalSpectrumDistance(spectrum1: string, spectrum2: string): number {
  const positions = ['left', 'center-left', 'center', 'center-right', 'right'];
  const pos1 = positions.indexOf(spectrum1);
  const pos2 = positions.indexOf(spectrum2);
  return Math.abs(pos1 - pos2);
}

function comparePolicies(policies1: any, policies2: any): { score: number; explanations: string[] } {
  let score = 0;
  const explanations: string[] = [];

  // Two-State Solution
  if (policies1.twoStateSolution === policies2.twoStateSolution) {
    score += 15;
    explanations.push('Similar views on two-state solution');
  }

  // Settlement Policy
  if (policies1.settlementPolicy === policies2.settlementPolicy) {
    score += 15;
    explanations.push('Matching settlement policy stance');
  }

  // Religious State
  if (policies1.religiousState === policies2.religiousState) {
    score += 15;
    explanations.push('Similar views on religion and state');
  }

  // Economic Policy
  if (policies1.economicPolicy === policies2.economicPolicy) {
    score += 15;
    explanations.push('Matching economic policy preferences');
  }

  return { score, explanations };
}