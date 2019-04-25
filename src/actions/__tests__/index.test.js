/* eslint-disable no-undef */
import { loadFromQueryParams, GET_QUERY_PARAMS } from "../../actions";

it("creates queryParams action 1 param", () => {
  // The expected actions to receive.
  const expectedPayload = { searchText: "Repo" };
  const expectedAction = {
    type: GET_QUERY_PARAMS,
    payload: expectedPayload
  };

  // Fire the fetch and match the expected actions.
  const queryParams = "searchText=Repo";
  expect(loadFromQueryParams(queryParams)).toEqual(expectedAction);
});

it("creates queryParams action multiple param", () => {
  // The expected actions to receive.
  const expectedPayload = { searchText: "Repo", stars: "stars" };
  const expectedAction = {
    type: GET_QUERY_PARAMS,
    payload: expectedPayload
  };

  // Fire the fetch and match the expected actions.
  const queryParams = "searchText=Repo&stars=stars";
  expect(loadFromQueryParams(queryParams)).toEqual(expectedAction);
});
