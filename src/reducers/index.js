import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import * as boardapps from './boardapp';


const rootReducer = combineReducers({
  counter,
  routing,
  ...boardapps,
});


export default rootReducer;
