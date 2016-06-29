import React, { PropTypes } from 'react';

import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class CreateRoom extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleInputRoomName = this.handleInputRoomName.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputRoomName(event) {
    const { changeRoomName } = this.props;
    if (event.target.value !== '') {
      changeRoomName(event.target.value);
    }
  }

  handleClick() {
    const { socket } = this.props.route;
    const { setToOwner, typingRoomName, userName } = this.props;
    const { router } = this.context;
    // console.log('room name: ', typingRoomName);
    // console.log('user name: ', userName);
    if (typingRoomName !== '') {
      socket.emit('CreateRoomOnLobby', {
        roomName: typingRoomName,
        owner: userName,
      });
      setToOwner();
      router.push('/Lobby/RoomList');
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4 vcenter">
        <div className="well bs-component">
          <legend className="text-center">Enter the Room Name</legend>
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text" className="form-control text-center" placeholder="UserName"
                    onChange={this.handleInputRoomName}
                  />
                </div>
                <div className="form-group">
                  <div className="col-md-12 text-center">
                    <button
                      type="button" className="btn btn-primary" onClick={this.handleClick}
                    >
                    Submit
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

CreateRoom.propTypes = {
  route: PropTypes.object.isRequired,
  changeRoomName: PropTypes.func.isRequired,
  setToOwner: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  typingRoomName: PropTypes.string.isRequired,
};

CreateRoom.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default CreateRoom;
