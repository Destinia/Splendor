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

const GameList = {};


exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    let name = '';
    // send the new user their name and a list of users
    socket.on('mount', (roomId) => {
      name = 'test';
      socket.join(roomId);
      if (GameList[roomId] === undefined) {
        GameList[roomId] = createGame(roomId);
        console.log('test');
      }
      const newGame = GameList[roomId];   
      switch (GameList[roomId].getUsers().length) {
        case 4: {
          socket.emit('full');
          break;
        }

        case 3: {
          newGame.addUser(socket);
          socket.emit('onTheTable', newGame.getUsers());
          socket.broadcast.to(roomId).emit('addUser', newGame.getUsers());
          newGame.initDraw();
          socket.emit('init', {
            cards: newGame.getCurCard(),
            token: newGame.getCurToken(),
            nobel: newGame.getNobel(),
          });
          socket.broadcast.to(roomId).emit('init', {
            cards: newGame.getCurCard(),
            token: newGame.getCurToken(),
            nobel: newGame.getNobel(),
          });
          newGame.getCurSocket().emit('yourturn');
          break;
        }
        default : {
          console.log('this.case');
          newGame.addUser(socket);
          socket.emit('onTheTable', newGame.getUsers());
          socket.broadcast.to(roomId).emit('addUser', newGame.getUsers());
        }
      }
      console.log('new user ', name, 'mount');
    });


    socket.on('card', (data, id) => {
      console.log('here', data);
      const newGame = GameList[id];
      newGame.takeCard(data.level, data.index);
      socket.emit('drawcard',
        { cards: newGame.getCurCard(), token: newGame.getCurUser().token,
         players: newGame.getUsers() }
      );
      socket.broadcast.to(id).emit('drawcard',
       { cards: newGame.getCurCard(), token: newGame.getCurToken(), players: newGame.getUsers() });
      newGame.nextTurn();
      newGame.getCurSocket().emit('yourturn');
      // newGame.get_users().forEach((user)=>{user.socket.emit("test","hello");});
    });

    socket.on('takeToken', (data, id) => {
      const newGame = GameList[id];
      newGame.takeToken(data);
      socket.broadcast.emit('token', { token: newGame.getCurToken(), players: newGame.getUsers() });
      newGame.nextTurn();
      newGame.getCurSocket().emit('yourturn');
    });

    // setInterval(()=>{socket.emit('test',{hey:"het"});},1000)
    // notify other clients that a new user has joined
    /*
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
    */
  });
};
