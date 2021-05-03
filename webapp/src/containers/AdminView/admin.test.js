import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import AdminView from "./adminView";

describe("AdminView", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <AdminView />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});