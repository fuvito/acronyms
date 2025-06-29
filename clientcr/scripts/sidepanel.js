// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'displayResults') {
    displayResults(message.results);
  }
});

// Display search results in the side panel
function displayResults(results) {
  const resultsContainer = document.getElementById('searchResults');
  
  if (!results || results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsContainer.innerHTML = results.map(result => `
    <div class="acronym-result">
      <strong>${result.acronym}</strong>: ${result.definition}
    </div>
  `).join('');
}

// Initialize the side panel
document.addEventListener('DOMContentLoaded', async () => {
  // Get the last search term from storage
  const { lastSearch } = await chrome.storage.local.get('lastSearch');
  
  if (lastSearch) {
    // Notify the background script to perform the search
    chrome.runtime.sendMessage({
      action: 'searchAcronym',
      term: lastSearch
    });
  }
});
