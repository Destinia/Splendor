export const CREATE_ROOM = 'CREATE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';

export const TYPE_ROOM_NAME = 'TYPE_ROOM_NAME';
export const TYPE_USER_NAME = 'TYPE_USER_NAME';
export const TYPE_PASSWORD = 'TYPE_PASSWORD';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_TO_OWNER = 'SET_TO_OWNER';
export const SET_ENTER_ROOM = 'SET_ENTER_ROOM';

export const SET_USER_AUTH = 'SET_USER_AUTH';

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

export const changePassword = (typingStr) =>
  (dispatch) => {
    dispatch({ type: TYPE_PASSWORD, typingStr });
  };

export const setUserName = (userName) =>
  (dispatch) => {
    dispatch({ type: SET_USER_NAME, userName });
  };

export const setToOwner = () =>
  (dispatch) => {
    dispatch({ type: SET_TO_OWNER });
  };

export const setEnterRoom = (roomId) =>
  (dispatch) => {
    dispatch({ type: SET_ENTER_ROOM, roomId });
  };

export const setUserAuth = (loginInfo) =>
  (dispatch) => {
    dispatch({ type: SET_USER_AUTH, loginInfo });
  };

