/* eslint-disable no-case-declarations */
import { SEARCH_DATA, TOGGLE_GREEN_COLOR } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return { ...state, search_data: action.search_data };
    case TOGGLE_GREEN_COLOR:
      return { ...state, className: action.className };
    default:
      return state;
  }
};
