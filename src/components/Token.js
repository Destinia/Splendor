import React, { PropTypes } from 'react';

import '../css/Token.css'


const Token = ( token,takeToken ) => 
  (
  <div className="fullHeight">
    <tokenItem token={token} takeToken={takeToken} type="Emerald" />
    <tokenItem token={token} takeToken={takeToken} type="Sapphire" />
    <tokenItem token={token} takeToken={takeToken} type="Ruby" />
    <tokenItem token={token} takeToken={takeToken} type="Diamond" />
    <tokenItem token={token} takeToken={takeToken} type="Agate" />
    <tokenItem token={token} takeToken={takeToken} type="Gold" />
  </div>
  );

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


Token.propTypes = {
  token: PropTypes.object.isRequired,
  takeToken: PropTypes.func.isRequire,
};

export default Token;
