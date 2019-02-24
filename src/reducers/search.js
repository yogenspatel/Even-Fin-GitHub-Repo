import { PERFORM_SEARCH } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case PERFORM_SEARCH:
      return action.payload.data ? action.payload.data.items : state;
    default:
      break;
  }
  return state;
};
