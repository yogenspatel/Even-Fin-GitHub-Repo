import { createStore, combineReducers } from "redux";
import tableReducer from "./user";
import searchReducer from "./search";
import paginationReducer from "./pagination";

const rootReducer = combineReducers({
  userData: tableReducer,
  searchData: searchReducer,
  paginatedData: paginationReducer
});

function configureStore(state = {}) {
  return createStore(rootReducer, state);
}

export { configureStore };
export default rootReducer;
