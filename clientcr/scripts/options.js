/**
 * Options page functionality for Acronym Finder extension
 */

// Elements
const apiUrlInput = document.getElementById('api-url');
const highlightAcronymsCheckbox = document.getElementById('highlight-acronyms');
const testConnectionButton = document.getElementById('test-connection');
const clearRecentButton = document.getElementById('clear-recent');
const saveSettingsButton = document.getElementById('save-settings');
const statusElement = document.getElementById('status');
const connectionStatusElement = document.getElementById('connection-status');

// Load saved settings
document.addEventListener('DOMContentLoaded', loadSettings);

// Event listeners
testConnectionButton.addEventListener('click', testConnection);
clearRecentButton.addEventListener('click', clearRecentAcronyms);
saveSettingsButton.addEventListener('click', saveSettings);

async function loadSettings() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || { apiUrl: 'http://localhost:8080/api', highlightAcronyms: true };

    apiUrlInput.value = settings.apiUrl;
    highlightAcronymsCheckbox.checked = settings.highlightAcronyms;
  });
}

async function saveSettings() {
  const settings = {
    apiUrl: apiUrlInput.value.trim(),
    highlightAcronyms: highlightAcronymsCheckbox.checked
  };

  // Basic validation
  if (!settings.apiUrl) {
    showStatus('API URL cannot be empty', 'error');
    return;
  }

  // Save settings
  chrome.storage.local.set({ settings }, () => {
    showStatus('Settings saved successfully');
  });
}

async function testConnection() {
  const apiUrl = apiUrlInput.value.trim();

  if (!apiUrl) {
    connectionStatusElement.textContent = 'Please enter an API URL';
    connectionStatusElement.className = 'error';
    return;
  }

  // Show testing indicator
  connectionStatusElement.textContent = 'Testing connection...';
  connectionStatusElement.className = '';

  try {
    const response = await fetch(`${apiUrl}/acronyms`);

    if (response.ok) {
      connectionStatusElement.textContent = 'Connection successful!';
      connectionStatusElement.className = 'success';
    } else {
      connectionStatusElement.textContent = `Error: HTTP ${response.status}`;
      connectionStatusElement.className = 'error';
    }
  } catch (error) {
    connectionStatusElement.textContent = `Error: ${error.message}`;
    connectionStatusElement.className = 'error';
  }
}

async function clearRecentAcronyms() {
  chrome.storage.local.remove(['recentAcronyms'], () => {
    showStatus('Recent acronyms cleared');
  });
}

function showStatus(message, type = 'success') {
  statusElement.textContent = message;
  statusElement.className = `status-message ${type}`;

  // Clear message after 3 seconds
  setTimeout(() => {
    statusElement.textContent = '';
    statusElement.className = 'status-message';
  }, 3000);
}
