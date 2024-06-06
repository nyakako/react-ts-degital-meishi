import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

describe("App", () => {
	test("should render title", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		const pageTitle = screen.getByRole("heading", {
			name: "デジタル名刺アプリ",
		});
		expect(pageTitle).toBeInTheDocument();
	});

	// test("logRoles: アクセシブルネームを確認する", async () => {
	// 	const { container } = render(<App />);
	// 	await waitFor(() => screen.getByRole("heading", { name: "Hello World" }));

	// 	logRoles(container);
	// });
});
