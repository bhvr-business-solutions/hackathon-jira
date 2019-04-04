import { combineReducers } from 'redux';
import { Application } from'./Application';

export const Root = combineReducers({
  application: Application
});
