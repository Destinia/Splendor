// Keep track of which names are used so that there are no duplicates
const createGame = require('./game.js');

const GameList = {};

const socketMapGame = {};

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    // send the new user their name and a list of users
    socket.on('mount', (userName, roomId) => {
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
          newGame.addUser(userName);
          socket.emit('onTheTable', newGame.getUsers());
          socket.broadcast.to(roomId).emit('addUser', newGame.getUsers());
          newGame.init();
          socket.emit('init', {
            players: newGame.getUsers(),
            cards: newGame.getCurCard(),
            token: newGame.getCurToken(),
            nobel: newGame.getNobel(),
          });
          socket.broadcast.to(roomId).emit('init', {
            players: newGame.getUsers(),
            cards: newGame.getCurCard(),
            token: newGame.getCurToken(),
            nobel: newGame.getNobel(),
          });
          break;
        }
        default : {
          console.log('addUser ', userName);
          newGame.addUser(userName);
          socket.emit('onTheTable', newGame.getUsers());
          socket.broadcast.to(roomId).emit('addUser', newGame.getUsers());
        }
      }
    });

    socket.on('card', (data, id) => {
      console.log('purchase card', data);
      const newGame = GameList[id];
      newGame.takeCard(data);
      socket.emit('nextTurn', { cards: newGame.getCurCard(),
        token: newGame.getCurToken(), players: newGame.getUsers() }
      );
      socket.broadcast.to(id).emit('nextTurn',
       { curUser: newGame.getCurUserId(), cards: newGame.getCurCard(),
        token: newGame.getCurToken(), players: newGame.getUsers() });
      // newGame.get_users().forEach((user)=>{user.socket.emit("test","hello");});
    });

    socket.on('takeToken', (data, id) => {
      console.log('take token', data);
      const newGame = GameList[id];
      newGame.takeToken(data);
      socket.emit('nextTurn', { token: newGame.getCurToken(), players: newGame.getUsers() });
      socket.broadcast.to(id).emit('nextTurn',
        { curUser: newGame.getCurUserId(), token: newGame.getCurToken(), players: newGame.getUsers() });
    });

    socket.on('preserveCard', (data, id) => {
      console.log('preserveCard', data);
      const newGame = GameList[id];
      newGame.preserveCard(data);
      socket.emit('nextTurn', { cards: newGame.getCurCard(), token: newGame.getCurToken(),
        players: newGame.getUsers() });
      socket.broadcast.to(id).emit('nextTurn',
        { cards: newGame.getCurCard(), token: newGame.getCurToken(),
          players: newGame.getUsers(), curUser: newGame.getCurUserId() });
    });

    socket.on('takeTokenReturn', (data, id) => {
      console.log('take token return', data);
      const newGame = GameList[id];
      newGame.takeTokenReturn(data);
      socket.emit('nextTurn', { token: newGame.getCurToken(), players: newGame.getUsers() });
      socket.broadcast.to(id).emit('nextTurn',
        { token: newGame.getCurToken(), players: newGame.getUsers(), curUser: newGame.getCurUserId() });
      newGame.getCurSocket().emit('yourturn');
    });


    // handle disconnect

    socket.on('disconnect', () => {} );
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
