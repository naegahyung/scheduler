import { combineReducers } from 'redux';

import MainReducer from '../Main/main.reducer';

export default combineReducers({
  main: MainReducer 
});