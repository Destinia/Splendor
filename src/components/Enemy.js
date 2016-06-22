import React, { Component, PropTypes } from 'react';

import './enemy.css'

class Enemy extends React.Component {
	constructor(props,context){
		super(props,context);
	}


	render(){
		return(
			<div>
				<a className="single-user"><img src="portrait1.jpg"/><span></span></a>
			</div>
		
		);
	}

}
export default Enemy;