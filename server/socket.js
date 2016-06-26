// Keep track of which names are used so that there are no duplicates
const createGame = require('./game.js');

var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

const newGame = createGame();
newGame.initDraw();
console.log(newGame.getCurCard());
const testPlayer = { imgSrc: '/public/images/portrait/portrait1.jpg',
  token: { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 },
  currency: { Emerald: 0, Sapphire: 0, Ruby: 0, Diamond: 0, Agate: 0, Gold: 0 },
  visible: false,
  };
const testPlayers = [testPlayer, testPlayer, testPlayer];

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    let name = '';
    // send the new user their name and a list of users
    socket.on('mount', () => {
      name = userNames.getGuestName();
      newGame.addUser(socket);
      console.log('new user ', name, 'mount');
      socket.emit('init', {
        name,
        players: testPlayers,
        cards: newGame.getCurCard(),
        token: newGame.getCurToken(),
        nobel: newGame.getNobel(),
        curPlayer: (newGame.getUsers().length === 1),
      });
    });


    socket.on('card', (data) => {
      console.log('here', data);
      newGame.takeCard(data.level, data.index);
      socket.emit('drawcard',
        { cards: newGame.getCurCard(), token: newGame.getCurUser().token }
      );
      socket.broadcast.emit('drawcard', { cards: newGame.getCurCard() });
      newGame.nextTurn();
      newGame.getCurUser().socket.emit('yourturn');
      // newGame.get_users().forEach((user)=>{user.socket.emit("test","hello");});
    });

    socket.on('take_token', (data) => {
      newGame.takeToken(data);
      socket.broadcast.emit('token', { token: newGame.getCurToken() });
      newGame.nextTurn();
      newGame.getCurUser().socket.emit('yourturn');
    });

    // setInterval(()=>{socket.emit('test',{hey:"het"});},1000)
    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
      name,
    });
    // broadcast a user's message to other users
    socket.on('send:message', (data) => {
      socket.broadcast.emit('send:message', {
        user: name,
        text: data.text,
      });
    });
    // validate a user's name change, and broadcast it on success
    socket.on('change:name', (data, fn) => {
      if (userNames.claim(data.name)) {
        const oldName = name;
        userNames.free(oldName);
        name = data.name;
        io.socket.broadcast.emit('change:name', {
          oldName,
          newName: name,
        });
        fn(true);
      } else {
        fn(false);
      }
    });
    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', () => {
      socket.broadcast.emit('user:left', {
        name,
      });
      userNames.free(name);
    });
  });
};
