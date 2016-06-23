import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import Desk from './Desk';
import Token from './Token';
import Hand from './Hand';
import Nobel from './Nobel';
const socket = io('localhost:8080', { path: '/api/game' });


import '../css/BoardApp.css';

class BoardApp extends React.Component {
  constructor(props, context) {
    super(props, context);

    const initCard = {
      type: 'Diamond', score: 1,
      price: { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 },
    };

    this.state = {
      inited: false,
      curPlayer: false,
      name: '',
      score: 0,
      tokenTaked: [],
      token: {
        Emerald: 7,
        Sapphire: 7,
        Ruby: 7,
        Diamond: 7,
        Agate: 7,
        Gold: 5,
      },
      currency: {
        Emerald: 0,
        Sapphire: 0,
        Ruby: 0,
        Diamond: 0,
        Agate: 0,
        Gold: 0,
      },
      userToken: {
        Emerald: 0,
        Sapphire: 0,
        Ruby: 0,
        Diamond: 0,
        Agate: 0,
        Gold: 0,
      },
      players: {
      },
      cards: {
        top: [initCard, initCard, initCard, initCard],
        mid: [initCard, initCard, initCard, initCard],
        bot: [initCard, initCard, initCard, initCard],
      },
      nobel: {
      },
    };
  }

  componentDidMount() {
    socket.emit('mount', {});
    socket.on('init', this.init.bind(this));
    socket.on('drawcard', this.drawCard.bind(this));
    socket.on('test', (data) => { console.log(data); });
    socket.on('yourturn', this.yourturn.bind(this));
    socket.on('token', this.updateToken.bind(this));
  }

  updateToken(data) {
    this.setState({ token: data.token });
  }

  yourturn() {
    console.log('myturn');
    this.setState({ curPlayer: true });
  }
  drawCard(data) {
    console.log('yaaaaa', data);
    this.setState({ cards: data.cards, userToken: data.token });
  }

  init(data) {
    console.log(data);
    this.setState({ inited: true, players: data.players, name: data.name, cards: data.cards,
                  token: data.token, nobel: data.nobel, curPlayer: data.curPlayer });
  }

  perchase(card, index) {
    // identify money
    if (this.state.curPlayer && this.state.tokenTaked.length === 0 && this.checkout(card.price)) {
      const cur = this.state.currency;
      cur[card.type]++;
      this.setState({ currency: cur, curPlayer: false });
      socket.emit('card', { card, level: card.level, index });
    }
  }

  checkout(price) {
    const { userToken, currency } = this.state;
    const owned = userToken.reduce((own, p) => {
      const key = p.key;
      if (key !== 'Gold') {
        if (p + currency[key] <= price[key]) {
          return own + price[key] - p - currency[key];
        }
      }
      return own;
    }, 0);
    return (owned <= userToken.Gold);
  }

  takeToken(type) {
    const tokenTaked = this.state.tokenTaked;
    const token = this.state.token;
    const userToken = this.state.userToken;
    if (this.state.curPlayer) {
      // check over?
      switch (tokenTaked.length) {
        case 0:
          if (this.state.token[type] !== 0) {
            tokenTaked.push(type);
            token[type]--;    
            userToken[type]++;
            this.setState({ token, userToken, tokenTaked });
          }
          break;
        case 1:
          if (this.state.token[type] !== 0) {
            if (type === tokenTaked[0]) {
              // tokenTaked.push(type);
              token[type]--;
              userToken[type]++;
              socket.emit('takeToken', [type]);
              this.setState({ token, userToken, curPlayer: false, tokenTaked: [] });
            } else {
              tokenTaked.push(type);
              token[type]--;
              userToken[type]++;
              this.setState({ token, userToken, tokenTaked });
            }
          }
          break;
        case 2:
          if (this.state.token[type] !== 0) {
            if (type !== tokenTaked[0] && type !== tokenTaked[1]) {
              tokenTaked.push(type);
              token[type]--;
              userToken[type]++;
              socket.emit('takeToken', tokenTaked);
              this.setState({ token, userToken, curPlayer: false, tokenTaked: [] });
            }
          }
          break;

        default:
          throw (err);
      }
    }
  }

  render() {
    if (this.state.inited) {
      return (
        <div className="background">
          <div className="container-fluid fix">
            <div className="row desk-region">
              <div className="col-sm-2">
                <button onClick={this.perchase.bind(this)}>{(this.state.curPlayer) ? 'me' : 'others'}</button>
              </div>
              <div className="col-sm-5">
                <Desk cards={this.state.cards} perchase={this.perchase.bind(this)} checkout={this.checkout.bind(this)}/>
              </div>
              <div className="col-sm-3">
                <Nobel nobel={this.state.nobel}/>
              </div>
              <div className="col-sm-2">
                <Token token={this.state.token} takeToken={this.takeToken.bind(this)}/>
              </div>
            </div>
            <div className="row user-region">
            <div className="container-fluid">
              <Hand currency={this.state.currency} userToken={this.state.userToken} />
            </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="background fix loading">
      </div>
    );
  }

}

export default BoardApp;