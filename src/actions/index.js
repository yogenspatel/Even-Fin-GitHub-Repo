import Axios from 'axios';

export const PERFORM_SEARCH = 'PERFORM_SEARCH';
const GitSearchBaseURL = 'https://api.github.com/search/repositories?q=';

export function performSearch(queryParams) {
  const url = `${GitSearchBaseURL}${queryParams.searchText}${
    queryParams.stars ? `+stars:${queryParams.stars}` : ''}${queryParams.hasForked ? '+fork:true' : ''}+licence:${queryParams.licence ? queryParams.licence : 'mit'}`;
  const request = Axios.get(url);

  return {
    type: PERFORM_SEARCH,
    payload: request,
  };
}
