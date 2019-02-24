/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import Header from "../../Header";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("Header renders without crashing", () => {
  const header = document.createElement("header");
  ReactDOM.render(<Header />, header);
});

it("Header Match Snapshot", () => {
  const wrapper = shallow(<Header />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
