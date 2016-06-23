import createReducer from '../utils/createReducer';
import {
        UPDATE_TOKEN,
        YOUR_TURN,
        UPDATE_CARD,
        INIT,
        PHERCHASE,
        CHECKOUT,
        TAKE_TOKEN,
        MY_TURN,
        } from '../actions/boardapp';

const initToken = { Emerald: 7, Sapphire: 7, Ruby: 7, Diamond: 7, Agate: 7, Gold: 5 };
const initUserToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };

export function curPlayer(state = false, action) {
  switch (action.type) {
    case YOUR_TURN: {
      return false;
    }
    case MY_TURN: {
      return true;
    }
    default: {
      return state ;
    }
  }
  return state;
}

export function tokenTaked(state = [], action) {
  switch (action.type) {
    case TAKE_TOKEN: {
      return [...state, action.token];
    }
    case YOUR_TURN: {
      return [];
    }
    default: {
      return state;
    }
  }
}

export function token(state = initToken, action) {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return action.tokens;
    }
    case TAKE_TOKEN: {
      const tokens = state;
      tokens[action.token]--;
      return tokens;
    }
    default: {
      return state;
    }
  }
}

export function userToken(state = initUserToken, action) {
  switch (action.type) {
    case TAKE_TOKEN: {
      const tokens = state;
      tokens[action.token]++;
      return tokens;
    }
    default: {
      return state;
    }
  }
}

