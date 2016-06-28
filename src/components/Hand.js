import React, { PropTypes } from 'react';

import '../css/Hand.css';
import '../css/cards.css';


const Hand = ({ userToken, currency, userData, curPlayer, returnToken, score, purchase, socket, preserved }) => {
  const handleClick = (type) => () => returnToken(type);
  // const testCard = {"price":{"Diamond":0,"Sapphire":3,"Emerald":0,"Ruby":0,"Agate":0},"score":0,"level":"bot","type":"Diamond"};
  const createCard = (card) => {
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
    const purchaseCard = () => { purchase(card, -1, socket); };
    return (
      <li>
        <a className={afforded} onClick={purchaseCard}>
          <span className="rank">
            <span>{card.score}</span>
            <img src={`/public/images/card-type/${card.type}.png`} role="presentation" />
          </span>
          {Object.keys(card.price).map(renderToken, this)}
        </a>
      </li>
      );
  };
  return (
    <div className="row user-region">
      <div className="col-sm-1">
        <div className="user-img-region">
          <img src={userData.imgSrc} role="presentation" className={(curPlayer) ? '' : 'transparent'} />
          <h2 className="score">{`score: ${score}`}</h2>
        </div>
      </div>
      <div className="col-sm-2">
        <div className="playingCards">
          <ul className="preserve">
            {preserved.map(createCard)}
          </ul>
        </div>
      </div>
      <div className="col-sm-1 gem first">
        <div className="currency">
          <img src="/public/images/gems/Emerald.png" role="presentation" />
          <span>{currency.Emerald}</span>
        </div>
        <div className="token" onClick={handleClick('Emerald')}>
          <img src="/public/images/token/Emerald.png" role="presentation" />
          <span>{userToken.Emerald}</span>
        </div>
      </div>
      <div className="col-sm-1 gem">
        <div className="currency">
          <img src="/public/images/gems/Sapphire.png" role="presentation" />
          <span>{currency.Sapphire}</span>
        </div>
        <div className="token" onClick={handleClick('Sapphire')}>
          <img src="/public/images/token/Sapphire.png" role="presentation" />
          <span>{userToken.Sapphire}</span>
        </div>
      </div>
      <div className="col-sm-1 gem">
        <div className="currency">
          <img src="/public/images/gems/Ruby.png" role="presentation" />
          <span>{currency.Ruby}</span>
        </div>
        <div className="token" onClick={handleClick('Ruby')}>
          <img src="/public/images/token/Ruby.png" role="presentation" />
          <span>{userToken.Ruby}</span>
        </div>
      </div>
      <div className="col-sm-1 gem">
        <div className="currency">
          <img src="/public/images/gems/Diamond.png" role="presentation" />
          <span>{currency.Diamond}</span>
        </div>
        <div className="token" onClick={handleClick('Diamond')}>
          <img src="/public/images/token/Diamond.png" role="presentation" />
          <span>{userToken.Diamond}</span>
        </div>
      </div>
      <div className="col-sm-1 gem">
        <div className="currency">
          <img src="/public/images/gems/Agate.png" role="presentation" />
          <span>{currency.Agate}</span>
        </div>
        <div className="token" onClick={handleClick('Agate')}>
          <img src="/public/images/token/Agate.png" role="presentation" />
          <span>{userToken.Agate}</span>
        </div>
      </div>
      <div className="col-sm-1 gem">
        <div className="currency">
          <img src="/public/images/gems/Gold.png" role="presentation" />
          <span>{currency.Gold}</span>
        </div>
        <div className="token">
          <img src="/public/images/token/Gold.png" role="presentation" />
          <span>{userToken.Gold}</span>
        </div>
      </div>
      <div className="col-sm-3">
        {/* render chat room */}
      </div>
    </div>
  );
};

Hand.propTypes = {
  userToken: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  curPlayer: PropTypes.bool.isRequired,
  returnToken: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  purchase: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  preserved: PropTypes.array.isRequired,
};
export default Hand;
