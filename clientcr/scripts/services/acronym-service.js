/**
 * Service for interacting with the acronym API
 */
export class AcronymService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8080/api/acronyms';
  }

  /**
   * Get all acronyms
   */
  async getAllAcronyms() {
    try {
      const response = await fetch(this.apiBaseUrl);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching acronyms:', error);
      throw error;
    }
  }

  /**
   * Search acronyms by acronym or definition
   */
  async searchAcronyms(query, type = 'acronym') {
    try {
      const url = new URL(`${this.apiBaseUrl}/search/${type}`);
      url.searchParams.append("q", query);

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching acronyms:', error);
      throw error;
    }
  }

  /**
   * Create a new acronym
   */
  async createAcronym(acronymData) {
    try {
      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(acronymData)
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating acronym:', error);
      throw error;
    }
  }

  /**
   * Get a specific acronym by ID
   */
  async getAcronymById(id) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/${id}`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching acronym ${id}:`, error);
      throw error;
    }
  }
}
