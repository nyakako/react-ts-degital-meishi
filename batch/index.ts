import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

// 前日以前に作成したuserを削除する関数
// Github ActionsのcronはUTCで動作するため、JSTに変換する
const deleteOldUser = async () => {
	const now = new Date();
	now.setUTCHours(now.getUTCHours() + 9); // UTCをJSTに変換
	const todayMidnightJST = new Date(now.setHours(0, 0, 0, 0));

	console.log(todayMidnightJST + "より古いデータを削除します。");

	const { data, error } = await supabase
		.from("users")
		.delete()
		.lt("created_at", todayMidnightJST.toISOString()) //lt = less than to a value
		.neq("user_id", "sample_id") //sample_idのユーザーは削除しない
		.select();

	if (error) {
		console.error(error.message);
	}

	console.log(data);

	if (data?.length) {
		console.log("success! 削除されたユーザー数: ", data.length);
	} else {
		console.log("削除するユーザーはいませんでした。");
	}
	return { data, error };
};

deleteOldUser();
