// Keep track of which names are used so that there are no duplicates
const createGame = require('./game.js');

const userNames = (function () {
  const names = {};

  const claim = (name) => {
    if (!name || names[name]) {
      return false;
    }
    names[name] = true;
    return true;
  };

  // find the lowest unused "guest" name and claim it
  const getGuestName = () => {
    let name;
    let nextUserId = 1;

    do {
      name = `Guest  + ${nextUserId}`;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  const get = () => {
    const res = [];
    names.map((user) => { res.push(user); return user; });

    return res;
  };

  const free = (name) => {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim,
    free,
    get,
    getGuestName,
  };
}());

const newGame = createGame();
newGame.init_draw();
console.log(newGame.get_cur_card());

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    let name = '';
    // send the new user their name and a list of users
    socket.on('mount', () => {
      name = userNames.getGuestName();
      newGame.add_user(socket);
      console.log('new user ', name, 'mount');
      socket.emit('init', {
        name,
        players: userNames.get(),
        cards: newGame.get_cur_card(),
        token: newGame.get_cur_token(),
        nobel: newGame.get_nobel(),
        cur_player: (newGame.get_users().length === 1),
      });
    });


    socket.on('card', (data) => {
      console.log('here', data);
      newGame.take_card(data.level, data.index);
      socket.emit('drawcard',
        { cards: newGame.get_cur_card(), token: newGame.get_cur_user().token }
      );
      socket.broadcast.emit('drawcard', { cards: newGame.get_cur_card() });
      newGame.next_turn();
      newGame.get_cur_user().socket.emit('yourturn');
      // newGame.get_users().forEach((user)=>{user.socket.emit("test","hello");});
    });

    socket.on('take_token', (data) => {
      newGame.take_token(data);
      socket.broadcast.emit('token', { token: newGame.get_cur_token() });
      newGame.next_turn();
      newGame.get_cur_user().socket.emit('yourturn');
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
