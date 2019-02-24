/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import SearchResults from "../../SearchResults";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("SearchResults renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchResults />, div);
});

it("SearchResults Match Snapshot", () => {
  const wrapper = shallow(<SearchResults />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
