import React, { PropTypes } from 'react';
import '../css/Lobby.css';

class RoomList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { socket } = this.props.route;
    const { updateRoom } = this.props;
    socket.emit('mountOnLobby', {});
    socket.on('roomList', (data) => {
      console.log('Here in Roomlist');
      console.log(data);
      // updateRoom(data);
    });
    console.log(this.props);
  }

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
  route: PropTypes.any.isRequired,
  updateRoom: PropTypes.func.isRequired,
};

export default RoomList;
