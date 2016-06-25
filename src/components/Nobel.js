import React, { Component, PropTypes } from 'react';

import '../css/cards.css';


class Nobel extends Component {
  createCard(card) {
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
        <a className="card nobel">
          <span className="rank">{card.score}</span>
          {Object.keys(card.price).map(renderToken, this)}
        </a>
      </li>
      );
  }

  render() {
    const nobel = this.props.nobel;

    return (
      <div className="playingCards">
        <ul className="table">
          {nobel.map(this.createCard)}
        </ul>

      </div>

      );
  }
}

Nobel.propTypes = {
  nobel: PropTypes.object.isRequired,
};

export default Nobel;
