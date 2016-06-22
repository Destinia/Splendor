import React, { Component, PropTypes } from 'react';

import './Token.css'


class Token extends React.Component {
	constructor(props,context){
		super(props,context);
	}

	render(){
		const {token,take_token} = this.props;
		return(
			<div className="fullHeight">
				<div className="token" onClick={take_token.bind(this,"Emerald")}>
					<img src="/public/images/token/emeraude.png"/>
					<span className="token-count">{token.Emerald}</span>
				</div>
				<div className="token" onClick={take_token.bind(this,"Sapphire")}>
					<img src="/public/images/token/saphir.png"/>
					<span className="token-count">{token.Sapphire}</span>
				</div>
				<div className="token" onClick={take_token.bind(this,"Ruby")}>
					<img src="/public/images/token/rubius.png"/>
					<span className="token-count">{token.Ruby}</span>
				</div>
				<div className="token" onClick={take_token.bind(this,"Diamond")}>
					<img src="/public/images/token/diamant.png"/>
					<span className="token-count">{token.Diamond}</span>
				</div>
				<div className="token" onClick={take_token.bind(this,"Agate")}>
					<img src="/public/images/token/onyx.png"/>
					<span className="token-count">{token.Agate}</span>
				</div>
				<div className="token" onClick={take_token.bind(this,"Gold")}>
					<img src="/public/images/token/gold.png"/>
					<span className="token-count">{token.Gold}</span>
				</div>

				<div>
				</div>
			</div>



			);
	}
}
export default Token;