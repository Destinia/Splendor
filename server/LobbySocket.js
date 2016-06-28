const LobbyServer = require('./LobbyServer.js');

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
  });
};
