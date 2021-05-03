import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import FriendsMap from "./friendsMap";

describe("FriendsMap", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <FriendsMap />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});