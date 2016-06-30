import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateRoom from '../components/CreateRoom.js';
import * as LobbyActions from '../actions/LobbyActions';


const CreateRoomPage = (props) => (
  <div>
    <CreateRoom {...props} />
  </div>
);

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LobbyActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomPage);
