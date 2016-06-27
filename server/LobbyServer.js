import { roomList } from './LobbyData.js';
import shortid from 'shortid';

module.exports = {
  createRoom: function createRoom(roomName, owner, maxPlayer = 4) {
    const id = shortid.generate();

    const roomObj = {
      id,
      roomName,
      owner,
      maxPlayer,
    };

    roomList.push(roomObj);
  },
};
