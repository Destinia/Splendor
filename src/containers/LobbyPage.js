import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Lobby from '../components/Lobby.js';

const socket = io('localhost:8080', { path: '/api/lobby' });

class LobbyPage extends React.Component {

  render() {
    return (
      <div>
        <Lobby {...this.props} socket={socket} />
      </div>
    );
  }
}

/*
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(BoardActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);*/
export default LobbyPage;
