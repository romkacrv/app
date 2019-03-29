import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './redux/reducer';
import middleware from './redux/middleware';

const store = createStore(
  combineReducers({
    reducer,
  }),
  composeWithDevTools(applyMiddleware(
    reduxThunk,
    middleware,
  ))
);

store.subscribe(() => {

});

export default store;
