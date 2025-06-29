/**
 * Service for handling Chrome storage operations
 */
export class StorageService {
  constructor() {
    this.storage = chrome.storage.local;
    this.RECENT_ACRONYMS_KEY = 'recentAcronyms';
    this.SETTINGS_KEY = 'settings';
  }

  /**
   * Get recently viewed acronyms
   */
  getRecentAcronyms() {
    return new Promise((resolve) => {
      this.storage.get([this.RECENT_ACRONYMS_KEY], (result) => {
        resolve(result[this.RECENT_ACRONYMS_KEY] || []);
      });
    });
  }

  /**
   * Save recently viewed acronyms
   */
  saveRecentAcronyms(acronyms) {
    return new Promise((resolve) => {
      this.storage.set({ [this.RECENT_ACRONYMS_KEY]: acronyms }, () => {
        resolve();
      });
    });
  }

  /**
   * Get user settings
   */
  getSettings() {
    return new Promise((resolve) => {
      this.storage.get([this.SETTINGS_KEY], (result) => {
        resolve(result[this.SETTINGS_KEY] || {
          highlightAcronyms: true,
          apiUrl: 'http://localhost:8080/api'
        });
      });
    });
  }

  /**
   * Save user settings
   */
  saveSettings(settings) {
    return new Promise((resolve) => {
      this.storage.set({ [this.SETTINGS_KEY]: settings }, () => {
        resolve();
      });
    });
  }

  /**
   * Clear all stored data
   */
  clearAllData() {
    return new Promise((resolve) => {
      this.storage.clear(() => {
        resolve();
      });
    });
  }
}
