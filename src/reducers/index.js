import { createStore, combineReducers } from "redux";
import tableReducer from "./user";
import searchReducer from "./search";

const rootReducer = combineReducers({
  userData: tableReducer,
  searchData: searchReducer
});

function configureStore(state = {}) {
  return createStore(rootReducer, state);
}

export { configureStore };
export default rootReducer;
