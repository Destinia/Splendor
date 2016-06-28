export const CREATE_ROOM = 'CREATE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';

export const createRoom = (roomName, owner) => ({ type: CREATE_ROOM, roomName, owner });

export const updateRoom = (newRoomList) =>
  (dispatch, getState) => {
    dispatch({ type: UPDATE_ROOM, newRoomList });
  };
