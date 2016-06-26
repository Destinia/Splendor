import React, { Component, PropTypes } from 'react';

import '../css/Enemy.css';

const Enemy = (players) => {
  const testPlayer = { imgSrc: '/public/images/portrait/portrait1.jpg',
  token: { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 },
  currency: { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 },
  };
  const testPlayers = [testPlayer, testPlayer, testPlayer];
  const createEnemy = (enemy) => (
      <div className="player">
        <div className="img-region">
          <img src={enemy.imgSrc} role="presentation" />
        </div>
        <div className="token-region">
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
/*
  return (
    <div className="enemy">
      <div className="player">
        <div className="img-region">
          <img src="/public/images/portrait/portrait1.jpg" role="presentation" />
        </div>
        <div className="token-region">
          <div className="token-row">
            <span className="playerToken">
              <img src="/public/images/token/Emerald.png" role="presentation" />
              <span className="playerToken-count">{1}</span>
            </span>
            <span className="playerGem">
              <img src="/public/images/gems/Emerald.png" role="presentation" />
              <span className="playerToken-count">{1}</span>
            </span>
            <span className="playerToken">
              <img src="/public/images/token/Sapphire.png" role="presentation" />
              <span className="playerToken-count">{1}</span>
            </span>
            <span className="playerGem">
              <img src="/public/images/gems/Sapphire.png" role="presentation" />
              <span className="playerToken-count">{1}</span>
            </span>
          </div>
          <div className="token-row">
          </div>
          <div className="token-row">
          </div>
        </div>
      </div>
    </div>
  );
  */
  return (
    <div className="enemy">
      {testPlayers.map((player) => createEnemy(player))}
    </div>
  );
};

Enemy.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Enemy;
