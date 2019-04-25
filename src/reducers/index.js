import { createStore, combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import searchReducer from "./search";

const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  searchResults: searchReducer
});

function configureStore(state = {}) {
  return createStore(rootReducer, state);
}

export { configureStore };
export default rootReducer;
