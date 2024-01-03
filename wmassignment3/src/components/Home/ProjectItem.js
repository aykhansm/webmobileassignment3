import React from 'react';

const ProjectItem = ({ title, description, link }) => {
  return (
    <li className='project-item'>
      <strong>{title}:</strong> {description} (
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Go
      </a>
      )
    </li>
  );
};

export default ProjectItem;
