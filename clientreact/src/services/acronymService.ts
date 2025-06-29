import axios from 'axios';
import type {Acronym} from '../types/acronym';

const API_URL = 'http://localhost:8080/api/acronyms';

export const acronymService = {
  /**
   * Get all acronyms
   */
  getAll: async (): Promise<Acronym[]> => {
    const response = await axios.get<Acronym[]>(API_URL);
    return response.data;
  },

  /**
   * Search acronyms by acronym text
   */
  searchByAcronym: async (query: string): Promise<Acronym[]> => {
    const response = await axios.get<Acronym[]>(`${API_URL}/search/acronym?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Search acronyms by definition text
   */
  searchByDefinition: async (query: string): Promise<Acronym[]> => {
    const response = await axios.get<Acronym[]>(`${API_URL}/search/definition?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  /**
   * Create a new acronym
   */
  create: async (acronym: Omit<Acronym, 'id'>): Promise<Acronym> => {
    const response = await axios.post<Acronym>(API_URL, acronym);
    return response.data;
  },

  /**
   * Update an existing acronym
   */
  update: async (id: number, acronym: Omit<Acronym, 'id'>): Promise<Acronym> => {
    const response = await axios.put<Acronym>(`${API_URL}/${id}`, acronym);
    return response.data;
  },

  /**
   * Delete an acronym
   */
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
