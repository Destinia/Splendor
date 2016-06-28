import { CREATE_ROOM, UPDATE_ROOM } from '../actions/LobbyActions.js';

/* const initialState = {
  roomList: [{
    roomName: 'NO AFK!!!!!',
    roomId: '46Juzcyx',
    owner: 'Allen',
    nowPlayer: 3,
  }, {
    roomName: 'NTUGodCard',
    roomId: '2WEKaVNO',
    owner: 'Jeff',
    nowPlayer: 4,
  }],
  userName: '',
}; */

export function roomList(state = {}, action) {
  switch (action.type) {
    case UPDATE_ROOM:
      console.log(action.newRoomList);
      return action.newRoomList;
    default:
      return state;
  }
}
