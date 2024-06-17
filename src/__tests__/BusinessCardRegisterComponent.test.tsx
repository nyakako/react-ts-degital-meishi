import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import "../__mocks__/matchMedia.ts";
import { BusinessCardRegister } from "../components/BusinessCardRegister";
import * as supabaseFunctions from "../utils/supabaseFunctions";

type Skill = {
	id: number;
	name: string;
};

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

jest.mock("../utils/supabaseFunctions");

describe("BusinessCardRegisterComponent", () => {
	const mockSkill: Skill[] = [
		{ id: 1, name: "React" },
		{ id: 2, name: "TypeScript" },
		{ id: 3, name: "Github" },
	];
	beforeEach(() => {
		jest
			.spyOn(supabaseFunctions, "fetchSkills")
			.mockResolvedValue({ data: mockSkill, error: null });
		jest
			.spyOn(supabaseFunctions, "insertUserDetail")
			.mockResolvedValue({ data: [{ id: "test_id" }], error: null });
		jest
			.spyOn(supabaseFunctions, "insertUserSkills")
			.mockResolvedValue({ error: null });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("1.タイトルが表示されている", async () => {
		render(
			<ChakraProvider>
				<MemoryRouter initialEntries={["/cards/register"]}>
					<Routes>
						<Route path="/cards/register" element={<BusinessCardRegister />} />
					</Routes>
				</MemoryRouter>
			</ChakraProvider>
		);

		await waitFor(() => {
			// screen.debug();
			const pageTitle = screen.getByRole("heading", { name: "名刺新規登録" });
			expect(pageTitle).toBeInTheDocument();
		});
	});

	test("2.全項目入力して登録ボタンを押すと/に遷移する", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<ChakraProvider>
				<MemoryRouter initialEntries={["/cards/register"]}>
					<Routes>
						<Route path="/cards/register" element={<BusinessCardRegister />} />
					</Routes>
				</MemoryRouter>
			</ChakraProvider>
		);

		await waitFor(() => {
			const pageTitle = screen.getByRole("heading", { name: "名刺新規登録" });
			expect(pageTitle).toBeInTheDocument();
		});

		const inputUserId = screen.getByLabelText(/ID（好きな英単語）/);
		const inputName = screen.getByLabelText(/名前/);
		const inputDescription = screen.getByLabelText(/自己紹介/);

		const selectSkill = screen.getByRole("combobox");
		await userEvent.click(selectSkill);
		const option = screen.getByText("React");
		await userEvent.click(option);
		// screen.debug();

		const inputGithubId = screen.getByLabelText(/GitHub/);
		const inputXId = screen.getByLabelText(/X ID/);
		const inputQiitaId = screen.getByLabelText(/Qiita/);

		fireEvent.change(inputUserId, {
			target: { value: "test_id" },
		});
		fireEvent.change(inputName, {
			target: { value: "test_name" },
		});
		fireEvent.change(inputDescription, {
			target: { value: "test_description" },
		});

		fireEvent.change(inputGithubId, {
			target: { value: "test_github_id" },
		});
		fireEvent.change(inputXId, {
			target: { value: "test_x_id" },
		});
		fireEvent.change(inputQiitaId, {
			target: { value: "test_qiita_id" },
		});

		const submitButton = screen.getByRole("button", { name: "登録" });
		await waitFor(() => {
			fireEvent.click(submitButton);
			expect(navigate).toHaveBeenCalledWith("/");
		});
	});

	test("3.ID、名前、自己紹介、好きな技術の入力がないときにエラーメッセージが表示する", async () => {
		render(
			<ChakraProvider>
				<MemoryRouter initialEntries={["/cards/register"]}>
					<Routes>
						<Route path="/cards/register" element={<BusinessCardRegister />} />
					</Routes>
				</MemoryRouter>
			</ChakraProvider>
		);

		await waitFor(() => {
			const pageTitle = screen.getByRole("heading", { name: "名刺新規登録" });
			expect(pageTitle).toBeInTheDocument();
		});

		const submitButton = screen.getByRole("button");
		await waitFor(() => {
			fireEvent.click(submitButton);
			const idErrorMessage = screen.getByText("IDの入力は必須です");
			const nameErrorMessage = screen.getByText("名前の入力は必須です");
			const descriptionErrorMessage =
				screen.getByText("自己紹介の入力は必須です");
			const skillErrorMessage = screen.getByText("好きな技術の入力は必須です");
			expect(idErrorMessage).toBeInTheDocument();
			expect(nameErrorMessage).toBeInTheDocument();
			expect(descriptionErrorMessage).toBeInTheDocument();
			expect(skillErrorMessage).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("4.オプションを入力しなくても登録ができる", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<ChakraProvider>
				<MemoryRouter initialEntries={["/cards/register"]}>
					<Routes>
						<Route path="/cards/register" element={<BusinessCardRegister />} />
					</Routes>
				</MemoryRouter>
			</ChakraProvider>
		);

		await waitFor(() => {
			const pageTitle = screen.getByRole("heading", { name: "名刺新規登録" });
			expect(pageTitle).toBeInTheDocument();
		});

		const inputUserId = screen.getByLabelText(/ID（好きな英単語）/);
		const inputName = screen.getByLabelText(/名前/);
		const inputDescription = screen.getByLabelText(/自己紹介/);

		const selectSkill = screen.getByRole("combobox");
		await userEvent.click(selectSkill);
		const option = screen.getByText("React");
		await userEvent.click(option);

		fireEvent.change(inputUserId, {
			target: { value: "test_id" },
		});
		fireEvent.change(inputName, {
			target: { value: "test_name" },
		});
		fireEvent.change(inputDescription, {
			target: { value: "test_description" },
		});
		// screen.debug();

		const submitButton = screen.getByRole("button", { name: "登録" });
		await waitFor(() => {
			fireEvent.click(submitButton);
			expect(navigate).toHaveBeenCalledWith("/");
		});
	});
});
