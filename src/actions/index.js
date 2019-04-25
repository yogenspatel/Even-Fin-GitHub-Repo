/* eslint-disable no-console */

export const GET_TODO_DATA = "GET_TODO_DATA";
export const SET_LOADING_STATUS = "SET_LOADING_STATUS";
export const SET_DATA_ERROR = "SET_DATA_ERROR";
export const SORT_DATA = "SORT_DATA";
export const SEARCH_DATA = "SEARCH_DATA";
export const TOGGLE_CLASS = "TOGGLE_CLASS";
export const PAGINATED_DATA = "PAGINATED_DATA";

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

function setUserData(data) {
  // const paginatedUserData = setPaginatedData(1, 10, data.length, data);
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

function searchFor(toSearch, data) {
  if (!toSearch) {
    return data;
  }
  var results = [];
  toSearch = toSearch.trim(); // trim it
  for (var i = 0; i < data.length; i++) {
    if (toSearch && data[i]["title"].indexOf(toSearch) !== -1) {
      results.push(data[i]);
    }
  }
  // console.log("in search for: ", results);
  return results;
}

/**
 * Action to toggle class
 * @param {String} className
 */
export function toggleGreenColor(className) {
  return {
    type: TOGGLE_CLASS,
    className
  };
}

function setPaginatedData(currentPage, pageSize, noOfItems, data) {
  const totalPages = noOfItems / pageSize;
  const dataForCurrentPage = [];
  if (currentPage < 1) {
    currentPage = 1;
  }
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  console.log("currentPage: ", currentPage);
  for (var i = (currentPage - 1) * pageSize; i < currentPage * pageSize; i++) {
    dataForCurrentPage.push(data[i]);
  }
  return dataForCurrentPage;
}

export function getPaginatedData(currentPage, pageSize, data) {
  const noOfItems = data.length;
  const paginatedData = setPaginatedData(currentPage, pageSize, noOfItems, data);
  return {
    type: PAGINATED_DATA,
    payload: paginatedData,
    pageSize,
    noOfItems
  };
}
/**
 * Action to sort by key
 * @param {String} keyToSort - Key to Sort
 * @param {Object} data - Data Object to Sort
 * @param {String} order - Order by Asc/Dec
 * @returns {Object} - sorted data of type SORT_DATA
 */
export function SortBy(keyToSort, data, order) {
  let dataToSort = data;
  dataToSort.sort(GetSortOrder(keyToSort, order));
  return {
    type: SORT_DATA,
    sort_data: dataToSort
  };
}

/**
 * Action to Search data
 * @param {String} dataToSearch  - String to Search
 * @param {object} data  - Data Object
 */
export function SearchData(dataToSearch, data) {
  const searchData = searchFor(dataToSearch, data);
  return {
    type: SEARCH_DATA,
    search_data: searchData
  };
}

/**
 * Action to Search data
 * @param {String} dataToSearch  - String to Search
 * @param {object} data  - Data Object
 */
export function SearchPaginatedData(dataToSearch, data) {
  const searchData = searchFor(dataToSearch, data);
  const pageSize = 10;
  const noOfItems = searchData.length;
  const paginatedSearchData = setPaginatedData(1, pageSize, noOfItems, searchData);
  return {
    type: PAGINATED_DATA,
    payload: paginatedSearchData,
    noOfItems,
    pageSize
  };
}

/**
 * Action to get user data
 */
export function getUserData() {
  return dispatch => {
    dispatch(setLoadingStatus(LOADING_STATUS.IN_PROGRESS));
    return fetch(todosService)
      .then(response => {
        dispatch(setLoadingStatus(LOADING_STATUS.COMPLETE));
        return response.json();
      })
      .then(data => {
        dispatch(setUserData(data));
      })
      .catch(error => {
        dispatch(setLoadingStatus(LOADING_STATUS.ERROR));
        dispatch(setError(error));
      });
  };
}
