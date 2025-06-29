import React, { useState } from 'react';
import './styles/AcronymSearch.css';

interface AcronymSearchProps {
  onSearch: (query: string, type: 'acronym' | 'definition') => void;
}

const AcronymSearch: React.FC<AcronymSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'acronym' | 'definition'>('acronym');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery, searchType);
    }
  };

  return (
    <div className="search-container">
      <h2>Search Acronyms</h2>
      <form onSubmit={handleSubmit}>
        <div className="search-controls">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search term..."
            className="search-input"
            size={10}
            minLength={1}
          />

          <div className="search-type-selector">
            <label>
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'acronym'}
                onChange={() => setSearchType('acronym')}
              />
              Search by Acronym
            </label>

            <label>
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'definition'}
                onChange={() => setSearchType('definition')}
              />
              Search by Definition
            </label>
          </div>

          <button type="submit" className="search-button">Search</button>
        </div>
      </form>
    </div>
  );
};

export default AcronymSearch;
