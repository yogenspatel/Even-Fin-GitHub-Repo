import { createStore, combineReducers } from "redux";
import tableReducer from "./table";
import searchReducer from "./search";

const rootReducer = combineReducers({
  tableData: tableReducer,
  searchData: searchReducer
});

function configureStore(state = {}) {
  return createStore(rootReducer, state);
}

export { configureStore };
export default rootReducer;
