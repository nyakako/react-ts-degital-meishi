import { supabase } from "./supabase";

export async function fetchUsers() {
	return supabase
		.from("users")
		.select("*")
		.then((response) => {
			if (response.error) {
				throw new Error(
					`データの取得に失敗しました: ${response.error.message}`
				);
			}

			return response.data;
		});
}

export async function getUserSkills(id: string) {
	return supabase
		.from("users")
		.select("name, user_skill(skill_id), skills(name)")
		.eq("id", id)
		.then(({ data, error }) => {
			if (error) {
				throw new Error(`データの取得に失敗しました: ${error.message}`);
			}
			return data;
		});
}
