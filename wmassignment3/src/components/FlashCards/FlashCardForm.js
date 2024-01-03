import React, { useState, useEffect } from 'react';
import api from '../../api';

const FlashCardForm = ({
  initialData,
  onFlashCardAdded,
  onFlashCardUpdated,
}) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (initialData) {
      setFront(initialData.front || '');
      setBack(initialData.back || '');
      setStatus(initialData.status || '');
    }
  }, [initialData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const flashCardData = {
      front,
      back,
      status,
    };

    try {
      if (initialData && initialData.id) {
        const updatedCard = await api.updateFlashCard(
          initialData.id,
          flashCardData
        );
        onFlashCardUpdated(updatedCard);
      } else {
        const createdCard = await api.createFlashCard(flashCardData);
        onFlashCardAdded(createdCard);
      }

      setFront('');
      setBack('');
      setStatus('');
    } catch (error) {
      console.error('Error creating/updating flash card:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Front:
        <input
          type='text'
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
      </label>
      <label>
        Back:
        <input
          type='text'
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value=''>Select Status</option>
          <option value='Learned'>Learned</option>
          <option value='Want to Learn'>Want to Learn</option>
          <option value='Noted'>Noted</option>
        </select>
      </label>
      <button type='submit'>{initialData ? 'Update' : 'Add'} Flash Card</button>
    </form>
  );
};

export default FlashCardForm;
