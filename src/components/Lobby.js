import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../css/Lobby.css';

class Lobby extends React.Component {
  componentDidMount() {
    const { socket, updateRoom } = this.props;
    socket.emit('mountOnLobby', {});
    socket.on('roomList', (data) => {
      console.log(data);
      updateRoom(data);
    });
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">Lobby</li>
            <li>
              <Link to="/Lobby/RoomList">RoomList</Link>
            </li>
            <li>
              <Link to="/Lobby/CreateRoom">CreateRoom</Link>
            </li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Lobby.propTypes = {
  socket: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  updateRoom: PropTypes.func.isRequired,
};

export default Lobby;
