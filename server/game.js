// TODO
/*
	object template?
	random draw
	token and currency
	justify money enough
	preserve card
	royal left to next commit

	card template
	{type:"Diamond",score:1,price:{token}}
*/

exports = module.exports = function createGame(id) {

/*****************private Data***********************/
  const deck = require('./Splendor.json');
  const token = () => ({ Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 });
  const users = [];
  let start = false;
  const sockets = [];
  const roomId = id;
  const win = 15;
  let curCard = { top: [], mid: [], bot: [], nobel: [] };
	// curUser = 4 for win
  let curUser = 0;

  const curToken = { Emerald: 7, Sapphire: 7, Ruby: 7, Diamond: 7, Agate: 7, Gold: 5 };


/** ****************Get Data Movement*******************/

  const getRoomId = () => roomId;

  const getCurSocket = () => sockets[curUser];

  const getUsers = () => users.map((user, index) =>
    (Object.assign({}, user, { curPlayer: (index === curUser) && start })));
  const getCurUser = () => {
    console.log(curUser);
    return users[curUser];
  };
  const getCurCard = () => ({ top: curCard.top, mid: curCard.mid, bot: curCard.bot });
  const getCurToken = () => curToken;
  const getNobel = () => curCard.nobel;

/** **************** Initialization movement *************/
  const createUser = () => (
    { id: users.length, token: token(), score: 0, currency: token(), name: users.length,
    imgSrc: `/public/images/portrait/portrait${users.length + 1}.jpg`,
    preserve: [],
    }
  );

  const addUser = (socket) => {
    users.push(createUser());
    sockets.push(socket);
    console.log(users.length, 'player mount');
    // users.forEach((user) => { console.log(user.socket.id); });
  };
  const drawCard = (where) => {
    // if (deck[where].length === 0) return 0;
    const rand = Math.floor(Math.random() * deck[where].length);
    const target = deck[where].splice(rand, 1);
    console.log('drawCard', target);
    console.log('test', deck[where].length);
    return target[0];
  };

  const init = () => {
    start = true;
    curUser = Math.floor(Math.random() * 4);
    curCard = {
      top: [drawCard('top'), drawCard('top'), drawCard('top'), drawCard('top')],
      mid: [drawCard('mid'), drawCard('mid'), drawCard('mid'), drawCard('mid')],
      bot: [drawCard('bot'), drawCard('bot'), drawCard('bot'), drawCard('bot')],
      nobel: [drawCard('nobel'), drawCard('nobel'), drawCard('nobel'),
      drawCard('nobel'), drawCard('nobel')],
    };
  };

/** *********************Util function**********************/
  const compareToken = (token1, token2) =>
    Object.keys(token1).reduce((prev, key) =>
      ((token1[key] === token2[key]) && prev)
    , true);
  const compareCard = (card1, card2) =>
    (card1.score === card2.score && card1.level === card2.level
      && card1.type === card2.type && compareToken(card1.price, card2.price));

  const nextTurn = () => { curUser = (curUser === users.length - 1) ? 0 : curUser + 1; };
  // assume front-end have checked
  const checkout = (card) => {
    users[curUser].currency[card.type] += 1;
    const need = Object.keys(card.price).reduce((owned, key) => {
      const price = card[key];
      if (key !== 'Gold') {
        const pay = price - users[curUser].currency[key];
        if (pay > 0) {
          if (pay <= users[curUser].token[key]) {
            users[curUser].token[key] -= pay;
            token[key] += pay;
          } else {
            token[key] += users[curUser].token[key];
            users[curUser].token[key] = 0;
            return owned + (price - users[curUser].token[key]);
          }
        }
      }
      return owned;
    }, 0);
    users[curUser].token.Gold -= need;
    token.Gold += need;
  };
	// TODO front_end render no card(null)
  const score = (card) => {
    users[curUser].score += card.score;
    if (users[curUser].score > win) {
      curUser = 4;
    }
  };

 /** ************End Turn movement*************/
  const takeToken = (types) => {
    if (types.length === 3) {
      types.forEach((type) => {
        curToken[type] -= 1;
        users[curUser].token[type] += 1;
      });
    } else if (types.length === 1) {
      curToken[types[0]] -= 2;
      users[curUser].token[types[0]] += 2;
    } else {
      console.log('error', types);
    }
    console.log(`Room ${roomId} user${curUser} take token`);
    nextTurn();
  };

  const takeCard = (card) => {
    checkout(card);
    score(card);
    const index = curCard[card.level].findIndex((c) => (compareCard(c, card)));
    if (deck[card.level].length !== 0) {
      curCard[card.level][index] = drawCard(card.level);
    } else {
      curCard[card.level].splice(index, 1);
    }
    console.log(`Room ${roomId} user${curUser} purchase card`);
    nextTurn();
		// token_back(price);
  };

  const preserveCard = (card) => {
    if (users[curUser].preserve.length < 3) {
      users[curUser].preserve.push(card);
      users[curUser].token.Gold++;
      curToken.Gold--;
      console.log(`Room ${roomId} user${curUser} preserve card`);
      const index = curCard[card.level].findIndex((c) => (compareCard(c, card)));
      console.log(index);
      if (deck[card.level].length !== 0) {
        curCard[card.level][index] = drawCard(card.level);
        console.log('new Card', curCard[card.level][index]);
      } else {
        curCard[card.level].splice(index, 1);
      }
      nextTurn();
    } else {
      console.log('illegal preserve');
    }
  };
  const takeNobel = (card, order) => {
    const pos = curCard.nobel.find((n) => (n === card));
    if (pos > 0) {
      curCard.nobel.splice(pos, 1);
      users[order].score += card.score;
      console.log(`Room ${roomId} user${curUser} take nobel`);
    } else {
      console.log('error take nobel');
    }
  };
	// do server need to know price?
	// return method
  return {
    init,
    getUsers,
    getCurUser,
    getCurCard,
    getCurToken,
    getNobel,
    takeCard,
    checkout,
    score,
    drawCard,
    takeToken,
    addUser,
    getRoomId,
    getCurSocket,
    takeNobel,
    preserveCard,
    compareCard,
    // for testing no allowed to take
    /*****
    deck,
    curToken,
    users,
    curCard,
    */
  };
};
