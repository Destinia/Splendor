import React, { Component, PropTypes } from 'react';

import '../css/cards.css';

class Desk extends Component {

  createCard(card, index) {
    const { purchase, userToken, currency, socket, preserveCard } = this.props;
    const checkout = (price) => {
      const owned = Object.keys(userToken).reduce((own, key) => {
        if (key !== 'Gold') {
          if (userToken[key] + currency[key] <= price[key]) {
            return own + price[key] - userToken[key] - currency[key];
          }
        }
        return own;
      }, 0);
      return (owned <= userToken.Gold);
    };
    const afforded = (checkout(card.price)) ? 'card' : 'card shortage';
    const renderToken = (token) => {
      if (card.price[token] !== 0) {
        return (
          <span className="suit">
            <span className={token}>&diams;</span>
            <span className="price">{card.price[token]}</span>
          </span>
          );
      }
      return;
    };
    const purchaseCard = () => { console.log('click'); purchase(card, index, socket); };
    const handleOndbclick = () => { console.log('preserveCard'); preserveCard(card, socket); };
    return (
      <li>
        <a className={afforded} onClick={purchaseCard}>
          <span className="rank">
            <span>{card.score}</span>
            <img src={`/public/images/card-type/${card.type}.png`} role="presentation" onDoubleClick={handleOndbclick} />
          </span>
          {Object.keys(card.price).map(renderToken, this)}
        </a>
      </li>
      );
  }

  render() {
    const { cards } = this.props;
    // var test_card = {type:
    // "Diamond",score:1,price:{Emerald:3,Sapphire:2,Ruby:1,Diamond:1,Agate:2,Gold:3}}
    return (
      <div className="playingCards fourColours rotateHand ">
        <ul className="table">
          {cards.top.map(this.createCard, this)}
        </ul>
        <ul className="table">
          {cards.mid.map(this.createCard, this)}
        </ul>
        <ul className="table">
          {cards.bot.map(this.createCard, this)}
        </ul>
      </div>

    );
  }
}

Desk.propTypes = {
  cards: PropTypes.object.isRequired,
  purchase: PropTypes.func.isRequired,
  userToken: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  preserveCard: PropTypes.func.isRequired,
};

export default Desk;
