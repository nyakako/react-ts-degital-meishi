import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { FC, useEffect, useState } from "react";
import { SiGithub, SiQiita, SiX } from "react-icons/si";
import { useParams } from "react-router-dom";
import { User } from "../domain/user";
import { getUserAndSkills } from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";

export const BusinessCard: FC = () => {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		const GetUserData = async (id: string) => {
			setIsLoading(true);
			getUserAndSkills(id)
				.then((userData) => {
					setUserData(userData);
					// console.log(userData);
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
			// ;
		}
	}, [id]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{userData ? (
				<Flex h="100vh" align="center" justify="center" p={{ base: 4, md: 10 }}>
					<Card minW="xs" key="elevated">
						<CardHeader>{userData.name}</CardHeader>
						<CardBody>
							<Stack spacing="4">
								<Box>
									<Heading size="m">自己紹介：</Heading>
									<Text pt="2" fontSize="s">
										{parse(DOMPurify.sanitize(userData.description))}
										{parse(userData.description)}
									</Text>
								</Box>
								<Box>
									<Heading size="m">スキル:</Heading>
									<Text pt="2" fontSize="s">
										{userData.skills.join(", ")}
									</Text>
								</Box>
							</Stack>
						</CardBody>
						<CardFooter justify="space-between" flexWrap="wrap">
							{userData.x_id && (
								<IconButton
									as="a"
									target="_blank"
									href={userData.x_id}
									colorScheme="gray"
									aria-label="X Button"
									icon={<SiX />}
								/>
							)}
							{userData.qiita_id && (
								<IconButton
									as="a"
									target="_blank"
									href={userData.qiita_id}
									colorScheme="green"
									aria-label="Qiita Button"
									icon={<SiQiita />}
								/>
							)}
							{userData.github_id && (
								<IconButton
									as="a"
									target="_blank"
									href={userData.github_id}
									colorScheme="gray"
									aria-label="Github Button"
									icon={<SiGithub />}
								/>
							)}
						</CardFooter>
					</Card>
				</Flex>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};
