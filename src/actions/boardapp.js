export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const YOUR_TURN = 'YOUR_TURN';
export const MY_TURN = 'MY_TURN';
export const UPDATE_CARD = 'UPDATE_CARD';
export const INIT = 'INIT';
export const CHECKOUT = 'CHECKOUT';
export const TAKE_TOKEN = 'TAKE_TOKEN';
export const RETURN_TOKEN = 'RETURN_TOKEN';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';
export const UPDATE_PURCHASE = 'UPDATE_PURCHASE';
export const CLICK_ENEMY = 'CLICK_ENEMY';
export const NEXT_TURN = 'NEXT_TURN';
export const FULL = 'FULL';
export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_USERDATA = 'UPDATE_USERDATA';
export const TAKE_NOBEL = 'TAKE_NOBEL';

export const updateToken = (tokens) => ({ type: UPDATE_TOKEN, tokens });

export const yourTurn = () => ({ type: YOUR_TURN });

export const myTurn = () => ({ type: MY_TURN });

export const updateCard = (card) => ({ type: UPDATE_CARD, card });

export const clickEnemy = (index) => ({ type: CLICK_ENEMY, index });

export const full = () => ({ type: FULL });

export const nextTurn = (data) =>
  (dispatch, getState) => {
    const { order } = getState();
    dispatch({ type: NEXT_TURN, ...data,
      players: data.players.filter((player) => (player.id !== order)) });
    if (data.players[order].curPlayer) {
      dispatch(myTurn());
    }
  };

const updateAddPlayer = (players) => ({ type: ADD_PLAYER, players });

export const init = (data) =>
  (dispatch, getState) => {
    const { order } = getState();
    dispatch({ type: INIT, ...data,
      players: data.players.filter((player) => (player.id !== order)), inited: true });
    if (data.players[order].curPlayer) {
      dispatch(myTurn());
    }
  };


export const addPlayer = (players) =>
  (dispatch, getState) => {
    const { order } = getState();
    dispatch(updateAddPlayer(players.filter((player, index) => (order !== index))));
  };

export const updateUserData = (data) => ({ type: UPDATE_USERDATA, ...data });

const updateTokenTaked = (type) => ({ type: TAKE_TOKEN, token: type });

export const takeToken = (type, socket) =>
  (dispatch, getState) => {
    const { tokenTaked, token, curPlayer, roomId } = getState();
    if (curPlayer && type !== 'Gold') {
      switch (tokenTaked.length) {
        case 0:
          if (token[type] !== 0) {
            dispatch(updateTokenTaked(type));
          }
          break;
        case 1:
          if (token[type] !== 0) {
            if (type === tokenTaked[0]) {
              // tokenTaked.push(type);
              dispatch(updateTokenTaked(type));
              socket.emit('takeToken', [type], roomId);
              dispatch(yourTurn());
            } else {
              dispatch(updateTokenTaked(type));
            }
          }
          break;
        case 2:
          if (token[type] !== 0) {
            if (type !== tokenTaked[0] && type !== tokenTaked[1]) {
              dispatch(updateTokenTaked(type));
              socket.emit('takeToken', [...tokenTaked, type], roomId);
              dispatch(yourTurn());
            }
          }
          break;
        default:
          return;
      }
    }
  };

const updateTokenReturn = (type) => ({ type: RETURN_TOKEN, token: type });

export const returnToken = (type) =>
  (dispatch, getState) => {
    const { curPlayer, tokenTaked } = getState();
    if (curPlayer) {
      if (tokenTaked.findIndex((tar) => (tar === type)) > 0) {
        dispatch(updateTokenReturn(type));
      }
    }
  };

const checkout = (price, userToken, currency) => {
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

const updatePurchase = (card, userToken, token) =>
  ({ type: UPDATE_PURCHASE, card, userToken, token });

export const purchase = (card, index, socket) =>
  (dispatch, getState) => {
    const { userToken, currency, curPlayer, tokenTaked, token, roomId } = getState();
    if (curPlayer && tokenTaked.length === 0 && checkout(card.price, userToken, currency)) {
      const need = card.price.reduce((owned, price) => {
        const key = price.key;
        if (key !== 'Gold') {
          const pay = price - currency[key];
          if (pay > 0) {
            if (pay <= userToken[key]) {
              userToken[key] -= pay;
              token[key] += pay;
            } else {
              token[key] += userToken[key];
              userToken[key] = 0;
              return owned + (pay - userToken[key]);
            }
          }
        }
        return owned;
      }, 0);
      userToken.Gold -= need;
      token.Gold += need;
      dispatch(updatePurchase(card, userToken, token));
      socket.emit('card', { card, level: card.level, index }, roomId);
    }
  };

export const takeNobel = (nobel, socket) =>
  (dispatch, getState) => {
    const { currency, roomId } = getState();
    const enough = Object.keys(nobel.price).reduce((prev, key) => {
      if (prev && currency[key] >= nobel.price[key]) {
        return true;
      }
      return false;
    }, true);
    if (enough) {
      dispatch({ type: TAKE_NOBEL, nobel });
      socket.emit('nobel', nobel, roomId);
    }
  };

