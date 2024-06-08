import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { BusinessCard } from "../components/BusinessCard";
import { User } from "../domain/user";
import * as supabaseFunctions from "../utils/supabaseFunctions";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

jest.mock("../utils/supabaseFunctions");

describe("BusinessCardComponent", () => {
	const mockUser: User = {
		user_id: "test_user_id",
		name: "test_name",
		description: "<p>test_description</p>",
		github_id: "https://github.com/test_github_id",
		qiita_id: "https://qiita.com/test_qiita_id",
		x_id: "https://x.com/test_x_id",
		skills: ["test_skill", "test_skill2"],
	};

	beforeEach(() => {
		jest
			.spyOn(supabaseFunctions, "fetchUserDetails")
			.mockResolvedValue({ user: mockUser, error: null });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("1.should render name", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const userName = screen.getByRole("heading", { name: "test_name" });
			expect(userName).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("2.should render description", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				screen.getByRole("heading", { name: "自己紹介：" })
			).toBeInTheDocument();
			const userDescription = screen.getByText("test_description");
			expect(userDescription).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("3.should render skills", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(
				screen.getByRole("heading", { name: "スキル:" })
			).toBeInTheDocument();
			const userSkills = screen.getByText("test_skill, test_skill2");
			expect(userSkills).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("4.should render github button", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const xButton = screen.getByRole("link", { name: "Github Button" });
			expect(xButton).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("5.should render qiita button", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const qiitaButton = screen.getByRole("link", { name: "Qiita Button" });
			expect(qiitaButton).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("6.should render x button", async () => {
		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const xButton = screen.getByRole("link", { name: "X Button" });
			expect(xButton).toBeInTheDocument();
			// screen.debug();
		});
	});

	test("7.back button navigates to home", async () => {
		const navigate = jest.fn();
		(useNavigate as jest.Mock).mockReturnValue(navigate);

		render(
			<MemoryRouter initialEntries={["/cards/test_user_id"]}>
				<Routes>
					<Route path="/cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const backButton = screen.getByRole("button", { name: "戻る" });
			fireEvent.click(backButton);
		});

		expect(navigate).toHaveBeenCalledWith("/");
	});

	// test("logRoles: アクセシブルネームを確認する", async () => {
	// 	const { container } = render(
	// 		<MemoryRouter initialEntries={["/cards/test_user_id"]}>
	// 			<Routes>
	// 				<Route path="/cards/:user_id" element={<BusinessCard />} />
	// 			</Routes>
	// 		</MemoryRouter>
	// 	);
	// 	expect(screen.getByTestId("spinner")).toBeInTheDocument();

	// 	await waitFor(() => {
	// 		const userName = screen.getByText("test_name");
	// 		expect(userName).toBeInTheDocument();
	// 		logRoles(container);
	// 	});
	// });
});
