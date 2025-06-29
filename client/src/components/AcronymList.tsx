import React from 'react';
import type {Acronym} from '../types/acronym';
import './styles/AcronymList.css';

interface AcronymListProps {
  acronyms: Acronym[];
}

const AcronymList: React.FC<AcronymListProps> = ({ acronyms }) => {
  if (acronyms.length === 0) {
    return <div className="no-acronyms">No acronyms found. Add some or try a different search.</div>;
  }

  return (
    <div className="acronym-list">
      <h2>Acronyms</h2>
      <div className="acronym-grid">
        {acronyms.map((acronym) => (
          <div key={acronym.id} className="acronym-card">
            <h3>{acronym.acronym}</h3>
            <div className="acronym-details">
              <p><strong>Definition:</strong> {acronym.definition}</p>
              {acronym.description && (
                <p><strong>Description:</strong> {acronym.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcronymList;
