import { TOGGLE_CLASS } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case TOGGLE_CLASS:
      return { ...state, className: action.className };
    default:
      return state;
  }
};
