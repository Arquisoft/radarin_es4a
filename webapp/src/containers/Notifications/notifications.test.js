import React from "react";
import { render, cleanup } from "react-testing-library";
import { BrowserRouter as Router } from "react-router-dom";
import Notifications from "./NotificationHelper";

describe("Notifications", () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Notifications />
    </Router>
  );

  test("App renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});