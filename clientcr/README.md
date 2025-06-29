# Acronym Finder Chrome Extension

A powerful Chrome extension for finding, managing, and understanding acronyms directly from your browser.

## Features

- Search acronyms by acronym text or definition
- Add new acronyms to the database
- View recently accessed acronyms
- Automatic acronym detection and highlighting on web pages
- Convenient tooltips showing acronym definitions on hover
- Right-click context menu for quick acronym lookups

## Installation

### Development Mode

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `clientcr` folder
5. The extension should now appear in your Chrome toolbar

### Production Installation

1. Package the extension by clicking "Pack extension" in Chrome's extension page
2. Distribute the resulting `.crx` file to users
3. Users can drag and drop the `.crx` file into Chrome's extension page to install

## Usage

- Click the extension icon in the toolbar to open the popup interface
- Use the search tab to find acronyms
- Use the add tab to create new acronyms
- View your recently viewed acronyms in the recent tab
- Right-click on any text on a webpage and select "Search for [selection] in Acronym Finder"
- Hover over highlighted acronyms on web pages to see their definitions

## Configuration

Right-click the extension icon and select "Options" or navigate to the extension details page and click "Extension options" to customize:

- API endpoint URL (connect to your own server)
- Toggle automatic acronym highlighting on web pages
- Clear your recently viewed acronyms

## Backend API

This extension connects to a Java Spring Boot backend serving the following endpoints:

- `GET /api/acronyms` - Get all acronyms
- `GET /api/acronyms/search?acronym={query}` - Search acronyms by acronym text
- `GET /api/acronyms/search?definition={query}` - Search acronyms by definition text
- `POST /api/acronyms` - Create a new acronym

## Development

The extension consists of:

- `manifest.json` - Extension configuration
- `popup.html/css/js` - User interface for the extension popup
- `background.js` - Background service worker for handling events
- `content.js` - Content script for scanning and highlighting acronyms on web pages
- `options.html/css/js` - Settings page for the extension
- `scripts/services/` - Service modules for API communication, storage, and notifications

## License

This project is licensed under the MIT License - see the LICENSE file for details.
