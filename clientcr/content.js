/**
 * Content script for Acronym Finder extension
 * Scans page content for acronyms and provides definitions on hover
 */

let acronymsData = [];
let isInitialized = false;
let highlightingEnabled = true;
let tooltipElement = null;

// Initialize when page loads
init();

async function init() {
  // Check if highlighting is enabled in settings
  const settings = await getSettings();
  highlightingEnabled = settings.highlightAcronyms;

  if (highlightingEnabled) {
    // Get acronyms from the API
    try {
      await loadAcronyms();
      scanPageForAcronyms();
      createTooltipElement();
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Acronym Finder content script:', error);
    }
  }
}

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['settings'], (result) => {
      resolve(result.settings || { highlightAcronyms: true });
    });
  });
}

async function loadAcronyms() {
  return new Promise((resolve, reject) => {
    // Get API URL from background script
    chrome.runtime.sendMessage({ action: 'getApiUrl' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      const apiUrl = (response && response.apiUrl) 
        ? `${response.apiUrl}/acronyms`
        : 'http://localhost:8080/api/acronyms';

      // Fetch acronyms from API
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error ${response.status}`);
          return response.json();
        })
        .then(data => {
          acronymsData = data;
          resolve(data);
        })
        .catch(error => {
          console.error('Error loading acronyms:', error);
          reject(error);
        });
    });
  });
}

function scanPageForAcronyms() {
  if (!highlightingEnabled || acronymsData.length === 0) return;

  // Create a map of acronyms for faster lookup
  const acronymsMap = new Map();
  acronymsData.forEach(item => {
    acronymsMap.set(item.acronym.toUpperCase(), item);
  });

  // Get all text nodes in the document
  const textNodes = getAllTextNodes(document.body);

  textNodes.forEach(node => {
    // Skip nodes that are part of script, style, or already processed elements
    if (shouldSkipNode(node)) return;

    let text = node.nodeValue;
    let matches = [];

    // Find all acronyms in this text node
    acronymsData.forEach(acronym => {
      // Use word boundary to match whole words only
      const regex = new RegExp(`\\b${escapeRegExp(acronym.acronym)}\\b`, 'g');
      let match;

      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + acronym.acronym.length,
          acronym: acronym
        });
      }
    });

    // If matches found, replace the text node with highlighted elements
    if (matches.length > 0) {
      // Sort matches by starting position (in reverse order)
      matches.sort((a, b) => b.start - a.start);

      const fragment = document.createDocumentFragment();
      let lastIndex = text.length;

      // Process matches in reverse order to maintain correct indices
      matches.forEach(match => {
        // Add text after match
        if (match.end < lastIndex) {
          fragment.prepend(document.createTextNode(text.substring(match.end, lastIndex)));
        }

        // Add highlighted acronym
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'acronym-finder-highlight';
        highlightSpan.textContent = text.substring(match.start, match.end);
        highlightSpan.style.borderBottom = '1px dotted #3f51b5';
        highlightSpan.style.cursor = 'help';
        highlightSpan.dataset.acronymId = match.acronym.id;
        highlightSpan.addEventListener('mouseenter', handleAcronymHover);
        highlightSpan.addEventListener('mouseleave', handleAcronymLeave);
        fragment.prepend(highlightSpan);

        lastIndex = match.start;
      });

      // Add remaining text before first match
      if (lastIndex > 0) {
        fragment.prepend(document.createTextNode(text.substring(0, lastIndex)));
      }

      // Replace the original node with our fragment
      node.parentNode.replaceChild(fragment, node);
    }
  });
}

function getAllTextNodes(node) {
  const textNodes = [];
  const walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  return textNodes;
}

function shouldSkipNode(node) {
  const parent = node.parentNode;
  if (!parent) return true;

  const tagName = parent.tagName?.toLowerCase();

  // Skip script, style, and already processed nodes
  if (tagName === 'script' || tagName === 'style' || 
      parent.classList.contains('acronym-finder-highlight') ||
      parent.classList.contains('acronym-finder-tooltip')) {
    return true;
  }

  // Skip empty text nodes or those only containing whitespace
  if (node.nodeValue.trim() === '') {
    return true;
  }

  return false;
}

function createTooltipElement() {
  tooltipElement = document.createElement('div');
  tooltipElement.className = 'acronym-finder-tooltip';
  tooltipElement.style.position = 'absolute';
  tooltipElement.style.zIndex = '10000';
  tooltipElement.style.backgroundColor = 'white';
  tooltipElement.style.border = '1px solid #ccc';
  tooltipElement.style.borderRadius = '4px';
  tooltipElement.style.padding = '8px 12px';
  tooltipElement.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  tooltipElement.style.maxWidth = '300px';
  tooltipElement.style.fontSize = '14px';
  tooltipElement.style.display = 'none';

  document.body.appendChild(tooltipElement);
}

function handleAcronymHover(event) {
  const acronymId = parseInt(event.target.dataset.acronymId);
  const acronym = acronymsData.find(a => a.id === acronymId);

  if (acronym && tooltipElement) {
    // Populate tooltip content
    tooltipElement.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 4px; color: #3f51b5;">${acronym.acronym}</div>
      <div style="margin-bottom: 4px;"><strong>Definition:</strong> ${acronym.definition}</div>
      ${acronym.description ? `<div style="color: #666;"><strong>Description:</strong> ${acronym.description}</div>` : ''}
    `;

    // Position the tooltip
    const rect = event.target.getBoundingClientRect();
    tooltipElement.style.left = `${rect.left + window.scrollX}px`;
    tooltipElement.style.top = `${rect.bottom + window.scrollY + 5}px`;

    // Show the tooltip
    tooltipElement.style.display = 'block';
  }
}

function handleAcronymLeave() {
  if (tooltipElement) {
    tooltipElement.style.display = 'none';
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scanForAcronyms') {
    scanPageForAcronyms();
    sendResponse({ success: true });
  }
});
