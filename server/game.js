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

const Deck = require('./Splendor.json');

exports = module.exports = function createGame(id) {
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
  const deck = Deck;
  const createUser = () => (
    { id: users.length, token: token(), score: 0, currency: token(),
    imgSrc: `/public/images/portrait/portrait${users.length + 1}.jpg` }
  );
  const getRoomId = () => roomId;
  const addUser = (socket) => {
    users.push(createUser());
    sockets.push(socket);
    // users.forEach((user) => { console.log(user.socket.id); });
  };
  const getCurSocket = () => sockets[curUser];

  const getUsers = () => users.map((user, index) =>
    (Object.assign({}, user, { curPlayer: (index === curUser) && start })));
  const getCurUser = () => {
    console.log(curUser);
    return users[curUser];
  };
  const nextTurn = () => { curUser = (curUser === users.length - 1) ? 0 : curUser + 1; };
  const getCurCard = () => ({ top: curCard.top, mid: curCard.mid, bot: curCard.bot });
  const getCurToken = () => curToken;
  const getNobel = () => curCard.nobel;

  const drawCard = (where) => {
    // if (deck[where].length === 0) return 0;
    const rand = Math.floor(Math.random() * deck[where].length);
    const target = deck[where][rand];
    deck[where][rand] = deck[where][deck[where].length - 1];
    deck[where].pop();
    return target;
  };

  const initDraw = () => {
    start = true;
    curCard = {
      top: [drawCard('top'), drawCard('top'), drawCard('top'), drawCard('top')],
      mid: [drawCard('mid'), drawCard('mid'), drawCard('mid'), drawCard('mid')],
      bot: [drawCard('bot'), drawCard('bot'), drawCard('bot'), drawCard('bot')],
      nobel: [drawCard('nobel'), drawCard('nobel'), drawCard('nobel'),
      drawCard('nobel'), drawCard('nobel')],
    };
  };

  const checkout = (card) => {
    users[curUser].currency[card.type] += 1;
    const need = card.price.reduce((owned, price) => {
      const key = price.key;
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

  const takeToken = (types) => {
    if (types.length === 3) {
      types.forEach((type) => {
        curToken[type] -= 1;
        users[curUser].token[type] += 1;
      });
    } else if (types.length === 1) {
      curToken[types[0]] -= 2;
      users[curUser].token[types[0]] += 2;
    }
  };
  const takeCard = (pos, index) => {
    checkout(curCard[pos][index]);
    score(curCard[pos][index]);
    if (deck[pos].length !== 0) {
      curCard[pos][index] = drawCard(pos);
    } else {
      curCard[pos].splice(index, 1);
    }
		// token_back(price);
  };
	// do server need to know price?
	// return method
  return {
    initDraw,
    nextTurn,
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
    // for testing no allowed to take
    deck,
    curToken,
    users,
    curCard,
  };
};
