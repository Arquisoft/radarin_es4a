import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import PageBanned from "./page-banned.component";

describe("Page Banned", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <PageBanned />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});
