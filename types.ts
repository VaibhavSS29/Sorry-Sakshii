
export interface UserContext {
  girlName: string;
  reason: string;
  favoriteThings: string;
  angerLevel: number;
}

export interface GeneratedContent {
  apologyLetter: string;
  compliments: string[];
  virtualGiftImageUrl?: string;
}

export enum AppStage {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  LETTER = 'LETTER',
  COMPLIMENTS = 'COMPLIMENTS',
  VIRTUAL_GIFT = 'VIRTUAL_GIFT'
}
