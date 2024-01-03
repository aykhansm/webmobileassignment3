import React from 'react';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className='container mt-5'>
      <h2 className='contactUs'>Contact Us</h2>
      <ContactForm />
      <div className='mt-3 homeBtnDiv'>
        <Link to='/' className='btn btn-secondary '>
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
