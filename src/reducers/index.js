import { createStore, combineReducers } from 'redux';
import todoReducer from './todo';

const rootReducer = combineReducers({
  toDoData: todoReducer
});

function configureStore(state = {}) {
  return createStore(rootReducer, state);
}

export { configureStore };
export default rootReducer;
