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
    socket.on('mountOnLobby', () => {
      // console.log('mount here');
      socket.emit('roomList', LobbyServer.roomList);
    });

    socket.on('CreateRoomOnLobby', (data) => {
      console.log(data);
      LobbyServer.createRoom(data.roomName, data.owner);
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
  });
};
