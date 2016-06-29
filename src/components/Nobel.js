import React, { Component, PropTypes } from 'react';

import '../css/cards.css';


const Nobel = ({ nobel, takeNobel }) => {
  const createCard = (card) => {
    const handleOnClick = () => { takeNobel(card); };
    const renderToken = (token) => {
      if (card.price[token] !== 0) {
        return (
          <span className="suit">
            <span className={token}>&diams;</span>
            <span className="price">{card.price[token]}</span>
          </span>
          );
      }
    };
    return (
      <li>
        <a className="card nobel" onClick={handleOnClick}>
          <span className="rank">{card.score}</span>
          {Object.keys(card.price).map(renderToken, this)}
        </a>
      </li>
      );
  };
  return (
    <div className="playingCards">
      <ul className="table">
        {nobel.map(createCard)}
      </ul>
    </div>
  );
};

Nobel.propTypes = {
  nobel: PropTypes.object.isRequired,
  takeNobel: PropTypes.func.isRequired,
};

export default Nobel;
