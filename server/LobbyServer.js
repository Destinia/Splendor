const LobbyData = require('./LobbyData.js');
const shortid = require('shortid');

module.exports = {
  roomList: LobbyData.roomList,
  createRoom: function createRoom(roomName, owner) {
    const id = shortid.generate();

    const roomObj = {
      id,
      roomName,
      owner,
      nowPlayerNum: 0,
    };

    LobbyData.roomList.push(roomObj);
  },
};
