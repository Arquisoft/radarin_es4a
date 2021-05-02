import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

afterAll(cleanup);

describe("App", () => {
	it("renders without crashing", () => {
		expect(<App />).toBeTruthy();
	});
});