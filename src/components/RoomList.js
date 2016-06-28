import React, { PropTypes } from 'react';
import '../css/Lobby.css';

class RoomList extends React.Component {
  /* constructor(props, context) {
    super(props, context);
    this.state = {
      roomList: [{
        roomName: 'NO AFK!!!!!',
        roomId: '46Juzcyx',
        owner: 'Allen',
        nowPlayer: 3,
      }, {
        roomName: 'NTUGodCard',
        roomId: '2WEKaVNO',
        owner: 'Jeff',
        nowPlayer: 4,
      }],
    };
  } */

  render() {
    const { roomList } = this.props;

    return (
      <div id="page-content-wrapper">
        <ol className="breadcrumb">
          <li>Room Name</li>
          <li>Room Owner</li>
        </ol>
          {roomList.map((room) => (
            <div className="container-fluid">
              <ul className="list-group">
                <li key={room.roomId} className="list-group-item">
                  {room.roomName} / {room.owner} <span className="badge">{room.nowPlayerNum}</span>
                </li>
              </ul>
            </div>
          ))}
      </div>
    );
  }
}

RoomList.propTypes = {
  roomList: PropTypes.array.isRequired,
  // LobbyApp: PropTypes.object.isRequired,
};

export default RoomList;
