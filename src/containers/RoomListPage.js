import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RoomList from '../components/RoomList.js';
import * as LobbyActions from '../actions/LobbyActions';

const RoomListPage = (props) => (
  <div>
    <RoomList {...props} />
  </div>
);

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LobbyActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomListPage);
