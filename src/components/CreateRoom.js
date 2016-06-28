import React from 'react';
import '../css/Lobby.css';

class CreateRoom extends React.Component {
  render() {
    return (
      <div id="page-content-wrapper">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Room Name" />
          <input type="text" className="form-control" placeholder="Owner" />
        </div>
      </div>
    );
  }
}

export default CreateRoom;
