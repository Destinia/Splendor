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
        UPDATE_PLAYERS,
        FULL,
        ADD_PLAYER,
        UPDATE_USERDATA,
        } from '../actions/boardapp';

const initToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initUserToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCurToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCard = { top: [], mid: [], bot: [] };
const initUserData = { name: '', img: '' };


export function inited(state = true, action) {
  switch (action.type) {
    case INIT: {
      return true;
    }
    case FULL: {
      return false;
    }
    default: {
      return state;
    }
  }
}

export function roomId(state = 'test', action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export function players(state = [], action) {
  switch (action.type) {
    case CLICK_ENEMY: {
      return state.map((player, index) => {
        if (index !== action.index) {
          return player;
        }
        return { ...player, visible: !player.visible };
      });
    }
    case UPDATE_PLAYERS: {
      return action.players.map((player, index) =>
        ({ ...player, visible: state[index].visible })
      );
    }
    case ADD_PLAYER: {
      return action.players.map((player) =>
        ({ ...player, visible: true })
      );
    }
    default: {
      return state;
    }
  }
}

export function userData(state = initUserData, action) {
  switch (action.type) {
    case UPDATE_USERDATA: {
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

export function order(state = 0, action) {
  switch (action.type) {
    case UPDATE_USERDATA: {
      return action.order;
    }
    default: {
      return state;
    }
  }
}
