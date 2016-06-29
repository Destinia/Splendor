import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class Lobby extends React.Component {
  createLink(disabled) {
    if (disabled) {
      return (
        <li className="disabled">
          <a>Create Room</a>
        </li>
      );
    }
    return (
      <li>
        <Link to="/Lobby/CreateRoom">Create Room</Link>;
      </li>
    );
  }

  render() {
    const { isOwner } = this.props;
    const { router } = this.context;
    const { route } = this.props;
    console.log(route);
    // const disabled = (isOwner) ? 'disabled' : '';
    return (
      <div>
        <ul className="nav nav-tabs nav-setting">
          <li>
            <Link to="/Lobby/Home">Home</Link>
          </li>
          <li>
            <Link to="/Lobby/RoomList">Room List</Link>
          </li>
          {this.createLink(isOwner)}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

Lobby.propTypes = {
  route: PropTypes.any.isRequired,
  isOwner: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

Lobby.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default Lobby;
