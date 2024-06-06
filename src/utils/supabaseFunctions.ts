import { User } from "../domain/user";
import { supabase } from "./supabase";

interface UserFormData {
	user_id: string;
	name: string;
	description: string;
	github_id?: string;
	qiita_id?: string;
	x_id?: string;
}

export const fetchSkills = async () => {
	const { data, error } = await supabase.from("skills").select("id, name");
	return { data, error };
};

export const insertUserDetail = async (userData: UserFormData) => {
	const { data, error } = await supabase
		.from("users")
		.insert([userData])
		.select();
	return { data, error };
};

export const insertUserSkills = async (userId: string, skillIds: number[]) => {
	const skillsArray = Array.isArray(skillIds) ? skillIds : [skillIds];

	const { error } = await supabase
		.from("user_skill")
		.insert(
			skillsArray.map((skillId) => ({ user_id: userId, skill_id: skillId }))
		);
	return { error };
};

export const fetchUserDetails = async (userId: string) => {
	const { data, error } = await supabase
		.from("users")
		.select(
			`
      user_id, name, description, github_id, qiita_id, x_id,
      user_skill ( skill_id, skills ( name ) )
    `
		)
		.eq("user_id", userId)
		.single();

	console.log(data);

	if (data) {
		const skills = data.user_skill.flatMap(
			(item: { skills: { name: string }[]; skill_id: number }) => {
				if (Array.isArray(item.skills)) {
					return item.skills.map((skill) => skill.name);
				} else {
					return [];
				}
			}
		);
		const user = new User(
			data.user_id,
			data.name,
			data.description,
			data.github_id,
			data.qiita_id,
			data.x_id,
			skills
		);
		console.log(user);
		return { user, error };
	} else {
		return { data, error };
	}
};
