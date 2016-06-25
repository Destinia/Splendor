import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import * as containers from './containers';


const {
  CounterPage,
  AnotherPage,
  NotFoundPage,
  BoardappPage,
} = containers;


export default (
  <Route component={App}>
    <Route path="/" component={CounterPage} />
    <Route path="/game" component={BoardappPage} />
    <Route path="/another" component={AnotherPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
