import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BoardApp from '../components/BoardApp';
import * as BoardActions from '../actions/boardapp';
import React, { PropTypes, Component } from 'react';
import io from 'socket.io-client';
import '../css/BoardApp.css';

const socket = io(`${location.hostname}:8080`, { path: '/api/game' });
console.log(location.hostname);

// const BoardappPage = () => (<div>test</div>);

class BoardappPage extends Component {
  render() {
    const { inited } = this.props;
    // need four players
    if (inited) {
      return (
        <BoardApp {...this.props} socket={socket} />);
    }
    return (<div className="background fix loading"></div>);
  }
}

BoardappPage.propTypes = {
  inited: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(BoardActions, dispatch);

//export default BoardappPage;
export default connect(mapStateToProps, mapDispatchToProps)(BoardappPage);
