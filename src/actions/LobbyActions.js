export const CREATE_ROOM = 'CREATE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';

export const TYPE_ROOM_NAME = 'TYPE_ROOM_NAME';
export const TYPE_USER_NAME = 'TYPE_USER_NAME';

export const createRoom = (roomName, owner) => ({ type: CREATE_ROOM, roomName, owner });

export const updateRoom = (newRoomList) =>
  (dispatch) => {
    dispatch({ type: UPDATE_ROOM, newRoomList });
  };

export const changeRoomName = (typingStr) =>
  (dispatch) => {
    dispatch({ type: TYPE_ROOM_NAME, typingStr });
  };

export const changeUserName = (typingStr) =>
  (dispatch) => {
    dispatch({ type: TYPE_USER_NAME, typingStr });
  };
