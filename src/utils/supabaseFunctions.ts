import { User } from "../domain/user";
import { supabase } from "./supabase";

interface user {
	userId: string;
	name: string;
	description: string;
	githubId?: string;
	qiitaId?: string;
	xId?: string;
}

interface UserSkill {
	skill_id: number;
	skills: {
		name: string;
	}[];
}

export const fetchSkills = async () => {
	const { data, error } = await supabase.from("skills").select("id, name");
	return { data, error };
};

export const insertUserDetail = async (userData: user) => {
	const { data, error } = await supabase
		.from("users")
		.insert([userData])
		.select();
	return { data, error };
};

export const insertUserSkills = async (userId: string, skillIds: number[]) => {
	const { error } = await supabase
		.from("user_skill")
		.insert(
			skillIds.map((skillId) => ({ user_id: userId, skill_id: skillId }))
		);
	return { error };
};

export const addUserSkills = async (userId: string, skillIds: number[]) => {
	const { error } = await supabase
		.from("user_skill")
		.insert(
			skillIds.map((skillId) => ({ user_id: userId, skill_id: skillId }))
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

	if (data) {
		const skills = data.user_skill.map((skill) => skill.skills.name);
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
