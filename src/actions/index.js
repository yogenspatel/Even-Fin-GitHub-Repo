/* eslint-disable no-console */

export const GET_TODO_DATA = "GET_TODO_DATA";
export const SET_LOADING_STATUS = "SET_LOADING_STATUS";
export const SET_DATA_ERROR = "SET_DATA_ERROR";
export const LOADING_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  ERROR: "ERROR",
  COMPLETE: "COMPLETE"
};

const todosService = "https://jsonplaceholder.typicode.com/todos";
function setLoadingStatus(status) {
  return {
    type: SET_LOADING_STATUS,
    status
  };
}

function setTodoData(data) {
  return {
    type: GET_TODO_DATA,
    payload: data
  };
}

function setError(error) {
  return {
    type: SET_DATA_ERROR,
    error
  };
}

export function getTodoData() {
  return dispatch => {
    dispatch(setLoadingStatus(LOADING_STATUS.IN_PROGRESS));
    return fetch(todosService)
      .then(response => {
        dispatch(setLoadingStatus(LOADING_STATUS.COMPLETE));
        return response.json();
      })
      .then(data => {
        dispatch(setTodoData(data));
      })
      .catch(error => {
        dispatch(setLoadingStatus(LOADING_STATUS.ERROR));
        dispatch(setError(error));
      });
  };
}
