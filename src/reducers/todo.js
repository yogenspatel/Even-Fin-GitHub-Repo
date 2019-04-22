import { GET_TODO_DATA, SET_LOADING_STATUS, SET_DATA_ERROR, SORT_DATA } from "../actions";

export default (state = null, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return { ...state, status: action.status };
    case SET_DATA_ERROR:
      return { ...state, status: action.error };
    case GET_TODO_DATA:
      return action.payload ? action.payload : state;
    case SORT_DATA:
      console.log('state: ', action.sort_data);
      return action.sort_data;
    default:
      return state;
  }
};
