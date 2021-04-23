import React from "react";
import { Match } from "../../src/client/Match";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";

test.skip("display quiz", () => {
  //TODO: make an better test

  const matchDisplay = (
    <MemoryRouter>
      <Match />
    </MemoryRouter>
  );

  const tree = renderer.create(matchDisplay).toJSON();

  expect(tree).toMatchSnapshot();
});

test("checkQuizDisplayed", () => {
  render(
    <MemoryRouter>
      <Match />
    </MemoryRouter>
  );
});
