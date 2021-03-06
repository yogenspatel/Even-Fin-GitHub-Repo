/* eslint-disable no-console */
import Axios from "axios";

export const PERFORM_SEARCH = "PERFORM_SEARCH";
export const GET_QUERY_PARAMS = "GET_QUERY_PARAMS";
const GitSearchBaseURL = "https://api.github.com/search/repositories?q=";
export const LOADING_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  ERROR: "ERROR",
  COMPLETE: "COMPLETE"
};
export const searchActions = {
  SET_SEARCH_STATUS: "SET_SEARCH_STATUS",
  SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
  SET_SEARCH_ERROR: "SET_SEARCH_ERROR"
};

function setLoadingStatus(status) {
  return { type: searchActions.SET_SEARCH_STATUS, status };
}
function setSearchResults(results) {
  return {
    type: searchActions.SET_SEARCH_RESULTS,
    results
  };
}

function setError(error) {
  return {
    type: searchActions.SET_SEARCH_ERROR,
    error
  };
}

export function performSearch(queryParams) {
  const url = `${GitSearchBaseURL}${queryParams.searchText}${
    queryParams.stars ? `+stars:${queryParams.stars}` : ""
  }${queryParams.fork ? "+fork:true" : ""}+license:${
    queryParams.license ? queryParams.license : "mit"
  }`;
  const request = Axios.get(url);

  return {
    type: PERFORM_SEARCH,
    payload: request
  };
}

export function performSearchUsingThunk(queryParams) {
  const url = `${GitSearchBaseURL}${queryParams.searchText}${
    queryParams.stars ? `+stars:${queryParams.stars}` : ""
  }${queryParams.fork ? "+fork:true" : ""}+license:${
    queryParams.license ? queryParams.license : "mit"
  }`;

  return dispatch => {
    dispatch(setLoadingStatus(LOADING_STATUS.IN_PROGRESS));
    return Axios.get(url)
      .then(response => {
        dispatch(setLoadingStatus(LOADING_STATUS.COMPLETE));
        dispatch(setSearchResults(response));
      })
      .catch(error => {
        dispatch(setLoadingStatus(LOADING_STATUS.ERROR));
        dispatch(setError(error));
      });
  };
}

export function loadFromQueryParams(searchParams) {
  const search = searchParams || window.location.search.substring(1);
  const searchParamObj = search
    ? JSON.parse(
        `{"${decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
      )
    : {};
  return {
    type: GET_QUERY_PARAMS,
    payload: searchParamObj
  };
}
