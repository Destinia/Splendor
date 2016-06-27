import React, { Component, PropTypes } from 'react';
import SinglePlayer from './SinglePlayer'

import '../css/Enemy.css';

const Enemy = ({ players, clickEnemy }) => {
  console.log(players);

  const createEnemy = (enemy, index) => {
    const handleOnclick = () => { clickEnemy(index); };
    return (<SinglePlayer enemy={enemy} handleOnclick={handleOnclick} index={index} />);
  };

  return (
    <div className="enemy">
      {players.map((player, index) => createEnemy(player, index))}
    </div>
  );
};
// {testPlayers.map((player, index) => createEnemy(player, index))}
// const Enemy = () => (<div></div>);
/*
      <SinglePlayer players={players} clickEnemy={clickEnemy} index={0} />
      <SinglePlayer players={players} clickEnemy={clickEnemy} index={1} />
      <SinglePlayer players={players} clickEnemy={clickEnemy} index={2} />
*/


Enemy.propTypes = {
  players: PropTypes.array.isRequired,
  clickEnemy: PropTypes.func.isRequired,
};



export default Enemy;
