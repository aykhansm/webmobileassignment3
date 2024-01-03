import React from 'react';
import ProjectItem from './ProjectItem';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <div className='home-container'>
      <h1>Welcome to the Flash Card App for Web and Mobile Assignment 3</h1>
      <p>
        This app allows you to create, view, edit, and delete flash cards for
        learning and memorization.
      </p>

      <h2>Projects I made in this class:</h2>
      <ul className='project-list'>
        <ProjectItem
          title='Assignment 1'
          description='This is a personal website containing my portfolio'
          link='https://aykhansm.github.io/webmobilep1/'
        />
        <ProjectItem
          title='Assignment 2'
          description='This web application allows users to view a list of products, search for specific items, and filter products by category. Additionally, users can click on a product to view its details.'
          link='https://aykhansm.github.io/webmobileassignment2/'
        />
      </ul>

      <div className='navigation-link'>
        <Link to='/flash-cards'>Go to Flash Cards</Link>
      </div>

      <div className='navigation-link'>
        <Link to='/contact'>Contact Us</Link>
      </div>
    </div>
  );
};

export default Home;
