import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FlashCardList from './FlashCardList';
import FlashCardItem from './FlashCardItem';

const FlashCards = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<FlashCardList />} />
        <Route path='/:id' element={<FlashCardItem />} />
      </Routes>
    </div>
  );
};

export default FlashCards;
