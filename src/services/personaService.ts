import { apiClient } from './apiClient';
import type { PersonaCreateRequest, PersonaResponse } from '../types/persona';

export const generatePersona = async (data: PersonaCreateRequest): Promise<PersonaResponse> => {
  return apiClient.post<PersonaResponse>('/personas/generate', data);
};
