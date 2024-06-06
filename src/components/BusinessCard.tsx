import {
	Box,
	Button,
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
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../domain/user";
import { useMessage } from "../hooks/useMessage";
import { fetchUserDetails } from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";
import SanitizedComponent from "./SanitizedComponent";

export const BusinessCard: FC = () => {
	const { user_id } = useParams<{ user_id: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);

	const { showMessage } = useMessage();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		const getUserDetails = async () => {
			if (user_id) {
				const { user, error } = await fetchUserDetails(user_id);
				console.log(user_id);
				if (error) {
					showMessage({
						title: "スキルの取得に失敗しました",
						status: "error",
					});
					setIsLoading(false);
					return;
				}

				if (user) {
					setUserData(user);
					setIsLoading(false);
				}
			}
		};

		getUserDetails();
	}, [user_id, showMessage]);

	const handleClickBack = () => {
		navigate("/");
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			{userData ? (
				<Stack
					spacing="4"
					h="100vh"
					align="center"
					justify="center"
					p={{ base: 4, md: 10 }}
				>
					<Card minW="xs" w="90%" maxW="md" key="elevated">
						<CardHeader>{userData.name}</CardHeader>
						<CardBody>
							<Stack spacing="4">
								<Box>
									<Heading size="m">自己紹介：</Heading>
									<SanitizedComponent html={userData.description} />
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
					<Button
						colorScheme="blue"
						minW="xs"
						w="90%"
						maxW="md"
						onClick={handleClickBack}
					>
						戻る
					</Button>
				</Stack>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};
