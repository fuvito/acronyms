import { AcronymService } from './services/acronym-service.js';
import { StorageService } from './services/storage-service.js';
import { NotificationService } from './services/notification-service.js';

class AcronymFinderPopup {
  constructor() {
    this.acronymService = new AcronymService();
    this.storageService = new StorageService();
    this.notificationService = new NotificationService();

    this.currentTab = 'search';
    this.searchResults = [];
    this.recentAcronyms = [];

    this.initElements();
    this.setupEventListeners();
    this.loadRecentAcronyms();
  }

  initElements() {
    // Tab elements
    this.tabButtons = document.querySelectorAll('.tab-button');
    this.tabContents = document.querySelectorAll('.tab-content');

    // Search tab elements
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search-button');
    this.searchTypeRadios = document.querySelectorAll('input[name="search-type"]');
    this.searchResultsContainer = document.getElementById('search-results');

    // Add tab elements
    this.addForm = document.getElementById('add-form');

    // Recent tab elements
    this.recentResultsContainer = document.getElementById('recent-results');

    // Notification element
    this.loadingSpinner = document.getElementById('loading-spinner');
  }

  setupEventListeners() {
    // Tab switching
    this.tabButtons.forEach(button => {
      button.addEventListener('click', () => this.switchTab(button.dataset.tab));
    });

    // Search functionality
    this.searchButton.addEventListener('click', () => this.performSearch());
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.performSearch();
    });

    // Add form submission
    this.addForm.addEventListener('submit', (e) => this.handleAddAcronym(e));
  }

  switchTab(tabName) {
    this.currentTab = tabName;

    // Update active tab button
    this.tabButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.tab === tabName);
    });

    // Show active tab content
    this.tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `${tabName}-tab`);
    });

    // Focus search input when switching to search tab
    if (tabName === 'search') {
      setTimeout(() => this.searchInput.focus(), 100);
    }
  }

  async performSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    const searchType = this.getSelectedSearchType();
    this.showLoading(true);

    try {
      const results = await this.acronymService.searchAcronyms(query, searchType);
      this.searchResults = results;
      this.renderSearchResults();

      if (results.length === 0) {
        this.notificationService.show('No results found. Try a different search term.', 'info');
      }
    } catch (error) {
      console.error('Search error:', error);
      this.notificationService.show('Error searching acronyms. Please try again.', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  getSelectedSearchType() {
    const selected = document.querySelector('input[name="search-type"]:checked');
    return selected ? selected.value : 'acronym';
  }

  renderSearchResults() {
    if (this.searchResults.length === 0) {
      this.searchResultsContainer.innerHTML = `
        <div class="empty-state">
          <span class="material-icons">search_off</span>
          <p>No results found</p>
        </div>
      `;
      return;
    }

    this.searchResultsContainer.innerHTML = '';

    this.searchResults.forEach(acronym => {
      const resultCard = this.createAcronymCard(acronym);
      this.searchResultsContainer.appendChild(resultCard);
    });
  }

  createAcronymCard(acronym) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="result-header">
        <span class="result-acronym">${acronym.acronym}</span>
      </div>
      <div class="result-definition">
        <strong>Definition:</strong> ${acronym.definition}
      </div>
      ${acronym.description ? `
        <div class="result-description">
          <strong>Description:</strong> ${acronym.description}
        </div>
      ` : ''}
    `;

    // Add click event to store in recent
    card.addEventListener('click', () => this.addToRecentAcronyms(acronym));

    return card;
  }

  async handleAddAcronym(event) {
    event.preventDefault();

    const formData = new FormData(this.addForm);
    const newAcronym = {
      acronym: formData.get('acronym').trim(),
      definition: formData.get('definition').trim(),
      description: formData.get('description').trim() || undefined
    };

    // Basic validation
    if (!newAcronym.acronym || !newAcronym.definition) {
      this.notificationService.show('Acronym and definition are required.', 'error');
      return;
    }

    this.showLoading(true);

    try {
      const createdAcronym = await this.acronymService.createAcronym(newAcronym);
      this.notificationService.show(`Acronym "${createdAcronym.acronym}" added successfully!`, 'success');
      this.addForm.reset();
      this.addToRecentAcronyms(createdAcronym);
      this.switchTab('search');
    } catch (error) {
      console.error('Add acronym error:', error);
      this.notificationService.show('Error adding acronym. Please try again.', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  async loadRecentAcronyms() {
    try {
      this.recentAcronyms = await this.storageService.getRecentAcronyms();
      this.renderRecentAcronyms();
    } catch (error) {
      console.error('Error loading recent acronyms:', error);
    }
  }

  async addToRecentAcronyms(acronym) {
    // Check if already in recents
    const existingIndex = this.recentAcronyms.findIndex(a => a.id === acronym.id);
    if (existingIndex !== -1) {
      // Move to top if exists
      this.recentAcronyms.splice(existingIndex, 1);
    }

    // Add to beginning of array (most recent first)
    this.recentAcronyms.unshift(acronym);

    // Keep only the 10 most recent
    if (this.recentAcronyms.length > 10) {
      this.recentAcronyms = this.recentAcronyms.slice(0, 10);
    }

    // Save to storage
    await this.storageService.saveRecentAcronyms(this.recentAcronyms);

    // Update UI if on recent tab
    if (this.currentTab === 'recent') {
      this.renderRecentAcronyms();
    }
  }

  renderRecentAcronyms() {
    if (this.recentAcronyms.length === 0) {
      this.recentResultsContainer.innerHTML = `
        <div class="empty-state">
          <span class="material-icons">history</span>
          <p>Your recently viewed acronyms will appear here</p>
        </div>
      `;
      return;
    }

    this.recentResultsContainer.innerHTML = '';

    this.recentAcronyms.forEach(acronym => {
      const resultCard = this.createAcronymCard(acronym);
      this.recentResultsContainer.appendChild(resultCard);
    });
  }

  showLoading(show) {
    this.loadingSpinner.classList.toggle('hidden', !show);
  }
}

// Initialize when popup loads
document.addEventListener('DOMContentLoaded', () => {
  new AcronymFinderPopup();
});
