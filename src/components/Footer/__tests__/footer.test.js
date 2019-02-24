/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import Footer from "../../Footer";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

it("Footer renders without crashing", () => {
  const footer = document.createElement("footer");
  ReactDOM.render(<Footer />, footer);
});

it("Footer Match Snapshot", () => {
  const wrapper = shallow(<Footer />);
  expect(toJson(wrapper)).toMatchSnapshot();
});
