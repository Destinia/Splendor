import React, { PropTypes } from 'react';
import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class RoomList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleEnterRoom = this.handleEnterRoom.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { socket } = this.props.route;
    const { updateRoom } = this.props;
    socket.emit('mountOnLobby', {});
    socket.on('roomList', (data) => {
      updateRoom(data);
    });
    console.log(this.props);
  }

  handleEnterRoom(event, roomId) {
    const { socket } = this.props.route;
    const { updateRoom, roomList } = this.props;
    const room = roomList[roomId];
    if (room.nowPlayerNum < 4) {
      socket.emit('AddOnePlayerOnLobby', { roomId: room.roomId });
      socket.emit('mountOnLobby', {});
      socket.on('roomList', (data) => {
        updateRoom(data);
      });
    }
  }

  render() {
    const { roomList } = this.props;
    const handleEnterRoom = this.handleEnterRoom;

    return (
      <div className="roomtable-padding ">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th>#</th>
              <th>Room Name</th>
              <th>Room Owner</th>
              <th>Now Playing</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(roomList).map((key, index) => {
              const room = roomList[key];
              let trClass = '';
              if (room.nowPlayerNum === 4) {
                trClass = 'danger';
              }
              return (
                <tr className={trClass} onClick={(e) => handleEnterRoom(e, key)}>
                  <td>{index + 1}</td>
                  <td>{room.roomName}</td>
                  <td>{room.owner}</td>
                  <td><span className="badge">{room.nowPlayerNum}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
