import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import Settings from "./settingsRadio";

describe("Page Not Found", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Settings />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});