import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import { BusinessCard } from "../components/BusinessCard";
import { BusinessCardRegister } from "../components/BusinessCardRegister";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

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

	test("2.IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		const inputUserId = screen.getByLabelText("ID（好きな英単語）");

		fireEvent.change(inputUserId, {
			target: { value: "test_id" },
		});

		// screen.debug();
		const submitButton = screen.getByRole("button", { name: "名刺を見る" });
		await waitFor(() => {
			fireEvent.click(submitButton);
			expect(navigate).toHaveBeenCalledWith("/cards/test_id");
		});
	});

	test("3.IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		const inputUserId = screen.getByLabelText("ID（好きな英単語）");

		fireEvent.change(inputUserId, {
			target: { value: "" },
		});

		const submitButton = screen.getByRole("button", { name: "名刺を見る" });

		await waitFor(() => {
			fireEvent.click(submitButton);
			const idErrorMessage = screen.getByText("IDの入力は必須です");
			expect(idErrorMessage).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("4.新規登録はこちらを押すと/cards/registerに遷移する", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<MemoryRouter initialEntries={["/"]}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/cards/register" element={<BusinessCardRegister />} />
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		const registerLink = screen.getByRole("button", {
			name: "新規登録はこちら",
		});

		await waitFor(() => {
			fireEvent.click(registerLink);
			expect(navigate).toHaveBeenCalledWith("/cards/register");
			// screen.debug();
		});
	});
});
