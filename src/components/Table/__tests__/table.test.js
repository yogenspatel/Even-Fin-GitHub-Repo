/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import { Table } from "../../Table";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { configureStore } from "../../../reducers";

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
const searchData = [
  {
    id: 2,
    title: "this is test"
  },
  {
    id: 4,
    title: "quo laboriosam deleniti aut qui"
  }
];

describe("Table Component renders correctly", () => {
  it("Table renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table />, div);
  });

  it("Table Component with Mock Data", () => {
    const store = configureStore();
    const tree = shallow(<Table store={store} userData={data} SortBy={jest.fn} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("Table Component without mock data", () => {
    const store = configureStore();
    const tree = shallow(<Table store={store} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("Table Component with search data", () => {
    const store = configureStore();
    const tree = shallow(<Table store={store} userData={searchData} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
