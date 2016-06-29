import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import * as containers from './containers';
import BoardappPage from './containers/BoardappPage';
import LobbyPage from './containers/LobbyPage';
import RoomListPage from './containers/RoomListPage';
import CreateRoomPage from './containers/CreateRoomPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';

import io from 'socket.io-client';
const socket = io('localhost:8080', { path: '/api/lobby' });

const {
  CounterPage,
  AnotherPage,
  NotFoundPage,
} = containers;
console.log(containers);
console.log(CounterPage);
console.log(BoardappPage);


export default (
  <Route >
    <Route path="/" component={CounterPage}>
      <IndexRedirect to="/login" />
    </Route>
    <Route path="/login" component={LoginPage} socket={socket} />
    <Route path="/Lobby" component={LobbyPage} socket={socket} >
      <IndexRedirect to="/Lobby/Home" />
      <Route path="Home" component={HomePage} />
      <Route path="RoomList" component={RoomListPage} socket={socket} />
      <Route path="CreateRoom" component={CreateRoomPage} socket={socket} />
    </Route>
    <Route path="/game" component={BoardappPage} />
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
