import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../api';
import FlashCardForm from './FlashCardForm';
import FlashCardItem from './FlashCardItem';
import { Link } from 'react-router-dom';
import './FlashCardList.css';
const FlashCardList = () => {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortCriteria, setSortCriteria] = useState('lastModified');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await api.getFlashCards();

        const sortedCards = data.sort((a, b) => {
          if (sortCriteria === 'lastModified') {
            return new Date(b.lastModified) - new Date(a.lastModified);
          } else if (sortCriteria === 'front') {
            return a.front.localeCompare(b.front);
          } else if (sortCriteria === 'back') {
            return a.back.localeCompare(b.back);
          } else if (sortCriteria === 'status') {
            return a.status.localeCompare(b.status);
          }
        });

        setCards(sortedCards);
      } catch (error) {
        console.error('Error fetching flash cards:', error);
      }
    };

    fetchCards();
  }, [sortCriteria]);

  const handleEditClick = (card) => {
    setEditingCard(card);
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.deleteFlashCard(id);

      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting flash card:', error);
    }
  };

  const handleFlashCardAdded = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleFlashCardUpdated = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
  };

  const filteredCards = cards.filter(
    (card) =>
      card.front.toLowerCase().includes(searchText.toLowerCase()) ||
      card.back.toLowerCase().includes(searchText.toLowerCase())
  );

  const statusFilteredCards =
    filterStatus === ''
      ? filteredCards
      : filteredCards.filter((card) => card.status === filterStatus);

  return (
    <div className='flash-card-list-container'>
      <div className='flash-card-list-buttons'>
        <Link to={'/'} className='link-to-home'>
          Home Page
        </Link>
      </div>

      <h2 className='flash-card-list-header'>Flash Card List</h2>
      <button className='btn btn-light' onClick={() => setEditingCard({})}>
        Create
      </button>
      <div className='flash-card-list-inputs'>
        <input
          className='form-control'
          type='text'
          placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='flash-card-list-selects btn btn-light'
        >
          <option value=''>All Statuses</option>
          <option value='Learned'>Learned</option>
          <option value='Want to Learn'>Want to Learn</option>
          <option value='Noted'>Noted</option>
        </select>

        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className='flash-card-list-selects btn btn-light'
        >
          <option value='lastModified'>Most Recent</option>
          <option value='front'>Front</option>
          <option value='back'>Back</option>
          <option value='status'>Status</option>
        </select>
      </div>

      <ul className='flash-card-list-ul'>
        {statusFilteredCards.map((card) => (
          <li key={card.id} className='flash-card-list-li'>
            <FlashCardItem card={card} />
            <div className='flash-card-list-buttons'>
              <button onClick={() => handleEditClick(card)}>Edit</button>
              <button onClick={() => handleDeleteClick(card.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editingCard && (
        <Modal
          isOpen={true}
          onRequestClose={() => setEditingCard(null)}
          contentLabel={
            editingCard.id ? 'Edit Flash Card' : 'Create Flash Card'
          }
          className='flash-card-list-modal'
        >
          <FlashCardForm
            initialData={editingCard}
            onFlashCardAdded={handleFlashCardAdded}
            onFlashCardUpdated={handleFlashCardUpdated}
          />
          <button onClick={() => setEditingCard(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default FlashCardList;
