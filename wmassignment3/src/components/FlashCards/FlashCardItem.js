import React, { useState } from 'react';
import './FlashCardItem.css';

const FlashCardItem = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const { front, back, lastModified, status } = card;

  return (
    <div
      className={`flash-card-item ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className='card front'>
        <p>{front}</p>
      </div>
      <div className='card back'>
        <p>{back}</p>
        <p>
          <strong>Last Modified:</strong> {lastModified}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </div>
    </div>
  );
};

export default FlashCardItem;
