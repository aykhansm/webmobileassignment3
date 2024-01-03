import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import FlashCards from './components/FlashCards/FlashCards';
import ContactPage from './components/Contact/ContactPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/flash-cards/*' element={<FlashCards />} />
          <Route path='/contact/' element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
