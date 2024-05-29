import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { SiGithub, SiQiita, SiX } from "react-icons/si";
import { useParams } from "react-router-dom";
import { User } from "../domain/user";
import { getUserAndSkills } from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";

export const BussinessCard: FC = () => {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const GetUserData = async (id: string) => {
			setIsLoading(true);
			getUserAndSkills(id)
				.then((userData) => {
					setUserData(userData);
				})
				.catch((error) => {
					console.log(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};
		if (id) {
			// getUserSkills(id);
			GetUserData(id);
			// console.log(userData);
		}
	}, [id]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{userData ? (
				<Card maxW="md">
					<CardHeader>名前: {userData.name}</CardHeader>
					<CardBody>
						<Stack spacing="4">
							<Box>
								<Heading size="xs">自己紹介：</Heading>
								<Text pt="2" fontSize="sm">
									{userData.description}
								</Text>
							</Box>
							<Box>
								<Heading size="xs">スキル:</Heading>
								<Text pt="2" fontSize="sm">
									{userData.skills.join(", ")}
								</Text>
							</Box>
						</Stack>
					</CardBody>
					<CardFooter justify="space-between" flexWrap="wrap">
						<IconButton
							as="a"
							target="_blank"
							href={userData.x_id}
							colorScheme="gray"
							aria-label="X Button"
							icon={<SiX />}
						/>
						<IconButton
							as="a"
							target="_blank"
							href={userData.qiita_id}
							colorScheme="green"
							aria-label="Qiita Button"
							icon={<SiQiita />}
						/>
						<IconButton
							as="a"
							target="_blank"
							href={userData.github_id}
							colorScheme="gray"
							aria-label="Github Button"
							icon={<SiGithub />}
						/>
					</CardFooter>
				</Card>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};
