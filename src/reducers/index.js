import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import searchReducer from './search';

const rootReducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  searchResults: searchReducer
});

export default rootReducer;
