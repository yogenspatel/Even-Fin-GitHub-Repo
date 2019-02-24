/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import SearchResults from "../../SearchResults";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import SearchMockData from "../__mocks__/searchData";
import SearchMockData2 from "../__mocks__/searchData2";

it("SearchResults renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchResults />, div);
});

it("SearchResults Match Snapshot", () => {
  const wrapper = shallow(<SearchResults />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it("SearchResults with mock data", () => {
  const props = { results: SearchMockData };
  const wrapper = shallow(<SearchResults {...props} />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it("SearchResults Full Name", () => {
  const props = { results: SearchMockData2 };
  const wrapper = shallow(<SearchResults {...props} />);
  expect(wrapper.find("a").text()).toEqual(SearchMockData2[0].full_name);
});

it("SearchResults Star Count", () => {
  const props = { results: SearchMockData2 };
  const wrapper = shallow(<SearchResults {...props} />);
  expect(parseInt(wrapper.find(".stars").text())).toEqual(SearchMockData2[0].stargazers_count);
});

it("SearchResults License name", () => {
  const props = { results: SearchMockData2 };
  const wrapper = shallow(<SearchResults {...props} />);
  expect(wrapper.find(".license").text()).toEqual(SearchMockData2[0].license.name);
});

it("SearchResults Fork Yes", () => {
  const props = { results: SearchMockData2 };
  const wrapper = shallow(<SearchResults {...props} />);
  expect(wrapper.find(".forked").length).toBe(1);
});
