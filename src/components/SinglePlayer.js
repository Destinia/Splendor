import React, { Component, PropTypes } from 'react';

import '../css/Enemy.css';
const SinglePlayer = ({ enemy, handleOnclick }) => {
  const display = (enemy.visible) ? 'token-region' : 'token-region invisible';
  return (
    <div className="player">
      <div className="img-region" onClick={handleOnclick}>
        <img src={enemy.imgSrc} role="presentation" />
      </div>
      <div className={display}>
        <div className="token-row">
          <span className="playerToken">
            <img src="/public/images/token/Emerald.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Emerald}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Emerald.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Emerald}</span>
          </span>
          <span className="playerToken">
            <img src="/public/images/token/Sapphire.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Sapphire}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Sapphire.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Sapphire}</span>
          </span>
        </div>
        <div className="token-row">
          <span className="playerToken">
            <img src="/public/images/token/Ruby.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Ruby}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Ruby.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Ruby}</span>
          </span>
          <span className="playerToken">
            <img src="/public/images/token/Diamond.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Diamond}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Diamond.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Diamond}</span>
          </span>
        </div>
        <div className="token-row">
          <span className="playerToken">
            <img src="/public/images/token/Agate.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Agate}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Agate.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Agate}</span>
          </span>
          <span className="playerToken">
            <img src="/public/images/token/Gold.png" role="presentation" />
            <span className="playerToken-count">{enemy.token.Gold}</span>
          </span>
          <span className="playerGem">
            <img src="/public/images/gems/Gold.png" role="presentation" />
            <span className="playerToken-count">{enemy.currency.Gold}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

SinglePlayer.propTypes = {
  enemy: PropTypes.object.isRequired,
  handleOnclick: PropTypes.func.isRequired,
};

export default SinglePlayer;
