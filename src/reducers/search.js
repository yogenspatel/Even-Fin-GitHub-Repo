import { SEARCH_DATA, TOGGLE_CLASS } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return { ...state, search_data: action.search_data };
    case TOGGLE_CLASS:
      return { ...state, className: action.className };
    default:
      return state;
  }
};
