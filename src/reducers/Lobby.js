import {
  UPDATE_ROOM,
  TYPE_ROOM_NAME,
  TYPE_USER_NAME,
    } from '../actions/LobbyActions.js';

export function roomList(state = [], action) {
  switch (action.type) {
    case UPDATE_ROOM:
      return action.newRoomList;
    default:
      return state;
  }
}

export function typingRoomName(state = '', action) {
  switch (action.type) {
    case TYPE_ROOM_NAME:
      return action.typingStr;
    default:
      return state;
  }
}

export function typingUserName(state = '', action) {
  switch (action.type) {
    case TYPE_USER_NAME:
      return action.typingStr;
    default:
      return state;
  }
}
