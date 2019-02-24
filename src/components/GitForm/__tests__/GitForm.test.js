/* eslint-disable no-undef */

import React from "react";
import GitForm from "../../GitForm";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { validate } from "../../GitForm";
import { configureStore } from "../../../reducers";

it("Git Form renders without crashing", () => {
  const store = configureStore();
  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <GitForm handleSubmit={() => {}} />
        </MemoryRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("Validates search Text", () => {
  const validFn = validate({ searchText: "test Search Text" });
  expect(validFn).toEqual({});
});

it("Validates search Text with less than 2 chars", () => {
  const validFn = validate({ searchText: "t" });
  expect(validFn).toEqual({ searchText: "Minimum be 2 characters or more" });
});

it("Validates search Text when no search term entered", () => {
  const validFn = validate({ searchText: "" });
  expect(validFn).toEqual({ searchText: "Required" });
});
