import { render, cleanup } from "react-testing-library";
import Labeled from "./labeled.component";

afterAll(cleanup);

describe("Labeled", () => {
	it("renders without crashing", () => {
		expect(render(Labeled)).toBeTruthy();
	});
});