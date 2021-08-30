import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { dataReducer } from './data-reducer';

const rootReducer = combineReducers({
  data: dataReducer
});

export type StateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));