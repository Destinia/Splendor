import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class Lobby extends React.Component {
  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li>
            <Link to="/Lobby/Home">Home</Link>
          </li>
          <li>
            <Link to="/Lobby/RoomList">Room List</Link>
          </li>
          <li>
            <Link to="/Lobby/CreateRoom">Create Room</Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

Lobby.propTypes = {
  route: PropTypes.any.isRequired,
  // socket: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  // updateRoom: PropTypes.func.isRequired,
};

export default Lobby;
