/*global chrome*/
/**
 * Background script for the Acronym Finder extension
 * Handles events and communication between different parts of the extension
 * Updated for Manifest V3 compatibility
 */

// Listen for installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings on installation
    chrome.storage.local.set({
      settings: {
        highlightAcronyms: true,
        apiUrl: 'http://localhost:8080/api'
      }
    });

    // Open options page on install using chrome.runtime.openOptionsPage()
    chrome.runtime.openOptionsPage();
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getApiUrl') {
    // Retrieve the API URL from settings
    chrome.storage.local.get(['settings'], (result) => {
      const settings = result.settings || { apiUrl: 'http://localhost:8080/api' };
      sendResponse({ apiUrl: settings.apiUrl });
    });
    return true; // Required for async response
  }

  if (message.action === 'scanPage') {
    // Tell the content script to scan the current page for acronyms
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scanForAcronyms' });
      }
    });
  }
});

// Context menu for searching selected text
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'searchAcronym',
    title: 'Search for "%s" in Acronym Finder',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchAcronym' && info.selectionText) {
    // Store the search term and open the popup via a new tab or side panel
    chrome.storage.local.set({ lastSearch: info.selectionText }, () => {
      // Open the popup in a new tab or use side panel in Manifest V3
      chrome.sidePanel.open({ windowId: tab.windowId })
        .catch(() => {
          // Fallback to opening in a new tab if side panel is not available
          chrome.tabs.create({ url: 'popup.html' });
        });
    });
  }
});
