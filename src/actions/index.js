/* eslint-disable no-console */

export const GET_TODO_DATA = "GET_TODO_DATA";
export const SET_LOADING_STATUS = "SET_LOADING_STATUS";
export const SET_DATA_ERROR = "SET_DATA_ERROR";
export const SORT_DATA = "SORT_DATA";
export const SEARCH_DATA = "SEARCH_DATA";

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

//Comparer Function
function GetSortOrder(prop, order) {
  return function(a, b) {
    if (order === "dec") {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
    } else if (order === "asc") {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
    }
    return 0;
  };
}

function trimString(s) {
  var l = 0,
    r = s.length - 1;
  while (l < s.length && s[l] == " ") l++;
  while (r > l && s[r] == " ") r -= 1;
  return s.substring(l, r + 1);
}

function searchFor(toSearch, data) {
  if (!toSearch) {
    return data;
  }
  var results = [];
  toSearch = trimString(toSearch); // trim it
  for (var i = 0; i < data.length; i++) {
    let objValues = Object.values(data[i]);
    for (var key in objValues) {
      if (toSearch && objValues[key].toString().indexOf(toSearch) != -1) {
        results.push(data[i]);
      }
    }
  }
  return results;
}

export function SortBy(keyToSort, data, order) {
  let dataToSort = data;
  dataToSort.sort(GetSortOrder(keyToSort, order));
  return {
    type: SORT_DATA,
    sort_data: dataToSort
  };
}

export function SearchData(dataToSearch, data) {
  const searchData = searchFor(dataToSearch, data);
  return {
    type: SEARCH_DATA,
    search_data: searchData
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
