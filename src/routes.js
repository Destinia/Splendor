import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import * as containers from './containers';
import BoardappPage from './containers/BoardappPage';
import LobbyPage from './containers/LobbyPage';

import RoomList from './components/RoomList';
import CreateRoom from './components/CreateRoom';

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
    <Route path="/" component={CounterPage} />
    <Route path="/Lobby" component={LobbyPage}>
      <Route path="RoomList" component={RoomList} />
      <Route path="CreateRoom" component={CreateRoom} />
    </Route>
    <Route path="/game" component={BoardappPage} />
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
