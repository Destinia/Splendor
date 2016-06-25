import React, { Component, PropTypes } from 'react';
import Desk from './Desk';
import Token from './Token';
import Hand from './Hand';
import Nobel from './Nobel';


import '../css/BoardApp.css';

class BoardApp extends Component {

  componentDidMount() {
    const { socket, init, updateCard, yourTurn, updateToken } = this.props;
    socket.emit('mount', {});
    socket.on('init', (data) => { init(data); });
    socket.on('drawcard', (data) => { updateCard(data.card); updateToken(data.token); });
    socket.on('test', (data) => { console.log(data); });
    socket.on('yourturn', yourTurn);
    socket.on('token', (data) => { updateToken(data.token); });
  }

  render() {
    const { purchase, cards, nobel, token, takeToken, userToken, currency } = this.props;
    return (
      <div className="background">
        <div className="container-fluid fix">
          <div className="row desk-region">
            <div className="col-sm-2">
              <button>{(this.state.curPlayer) ? 'me' : 'others'}</button>
            </div>
            <div className="col-sm-5">
              <Desk purchase={purchase} cards={cards} />
            </div>
            <div className="col-sm-3">
              <Nobel nobel={nobel} />
            </div>
            <div className="col-sm-2">
              <Token token={token} takeToken={takeToken} />
            </div>
          </div>
          <div className="row user-region">
            <div className="container-fluid">
              <Hand currency={currency} userToken={userToken} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BoardApp.propTypes = {
  inited: PropTypes.boolean.isRequired,
  curPlayer: PropTypes.boolean.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  tokenTaked: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  userToken: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  nobel: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  updateToken: PropTypes.func.isRequired,
  yourTurn: PropTypes.func.isRequired,
  myTurn: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  takeToken: PropTypes.func.isRequired,
  purchase: PropTypes.func.isRequired,
};

export default BoardApp;