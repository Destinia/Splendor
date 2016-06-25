import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import * as containers from './containers';
import BoardappPage from './containers/BoardappPage';


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
    <Route path="/game" component={BoardappPage} />
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
