import React, { PropTypes } from 'react';

import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <img
          src="/public/images/Splendor01.png" alt="background"
          className="bg"
        />
      </div>
    );
  }
}

export default HomePage;
