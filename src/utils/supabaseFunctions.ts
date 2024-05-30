import { User } from "../domain/user";
import { supabase } from "./supabase";

// type skill = {
// 	id: number;
// 	name: string;
// 	created_at: string;
// };

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

export async function fetchSkills() {
	return supabase
		.from("skills")
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

// export async function getUserSkills(id: string) {
// 	return supabase
// 		.from("user_skill")
// 		.select("skill_id,skills (name)")
// 		.eq("user_id", id)
// 		.then(({ data, error }) => {
// 			if (error) {
// 				// throw new Error(`データの取得に失敗しました: ${error.message}`);
// 				console.error("Error fetching user skills:", error);
// 			}
// 			// return data;
// 			console.log("User skills:", data);
// 		});
// }

export async function getUserAndSkills(userId: string): Promise<User | null> {
	const { data, error } = await supabase
		.from("users")
		.select(
			`
      user_id,
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      user_skill (
        skill_id,
        skills (
          name
        )
      )
    `
		)
		.eq("user_id", userId);

	if (error) {
		console.error("Error fetching user and skills:", error);
		return null;
	}

	if (data.length === 0) {
		console.log("No user found with the specified userId");
		return null;
	}

	const userData = data[0];
	const skills = userData.user_skill.map((skill: any) => skill.skills.name);

	const user = new User(
		userData.user_id,
		userData.name,
		userData.description,
		userData.github_id,
		userData.qiita_id,
		userData.x_id,
		skills
	);

	return user;
}
