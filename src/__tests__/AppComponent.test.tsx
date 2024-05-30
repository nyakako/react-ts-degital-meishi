import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("App", () => {
	test("should render title", async () => {
		render(<App />);
		await waitFor(() => screen.getByRole("heading", { name: "Hello World" }));
		expect(screen.getByText("Hello World")).toBeInTheDocument();
	});

	// test("logRoles: アクセシブルネームを確認する", async () => {
	// 	const { container } = render(<App />);
	// 	await waitFor(() => screen.getByRole("heading", { name: "Hello World" }));

	// 	logRoles(container);
	// });
});
