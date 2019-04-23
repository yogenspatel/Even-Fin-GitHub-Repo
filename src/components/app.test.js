/* eslint-disable no-undef */

import React from "react";
import { App } from "./app";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { configureStore } from "../reducers";
import { LOADING_STATUS } from "../actions";

const data = [
  {
    id: 2,
    title: "this is test"
  },
  {
    id: 1,
    title: "delectus aut autem"
  },
  {
    id: 3,
    title: "quis ut nam facilis et officia qui"
  },
  {
    id: 4,
    title: "quo laboriosam deleniti aut qui"
  }
];

describe("App Component renders correctly", () => {
  it("App Component with Mock Data", () => {
    const store = configureStore();
    const tree = shallow(<App store={store} userData={data} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("App Component without mock data", () => {
    const mockData = {
      status: LOADING_STATUS.IN_PROGRESS
    };
    const store = configureStore();
    const tree = shallow(<App store={store} userData={mockData} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("App Component with error", () => {
    const mockData = {
      status: LOADING_STATUS.ERROR
    };
    const store = configureStore();
    const tree = shallow(<App store={store} userData={mockData} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
