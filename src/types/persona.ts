export interface BigFiveProfile {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  traits: string[];
}

export interface PersonaCreateRequest {
  name: string;
  gender: string;
  if_original: boolean;
  description: string;
}

export interface PersonaResponse {
  name: string;
  gender: string;
  personality: BigFiveProfile;
}
