import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BoardApp from '../components/BoardApp';
import * as BoardActions from '../actions/boardapp';
import React, { PropTypes } from 'react';
import io from 'socket.io-client';

const socket = io('localhost:8080', { path: '/api/game' });


const BoardappPages = (inited) => {
  if (inited) {
    return (
      <BoardApp {...this.props} socket={socket} />);
  }
  return (<div className="background fix loading"></div>);
};

BoardappPages.propTypes = {
  inited: PropTypes.boolean.isRequired,
  curPlayer: PropTypes.boolean.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  tokenTaked: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  userToken: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  nobel: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(BoardActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(BoardappPages);
