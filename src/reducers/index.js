import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import * as boardapps from './boardapp';
import * as lobbyapps from './Lobby';


const rootReducer = combineReducers({
  counter,
  routing,
  ...boardapps,
  ...lobbyapps,
});

export default rootReducer;
