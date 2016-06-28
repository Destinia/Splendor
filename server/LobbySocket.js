const LobbyServer = require('./LobbyServer.js');

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('mountOnLobby', () => {
      // console.log('mount here');
      socket.emit('roomList', LobbyServer.roomList);
    });
  });
};
