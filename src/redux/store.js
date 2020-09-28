import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import jokesReducer from './jokesReducer';

let reducers = combineReducers({
  jokesReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;