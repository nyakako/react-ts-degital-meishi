import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
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
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("1.should render title", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/register"]}>
				<Routes>
					<Route path="/cards/register" element={<BusinessCardRegister />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const pageTitle = screen.getByRole("heading", { name: "名刺新規登録" });
			// const pageTitle = screen.getByRole("");
			// screen.getByRole("");
			expect(pageTitle).toBeInTheDocument();
			screen.debug();
		});
	});
});
