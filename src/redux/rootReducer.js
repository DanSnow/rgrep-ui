import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import rgrep from './modules/rgrep';

export default combineReducers({
  rgrep,
  routing
});
