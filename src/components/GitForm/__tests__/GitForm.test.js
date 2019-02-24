/* eslint-disable no-undef */
import { validate } from "../../GitForm";

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
