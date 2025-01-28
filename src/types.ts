export interface User {
  id: string;
  name: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  politicalSpectrum: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
  interests: string[];
}

export interface DebateRoom {
  id: string;
  participants: User[];
  topic: string;
  mode: 'timed' | 'freeform' | 'quickfire';
  duration: number;
  status: 'waiting' | 'active' | 'completed';
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
}

export interface QuestionnaireResponse {
  stance: 'for' | 'against' | 'neutral';
  politicalSpectrum: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
  mainArguments: string[];
  keyPolicies: {
    twoStateSolution: 'support' | 'oppose' | 'neutral';
    settlementPolicy: 'expand' | 'freeze' | 'withdraw';
    religiousState: 'secular' | 'traditional' | 'religious';
    economicPolicy: 'socialist' | 'mixed' | 'capitalist';
  };
  preferredDebateStyle: 'factual' | 'philosophical' | 'casual';
  timeNeededToPrep: number;
  matchPreference: 'similar' | 'opposite' | 'any';
}