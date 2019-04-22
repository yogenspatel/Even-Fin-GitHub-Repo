import { SEARCH_DATA } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return action.search_data;
    default:
      return state;
  }
};
