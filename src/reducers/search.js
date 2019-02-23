import { PERFORM_SEARCH } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case PERFORM_SEARCH:
      return action.payload.data.items;
    default:
      break;
  }
  return state;
};
