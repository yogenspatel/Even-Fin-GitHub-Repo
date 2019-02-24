import { PERFORM_SEARCH } from "../actions";
import { searchActions } from "../actions";

const { SET_SEARCH_STATUS, SET_SEARCH_RESULTS, SET_SEARCH_ERROR } = searchActions;
export default (state = null, action) => {
  switch (action.type) {
    case SET_SEARCH_STATUS: {
      const { status } = action;
      return { ...state, status: status };
    }
    case SET_SEARCH_RESULTS: {
      const { results } = action;
      return { ...state, results: results.data };
    }
    case SET_SEARCH_ERROR: {
      const { error } = action;
      return { ...state, error: error };
    }
    case PERFORM_SEARCH:
      return action.payload.data ? action.payload.data.items : state;
    default:
      return state;
  }
};
