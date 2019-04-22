import { GET_TODO_DATA, SET_LOADING_STATUS, SET_DATA_ERROR } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return { ...state, status: action.status };
    case SET_DATA_ERROR:
      return { ...state, status: action.error };
    case GET_TODO_DATA:
      return action.payload ? action.payload : state;
    default:
      return state;
  }
};
