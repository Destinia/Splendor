import React, { PropTypes } from 'react';
import '../css/bootstrap-material-design.css';
import '../css/ripples.min.css';
import '../css/center-util.css';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event, inputType) {
    if (inputType === 'username') {
      const { changeUserName } = this.props;
      changeUserName(event.target.value);
    } else if (inputType === 'password') {
      const { changePassword } = this.props;
      changePassword(event.target.value);
    }
  }

  handleClick() {
    const { typingUserName, typingPassword, setUserName } = this.props;
    const { socket } = this.props.route;
    const { router } = this.context;
    if (typingUserName !== '' && typingPassword !== '') {
      socket.emit('LoginOnLobby', {
        userName: typingUserName,
        password: typingPassword,
      });
      socket.on('Authenticated', (data) => {
        console.log(data);
        if (data.isUser) {
          setUserName(typingUserName);
          router.push('/Lobby');
        }
      });
      console.log('==================================');
    }
  }

  render() {
    const handleChange = this.handleChange;
    const handleClick = this.handleClick;
    return (
      <div className="col-md-4 col-md-offset-4 vcenter">
        <div className="well bs-component">
          <legend>Splendor</legend>
          <form className="form-horizontal">
            <fieldset>
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="text" className="form-control" placeholder="UserName"
                    onChange={(e) => handleChange(e, 'username')}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <input
                    type="password" className="form-control" placeholder="Password"
                    onChange={(e) => handleChange(e, 'password')}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-4 col-md-offset-4">
                  <button
                    type="button" className="btn btn-primary" onClick={handleClick}
                  >
                    Login
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  route: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  changeUserName: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  typingUserName: PropTypes.string.isRequired,
  typingPassword: PropTypes.string.isRequired,
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};
export default Login;
