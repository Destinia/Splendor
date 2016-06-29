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
        NEXT_TURN,
        TAKE_NOBEL,
        PRESERVE_CARD,
        UPDATE_PRESERVED,
        RETURN_TOKEN_OVER,
        } from '../actions/boardapp';
/** ****initial value********/
const initToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initUserToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCurToken = { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 };
const initCard = { top: [], mid: [], bot: [] };
const initUserData = { name: '', img: '' };
/** ******util function**********/
const compareToken = (token1, token2) =>
  Object.keys(token1).reduce((prev, key) =>
    ((token1[key] === token2[key]) && prev)
  , true);
const compareCard = (card1, card2) =>
  (card1.score === card2.score && card1.level === card2.level
    && card1.type === card2.type && compareToken(card1.price, card2.price));

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
    case INIT: {
      return action.players.map((player) =>
        ({ ...player, visible: true })
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
    case NEXT_TURN: {
      return action.players.map((player, index) =>
        ({ ...player, visible: state[index].visible })
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
    case YOUR_TURN: {
      return false;
    }
    case MY_TURN: {
      return true;
    }
    case UPDATE_PURCHASE: {
      return false;
    }
    case PRESERVE_CARD: {
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
    case MY_TURN: {
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
    case NEXT_TURN: {
      return action.token;
    }
    case PRESERVE_CARD: {
      return { ...state, Gold: (state.Gold) ? state.Gold - 1 : 0 };
    }
    default: {
      return state;
    }
  }
}

export function currency(state = initCurToken, action) {
  switch (action.type) {
    case UPDATE_PURCHASE: {
      return { ...state, [action.card.type]: state[action.card.type] + 1 };
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
    case PRESERVE_CARD: {
      return { ...state, Gold: (state.Gold) ? state.Gold + 1 : 0 };
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
    case NEXT_TURN: {
      if (action.cards) {
        return action.cards;
      }
      return state;
    }
    case PRESERVE_CARD: {
      return {
        top: state.top.filter((card) => (!compareCard(card, action.card))),
        mid: state.mid.filter((card) => (!compareCard(card, action.card))),
        bot: state.bot.filter((card) => (!compareCard(card, action.card))),
      };
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
    case NEXT_TURN: {
      if (action.nobel) {
        return action.nobel;
      }
      return state;
    }
    case TAKE_NOBEL: {
      return state.filter((tar, index) => (index !== action.nobel));
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

export function score(state = 0, action) {
  switch (action.type) {
    case UPDATE_PURCHASE: {
      return state + action.card.score;
    }
    default: {
      return state;
    }
  }
}

export function preserved(state = [], action) {
  switch (action.type) {
    case PRESERVE_CARD: {
      return [...state, action.card];
    }
    case UPDATE_PRESERVED: {
      return state.filter((card) => (!compareCard(card, action.card)));
    }
    default: {
      return state;
    }
  }
}

export function returnedToken(state = [], action) {
  switch (action.type) {
    case RETURN_TOKEN_OVER: {
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
