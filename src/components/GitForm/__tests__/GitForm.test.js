/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import GitForm from "../../GitForm";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

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
