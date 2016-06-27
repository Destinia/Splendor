// const LobbyServer = require('./LobbyServer.js');

exports = module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    socket.on('mount', () => {
      console.log('mount here');
      socket.emit('test', {
        text: 'This is for test.',
      });
    });
  });
};
