import React, { PropTypes } from 'react';

import '../css/Hand.css';


const Hand = ({ userToken, currency }) =>
  (
  <div className="row user-region">
    <div className="col-sm-2">
      {}
    </div>
    <div className="col-sm-1 gem first">
      <div className="currency">
        <img src="/public/images/gems/emeraude.png" role="presentation" />
        <span>{currency.Emerald}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Emerald.png" role="presentation" />
        <span>{userToken.Emerald}</span>
      </div>
    </div>
    <div className="col-sm-1 gem">
      <div className="currency">
        <img src="/public/images/gems/saphir.png" role="presentation" />
        <span>{currency.Sapphire}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Sapphire.png" role="presentation" />
        <span>{userToken.Sapphire}</span>
      </div>
    </div>
    <div className="col-sm-1 gem">
      <div className="currency">
        <img src="/public/images/gems/rubis.png" role="presentation" />
        <span>{currency.Ruby}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Ruby.png" role="presentation" />
        <span>{userToken.Ruby}</span>
      </div>
    </div>
    <div className="col-sm-1 gem">
      <div className="currency">
        <img src="/public/images/gems/diamant.png" role="presentation" />
        <span>{currency.Diamond}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Diamond.png" role="presentation" />
        <span>{userToken.Diamond}</span>
      </div>
    </div>
    <div className="col-sm-1 gem">
      <div className="currency">
        <img src="/public/images/gems/onyx.png" role="presentation" />
        <span>{currency.Agate}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Agate.png" role="presentation" />
        <span>{userToken.Agate}</span>
      </div>
    </div>
    <div className="col-sm-1 gem">
      <div className="currency">
        <img src="/public/images/gems/or.png" role="presentation" />
        <span>{currency.Gold}</span>
      </div>
      <div className="token">
        <img src="/public/images/token/Gold.png" role="presentation" />
        <span>{userToken.Gold}</span>
      </div>
    </div>
  </div>
  );

Hand.propTypes = {
  userToken: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
};
export default Hand;
