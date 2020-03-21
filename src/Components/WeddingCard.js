import React from 'react';
import '../App.css';

const WeddingCard = props => {
  return (
    <div className='card-container'>
      <div className='wedding-card'>
        <div className='wedding-card-front'>
          <img src={props.image} alt='wedding-img' />
          <div className='description'>
            <p>{props.description}</p>
          </div>
        </div>
        <div className='wedding-card-back'>
          <div className='text-container'>
            <p>Location: {props.location}</p>
            <p>Theme: {props.theme}</p>
            <p>Vendors: {props.vendors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingCard;
