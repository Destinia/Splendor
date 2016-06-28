import React, { PropTypes } from 'react';
import '../css/Lobby.css';

class CreateRoom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleInputRoomName = this.handleInputRoomName.bind(this);
    this.handleInputUserName = this.handleInputUserName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputRoomName(event) {
    const { changeRoomName } = this.props;
    if (event.target.value !== '') {
      changeRoomName(event.target.value);
    }
  }

  handleInputUserName(event) {
    const { changeUserName } = this.props;
    if (event.target.value !== '') {
      changeUserName(event.target.value);
    }
  }

  handleClick() {
    const { socket } = this.props.route;
    const { typingRoomName, typingUserName } = this.props;
    console.log('room name: ', typingRoomName);
    console.log('user name: ', typingUserName);
    socket.emit('CreateRoomOnLobby', {
      roomName: typingRoomName,
      owner: typingUserName,
    });
  }

  render() {
    return (
      <div id="page-content-wrapper">
        <div className="input-group">
          <input
            type="text" className="form-control"
            placeholder="Room Name" onChange={this.handleInputRoomName}
          />
          <input
            type="text" className="form-control"
            placeholder="Owner" onChange={this.handleInputUserName}
          />
        </div>
        <div className="btn-group" role="group" aria-label="...">
          <button
            type="button" className="btn btn-default" onClick={this.handleClick}
          >
          Submit
          </button>
          <button type="button" className="btn btn-default">Cancle</button>
        </div>
      </div>
    );
  }
}

CreateRoom.propTypes = {
  route: PropTypes.object.isRequired,
  changeRoomName: PropTypes.func.isRequired,
  changeUserName: PropTypes.func.isRequired,
  typingRoomName: PropTypes.string.isRequired,
  typingUserName: PropTypes.string.isRequired,
};

export default CreateRoom;
