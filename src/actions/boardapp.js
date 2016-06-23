export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const YOUR_TURN = 'YOUR_TURN';
export const MY_TURN = 'MY_TURN';
export const UPDATE_CARD = 'UPDATE_CARD';
export const INIT = 'INIT';
export const PHERCHASE = 'PHERCHASE';
export const CHECKOUT = 'CHECKOUT';
export const TAKE_TOKEN = 'TAKE_TOKEN';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';

export const updateToken = (tokens) => ({ type: UPDATE_TOKEN, tokens });

export const yourTurn = () => ({ type: YOUR_TURN });

export const myTurn = () => ({ type: MY_TURN });

export const updateCard = (card) => ({ type: UPDATE_CARD, card });

export const init = (data) => ({ type: INIT, data: { ...data, inited: true } });

export const pherchase = (card, index) => ({ type: PHERCHASE, card, index });

export const checkout = (price) => ({ type: CHECKOUT, price });

const updateTokenTaked = (type) => ({ type: TAKE_TOKEN, token: type });

export const takeToken = (type, socket) =>
  (dispatch, getState) => {
    const { tokenTaked, token, userToken, curPlayer } = getState();
    if (curPlayer) {
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
              socket.emit('takeToken', [type]);
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
              socket.emit('takeToken', tokenTaked);
              dispatch(yourTurn());
            }
          }
          break;
        default:
          return;
      }
    }
  };

