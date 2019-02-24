/* eslint-disable no-console */
import Axios from "axios";

export const PERFORM_SEARCH = "PERFORM_SEARCH";
const GitSearchBaseURL = "https://api.github.com/search/repositories?q=";

export function performSearch(queryParams) {
  console.log("In Action :: ");
  const url = `${GitSearchBaseURL}${queryParams.searchText}${
    queryParams.stars ? `+stars:${queryParams.stars}` : ""
  }${queryParams.hasForked ? "+fork:true" : ""}+license:${
    queryParams.license ? queryParams.license : "mit"
  }`;
  console.log("In Action: ", url);
  const request = Axios.get(url);

  return {
    type: PERFORM_SEARCH,
    payload: request
  };
}
