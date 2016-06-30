import React, { Component, PropTypes } from 'react';
import Desk from './Desk';
import Token from './Token';
import Hand from './Hand';
import Nobel from './Nobel';
import Enemy from './Enemy';

class BoardApp extends Component {

  componentDidMount() {
    const { socket, init, updateToken, roomId, full, addPlayer, updateUserData, nextTurn, userName } = this.props;
    const { router } = this.context;
    console.log(roomId);
    // socket.join(roomId);
    socket.emit('mount', userName, roomId);
    socket.on('shouldToLobby', () => { router.push('/Lobby'); });
    socket.on('full', full);// route back to lobby
    socket.on('init', (data) => { init(data); });
    socket.on('nextTurn', (data) => { nextTurn(data); });
    socket.on('test', (data) => { console.log(data); });
    socket.on('token', (data) => { updateToken(data.token); });
    socket.on('addUser', (data) => { addPlayer(data); });
    socket.on('onTheTable', (data) => {
      updateUserData({ userData: data[data.length - 1], order: data.length - 1 });
      addPlayer(data);
    });
    socket.on('GameBreak', () => { router.push('/Lobby'); });
  }

  helpButton() {
    const Width = 800;
    const Height = 800;
    const Top = (window.screen.availHeight - 30 - Height) / 2;
    const Left = (window.screen.availWidth - 10 - Width) / 2;
    window.open('/helpMessage', 'helpMessage',
      `toolbar=0,status=0,width=${Width},height=${Height},left=${Left}top=${Top}`);
  }
  // <button>{(curPlayer) ? 'me' : 'others'}</button>

  render() {
    const { purchase, cards, nobel, token, takeToken, userToken, currency, preserved, preserveCard,
      curPlayer, players, clickEnemy, userData, returnToken, socket, score, takeNobel } = this.props;
    return (
      <div className="background">
        <div className="container-fluid fix">
          <div className="row desk-region">
            <div className="col-sm-3 enemy-region">
              <Enemy players={players} clickEnemy={clickEnemy} />
            </div>
            <div className="col-sm-5 cards-region">
              <Desk
                purchase={purchase} cards={cards} userToken={userToken}
                currency={currency} socket={socket} preserveCard={preserveCard}
              />
            </div>
            <div className="col-sm-2">
              <Nobel nobel={nobel} takeNobel={takeNobel} />
            </div>
            <div className="col-sm-2">
              <img src="/public/images/helpButton.ico" role="presentation" className="help-button" onClick={this.helpButton} />
              <Token token={token} takeToken={takeToken} socket={socket} />
            </div>
          </div>
          <div className="row user-region">
            <div className="container-fluid">
              <Hand
                currency={currency} userToken={userToken} score={score}
                userData={userData} curPlayer={curPlayer} returnToken={returnToken}
                socket={socket} purchase={purchase} preserved={preserved}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BoardApp.propTypes = {
  inited: PropTypes.bool.isRequired,
  curPlayer: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  tokenTaked: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  userToken: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  cards: PropTypes.object.isRequired,
  nobel: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  updateToken: PropTypes.func.isRequired,
  myTurn: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  takeToken: PropTypes.func.isRequired,
  purchase: PropTypes.func.isRequired,
  clickEnemy: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  returnToken: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  full: PropTypes.func.isRequired,
  updatePlayers: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  nextTurn: PropTypes.func.isRequired,
  takeNobel: PropTypes.func.isRequired,
  preserved: PropTypes.array.isRequired,
  preserveCard: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

BoardApp.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default BoardApp;
