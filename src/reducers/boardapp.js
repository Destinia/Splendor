import {
        UPDATE_TOKEN,
        YOUR_TURN,
        UPDATE_CARD,
        INIT,
        TAKE_TOKEN,
        MY_TURN,
        UPDATE_PURCHASE,
        CLICK_ENEMY,
        RETURN_TOKEN,
        } from '../actions/boardapp';

const initToken = { Emerald: 7, Sapphire: 7, Ruby: 7, Diamond: 7, Agate: 7, Gold: 5 };
const initUserToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCurToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCard = { top: [], mid: [], bot: [] };
const initUserData = { name: '', img: '' };


export function inited(state = false, action) {
  if (action.type === INIT) {
    return true;
  }
  return false;
}

export function players(state = [], action) {
  switch (action.type) {
    case INIT: {
      // return state
      // temp test
      return action.players.map((player) =>
        ({ ...player, visible: false, curPlayer: false })
      );
    }
    case CLICK_ENEMY: {
      return state.map((player, index) => {
        if (index !== action.index) {
          return player;
        }
        return { ...player, visible: !player.visible };
      });
    }
    default: {
      return state;
    }
  }
}

export function userData(state = initUserData, action) {
  switch (action.type) {
    case INIT: {
      return action.userData;
    }
    default: {
      return state;
    }
  }
}

export function curPlayer(state = false, action) {
  switch (action.type) {
    case INIT: {
      console.log(action.curPlayer);
      return action.curPlayer;
    }
    case YOUR_TURN: {
      return false;
    }
    case MY_TURN: {
      return true;
    }
    case UPDATE_PURCHASE: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function tokenTaked(state = [], action) {
  switch (action.type) {
    case TAKE_TOKEN: {
      return [...state, action.token];
    }
    case YOUR_TURN: {
      return [];
    }
    case RETURN_TOKEN: {
      const remove = state.findIndex((tar) => (action.token === tar));
      return state.filter((tar, index) => (index !== remove));
    }
    default: {
      return state;
    }
  }
}

export function token(state = initToken, action) {
  switch (action.type) {
    case INIT: {
      return action.token;
    }
    case UPDATE_TOKEN: {
      return action.tokens;
    }
    case TAKE_TOKEN: {
      return { ...state, [action.token]: state[action.token] - 1 };
    }
    case RETURN_TOKEN: {
      return { ...state, [action.token]: state[action.token] + 1 };
    }
    case UPDATE_PURCHASE: {
      return action.token;
    }
    default: {
      return state;
    }
  }
}

export function currency(state = initCurToken, action) {
  switch (action.type) {
    case UPDATE_PURCHASE: {
      return state[action.card.type] + 1;
    }
    default: {
      return state;
    }
  }
}

export function userToken(state = initUserToken, action) {
  switch (action.type) {
    case TAKE_TOKEN: {
      return { ...state, [action.token]: state[action.token] + 1 };
    }
    case UPDATE_PURCHASE: {
      return action.userToken;
    }
    case RETURN_TOKEN: {
      return { ...state, [action.token]: state[action.token] - 1 };
    }
    default: {
      return state;
    }
  }
}

export function cards(state = initCard, action) {
  switch (action.type) {
    case INIT: {
      return action.cards;
    }
    case UPDATE_CARD: {
      return action.cards;
    }
    default: {
      return state;
    }
  }
}

export function nobel(state = [], action) {
  switch (action.type) {
    case INIT: {
      return action.nobel;
    }
    default: {
      return state;
    }
  }
}
