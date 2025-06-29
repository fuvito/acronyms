import React, { useState } from 'react';
import type {Acronym} from '../types/acronym';
import './styles/AcronymForm.css';

interface AcronymFormProps {
  onAddAcronym: (newAcronym: Omit<Acronym, 'id'>) => void;
}

const AcronymForm: React.FC<AcronymFormProps> = ({ onAddAcronym }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [acronym, setAcronym] = useState('');
  const [definition, setDefinition] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!acronym.trim() || !definition.trim()) {
      setFormError('Acronym and definition are required');
      return;
    }

    // Create new acronym object
    const newAcronym = {
      acronym: acronym.trim(),
      definition: definition.trim(),
      description: description.trim(),
    };

    // Add the acronym
    onAddAcronym(newAcronym);

    // Reset form
    setAcronym('');
    setDefinition('');
    setDescription('');
    setFormError(null);
    setIsFormVisible(false);
  };

  return (
    <div className="acronym-form-container">
      {isFormVisible ? (
        <>
          <h2>Add New Acronym</h2>
          <form onSubmit={handleSubmit} className="acronym-form">
            {formError && <div className="form-error">{formError}</div>}

            <div className="form-group">
              <label htmlFor="acronym">Acronym:</label>
              <input
                type="text"
                id="acronym"
                value={acronym}
                onChange={(e) => setAcronym(e.target.value)}
                placeholder="Enter acronym (e.g., API)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="definition">Definition:</label>
              <input
                type="text"
                id="definition"
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Enter definition (e.g., Application Programming Interface)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (optional):</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">Add Acronym</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <button
          className="add-button"
          onClick={() => setIsFormVisible(true)}
        >
          Add New Acronym
        </button>
      )}
    </div>
  );
};

export default AcronymForm;
