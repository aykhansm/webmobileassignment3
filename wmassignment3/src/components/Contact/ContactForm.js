import React, { useState } from 'react';
import api from '../../api';
import './ContactForm.css';

const ContactForm = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const messageData = {
      subject,
      email,
      content,
    };

    try {
      await api.createMessage(messageData);

      setSubject('');
      setEmail('');
      setContent('');
      setSubmissionError(null);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmissionError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='contact-form' onSubmit={handleFormSubmit}>
      <div className='form-group'>
        <label htmlFor='subject' className='form-label'>
          Subject:
        </label>
        <input
          type='text'
          id='subject'
          className='form-input'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email' className='form-label'>
          Email:
        </label>
        <input
          type='email'
          id='email'
          className='form-input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='content' className='form-label'>
          Content:
        </label>
        <textarea
          id='content'
          className='form-textarea'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='form-button' disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {submissionError && <p className='error-message'>{submissionError}</p>}
    </form>
  );
};

export default ContactForm;
