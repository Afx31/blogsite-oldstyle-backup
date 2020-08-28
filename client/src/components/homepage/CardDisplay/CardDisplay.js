import React from 'react';
import './CardDisplay.css';
import { Link } from 'react-router-dom';

const CardDisplay = ({ id, car, thumbnail, heading, description }) => {
  return (
    <>
      <div className='card-container'>
        <div className='layer' />
        <img className='cd-img' src={thumbnail} alt='thumbnail' />
        <div className='inner-stuff'>
          <h1>{heading}</h1>
          <p>{description}</p>
          <Link to={`/viewpost/${car}/${id}`}>
            <button className='btn readmore-btn'>
              READ MORE <i className='fas fa-arrow-right' />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardDisplay;
