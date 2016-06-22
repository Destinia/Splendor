import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import Desk from './desk';
import Token from './Token';
import Hand from './Hand';
import Nobel from './nobel';
const socket = io('localhost:8080',{path:'/api/game'});


import '../css/BoardApp.css';

class BoardApp extends React.Component {
	constructor(props,context){
		super(props,context);

		var init_card = {
			type:"Diamond",score:1,price:{Emerald:0,Sapphire:0,Ruby:0,Diamond:0,Agate:0,Gold:0}
		}

		this.state = {
			inited:false,
			cur_player:false,
			name:"",
			score:0,
			token_taked:[],
			token:{
				Emerald:7,
				Sapphire:7,
				Ruby:7,
				Diamond:7,
				Agate:7,
				Gold:5
			},
			currency:{
				Emerald:0,
				Sapphire:0,
				Ruby:0,
				Diamond:0,
				Agate:0,
				Gold:0
			},
			user_token:{
				Emerald:0,
				Sapphire:0,
				Ruby:0,
				Diamond:0,
				Agate:0,
				Gold:0
			},
			players:{
				
			},
			cards:{
				top:[init_card,init_card,init_card,init_card],
				mid:[init_card,init_card,init_card,init_card],
				bot:[init_card,init_card,init_card,init_card]
			},
			nobel:{

			}
		}
	}



	componentDidMount() {
		socket.emit('mount',{});
		socket.on('init',this.init.bind(this));
		socket.on('drawcard',this.draw_card.bind(this));
		socket.on('test',(data)=>{console.log(data);});
		socket.on('yourturn',this.yourturn.bind(this));
		socket.on('token',this.update_token.bind(this));
  	}

  	update_token(data) {
  		this.setState({token:data.token});
  	}

  	yourturn(){
  		console.log("myturn");
  		this.setState({cur_player:true});
  	}
  	draw_card(data){
  		console.log("yaaaaa",data);
  		this.setState({cards:data.cards,user_token:data.token});
  	};

  	init(data){
  		console.log(data);
  		this.setState({inited:true,players:data.users,name:data.name,cards:data.cards,token:data.token,nobel:data.nobel,cur_player:data.cur_player});
  	}

	perchase(card,index){
		//identify money
		if(this.state.cur_player&&this.state.token_taked.length===0&&this.checkout(card.price)){
			var cur = this.state.currency;
			cur[card.type]++;
			this.setState({currency:cur,cur_player:false});
			socket.emit('card',{card:card,level:card.level,index:index});
		}
	}

	checkout(price){
		const {user_token,currency} = this.state;
		var owned = 0;
		for(var key in user_token){
			if(key!=="Gold") {
				if(user_token[key] + currency[key]<=price[key]) {
					owned += price[key] - user_token[key] - currency[key];
				}
			}
		}
		return (owned<=user_token["Gold"]);
	}

	take_token(type){
		var token_taked = this.state.token_taked;
		if(this.state.cur_player){
			//check over?
			switch(token_taked.length){
				case 0:
					if(this.state.token[type]!==0){
						token_taked.push(type);
						var cur_token = this.state.token;
						cur_token[type]--;
						var usr_token = this.state.user_token;
						usr_token[type]++;
						this.setState({token:cur_token,user_token:usr_token,token_taked:token_taked});
					}
					break;
				case 1:
					if(this.state.token[type]!==0){
						if(type===token_taked[0]){
							//token_taked.push(type);
							var cur_token = this.state.token;
							cur_token[type]--;
							var usr_token = this.state.user_token;
							usr_token[type]++;
							socket.emit('take_token',[type]);
							this.setState({token:cur_token,user_token:usr_token,cur_player:false,token_taked:[]});
						}
						else{
							token_taked.push(type);
							var cur_token = this.state.token;
							cur_token[type]--;
							var usr_token = this.state.user_token;
							usr_token[type]++;
							this.setState({token:cur_token,user_token:usr_token,token_taked:token_taked});
						}
					}
					break;
				case 2:
					if(this.state.token[type]!==0){
						if(type!==token_taked[0]&&type!==token_taked[1]){
							token_taked.push(type);
							var cur_token = this.state.token;
							cur_token[type]--;
							var usr_token = this.state.user_token;
							usr_token[type]++;
							socket.emit('take_token',token_taked);
							this.setState({token:cur_token,user_token:usr_token,cur_player:false,token_taked:[]});
						}
					}
					break;

				default:
					throw(err);
					break;
			}
		}
	}

	render(){
		if(this.state.inited){
			return (
			<div className="background">
			<div className="container-fluid fix">
				<div className="row desk-region">
					<div className="col-sm-2">
						<button onClick={this.perchase.bind(this)}>{(this.state.cur_player)? "me":"others"}</button>
					</div>
					<div className="col-sm-5">
						<Desk cards={this.state.cards} perchase={this.perchase.bind(this)} checkout={this.checkout.bind(this)}/>
					</div>
					<div className="col-sm-3">
						<Nobel nobel={this.state.nobel}/>
					</div>
					<div className="col-sm-2">
						<Token token={this.state.token} take_token={this.take_token.bind(this)}/>
					</div>
					
				</div>
				<div className="row user-region">
				<div className="container-fluid">
					<Hand currency={this.state.currency} user_token={this.state.user_token}/>
				</div>
				</div>
			</div>
			</div>
			);
		}
		else {
			return (
				<div className="background fix loading">
					
				</div>
				);
		}
	}

}

export default BoardApp;