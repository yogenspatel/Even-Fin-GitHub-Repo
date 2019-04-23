/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import { Search } from "../../Search";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { configureStore } from "../../../reducers";

describe("Search Component renders correctly", () => {
  it("Search renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search />, div);
  });

  it("Search Component with Mock Data", () => {
    const store = configureStore();
    const tree = shallow(<Search store={store} />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
