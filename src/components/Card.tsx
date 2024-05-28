import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserSkills } from "../utils/supabaseFunctions";

export const Card: FC = () => {
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const data = async (id: string) => await getUserSkills(id);
		console.log(data);
	}, []);

	return (
		<div>
			<p>id:{id}</p>
		</div>
	);
};
