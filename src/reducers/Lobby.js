import {
  UPDATE_ROOM,
  TYPE_ROOM_NAME,
  TYPE_USER_NAME,
  TYPE_PASSWORD,
  SET_USER_NAME,
  SET_TO_OWNER,
  SET_ENTER_ROOM,
  SET_USER_AUTH,
    } from '../actions/LobbyActions.js';

export function roomList(state = {}, action) {
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

export function typingPassword(state = '', action) {
  switch (action.type) {
    case TYPE_PASSWORD:
      return action.typingStr;
    default:
      return state;
  }
}

export function userName(state = '', action) {
  switch (action.type) {
    case SET_USER_NAME:
      return action.userName;
    default:
      return state;
  }
}

export function isOwner(state = false, action) {
  switch (action.type) {
    case SET_TO_OWNER:
      return true;
    default:
      return state;
  }
}

export function roomId(state = '', action) {
  switch (action.type) {
    case SET_ENTER_ROOM:
      return action.roomId;
    default:
      return state;
  }
}

export function userAuth(state = 'unChecked', action) {
  switch (action.type) {
    case SET_USER_AUTH:
      return action.loginInfo;
    default:
      return state;
  }
}


