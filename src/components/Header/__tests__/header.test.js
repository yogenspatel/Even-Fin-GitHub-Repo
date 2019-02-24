/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import Header from "../../Header";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("renders Header without crashing", () => {
  const header = document.createElement("header");
  ReactDOM.render(<Header />, header);
});

it("Matches Header Snapshot", () => {
  const wrapper = shallow(<Header />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it("contains Header Image", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find("img").length).toBe(1);
});
