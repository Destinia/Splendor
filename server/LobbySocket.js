const LobbyServer = require('./LobbyServer.js');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Derrick1020',
  database: 'SplendorUserDB',
});

connection.connect();

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.join('Lobby');
    socket.on('mountOnLobby', () => {
      // console.log('mount here');
      socket.emit('roomList', LobbyServer.roomList);
    });

    socket.on('CreateRoomOnLobby', (data) => {
      console.log(data);
      LobbyServer.createRoom(data.roomName, data.owner);
      socket.broadcast.to('Lobby').emit('roomList', LobbyServer.roomList);
    });

    socket.on('LoginOnLobby', (data) => {
      const userName = data.userName;
      const password = data.password;

      connection.query(`SELECT password FROM user WHERE userName='${userName}'`, (err, results) => {
        if (err) console.log('mysql error', err);
        console.log(results);
        if (results.length !== 0) {
          socket.emit('Authenticated', {
            isUser: password === results[0].password,
          });
        } else {
          socket.emit('Authenticated', { isUser: false });
        }
      });
    });

    socket.on('AddOnePlayerOnLobby', (data) => {
      const roomId = data.roomId;
      console.log(roomId);
      console.log(LobbyServer.roomList[roomId]);
      LobbyServer.roomList[roomId].nowPlayerNum += 1;
      socket.broadcast.to('Lobby').emit('roomList', LobbyServer.roomList);
    });
  });
};
