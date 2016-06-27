import React, { PropTypes } from 'react';

import '../css/Token.css';

const Token = ({ token, takeToken, socket }) => {
  const createToken = (type) => {
    const handleClick = () => { takeToken(type, socket); };
    return (
      <div className="token" onClick={handleClick}>
        <img src={`/public/images/token/${type}.png`} role="presentation" />
        <span className="token-count">{token[type]}</span>
      </div>
    );
  };

  return (
    <div className="fullHeight">
      {Object.keys(token).map((type) => createToken(type))}
    </div>
  );
};

/*
const tokenItem = ({ takeToken, type, token }) => {
  const handleClick = () => { takeToken(type); };
  return (
    <div className="token" onClick={handleClick}>
      <img src={`/public/images/token/${type}.png`} role="presentation" />
      <span className="token-count">{token.Gold}</span>
    </div>
    );
};

tokenItem.propTypes = {
  token: PropTypes.object.isRequired,
  takeToken: PropTypes.func.isRequire,
  type: PropTypes.string.isRequire,
};
*/


Token.propTypes = {
  token: PropTypes.object.isRequired,
  takeToken: PropTypes.func.isRequire,
  socket: PropTypes.object.isRequire,
};

export default Token;
