import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login.js';
import * as LobbyActions from '../actions/LobbyActions';

const LoginPage = (props) => (
  <div>
    <Login {...props} />
  </div>
);

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LobbyActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
