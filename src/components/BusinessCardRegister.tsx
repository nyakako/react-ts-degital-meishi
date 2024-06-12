import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/useMessage";
import {
	fetchSkills,
	insertUserDetail,
	insertUserSkills,
} from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";

type UserRegisterForm = {
	user_id: string;
	name: string;
	description: string;
	github_id?: string;
	qiita_id?: string;
	x_id?: string;
	skill: number[];
};

export const BusinessCardRegister: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [skillData, setSkillData] = useState<{ id: number; name: string }[]>(
		[]
	);
	const navigate = useNavigate();

	const { showMessage } = useMessage();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<UserRegisterForm>();

	useEffect(() => {
		const getAllSkills = async () => {
			setIsLoading(true);
			const { data, error } = await fetchSkills();
			if (error) {
				showMessage({
					title: "スキルの取得に失敗しました",
					status: "error",
				});
				setIsLoading(false);
				return;
			}
			setSkillData(data || []);
			setIsLoading(false);
		};
		getAllSkills();
		// console.log(skillData);
	}, [showMessage]);

	const onSubmit = async (fieldValues: UserRegisterForm) => {
		setIsLoading(true);
		const { user_id, name, description, github_id, qiita_id, x_id, skill } =
			fieldValues;
		const { data: userData, error: userError } = await insertUserDetail({
			user_id,
			name,
			description,
			github_id,
			qiita_id,
			x_id,
		});

		if (userError) {
			showMessage({
				title: "ユーザーの登録に失敗しました",
				status: "error",
			});
			setIsLoading(false);
			return;
		}

		if (userData && userData.length > 0) {
			const user_id = userData[0].user_id;

			const { error: userSkillError } = await insertUserSkills(user_id, skill);

			if (userSkillError) {
				showMessage({
					title: "スキルの登録に失敗しました",
					status: "error",
				});
				setIsLoading(false);
				return;
			}
		}

		showMessage({
			title: "ユーザーが正常に登録されました",
			status: "success",
		});
		setIsLoading(false);
		reset();
		navigate("/");
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Flex align="center" justify="center" p={{ base: 4, md: 10 }}>
				<Card minW="xs" key="elevated">
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardHeader as="h1">名刺新規登録</CardHeader>
						<CardBody>
							<Stack spacing="4">
								<FormControl isInvalid={!!errors.user_id}>
									<FormLabel>ID（好きな英単語） *</FormLabel>
									<Input
										placeholder="coffee"
										{...register("user_id", {
											required: "IDの入力は必須です",
											pattern: {
												value: /[A-Za-z]{3}/,
												message: "IDは英字3文字以上で入力してください",
											},
										})}
									/>
									<FormErrorMessage>
										{errors.user_id && errors.user_id.message
											? errors.user_id.message.toString()
											: null}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={!!errors.name}>
									<FormLabel>お名前 *</FormLabel>
									<Input
										placeholder=""
										{...register("name", {
											required: "名前の入力は必須です",
										})}
									/>
									<FormErrorMessage>
										{errors.name && errors.name.message
											? errors.name.message.toString()
											: null}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={!!errors.description}>
									<FormLabel>自己紹介 *</FormLabel>
									<Textarea
										placeholder="<h1>HTMLタグも使えます</h1>"
										{...register("description", {
											required: "自己紹介の入力は必須です",
										})}
									/>
									<FormErrorMessage>
										{errors.description && errors.description.message
											? errors.description.message.toString()
											: null}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={!!errors.skill}>
									<FormLabel>好きな技術 *</FormLabel>
									<Select
										multiple
										placeholder=""
										{...register("skill", {
											required: "好きな技術の入力は必須です",
										})}
									>
										{skillData.map((skill) => (
											<option key={skill.id} value={skill.id}>
												{skill.name}
											</option>
										))}
									</Select>
									<FormErrorMessage>
										{errors.skill && errors.skill.message
											? errors.skill.message.toString()
											: null}
									</FormErrorMessage>
								</FormControl>
								<FormControl>
									<FormLabel>GitHub ID</FormLabel>
									<Input placeholder="" {...register("github_id", {})} />
									<FormErrorMessage>
										{/* {errors.title && errors.title.message
										? errors.title.message.toString()
										: null} */}
									</FormErrorMessage>
								</FormControl>
								<FormControl>
									<FormLabel>Qiita ID</FormLabel>
									<Input placeholder="" {...register("qiita_id", {})} />
									<FormErrorMessage>
										{/* {errors.title && errors.title.message
										? errors.title.message.toString()
										: null} */}
									</FormErrorMessage>
								</FormControl>
								<FormControl>
									<FormLabel>X ID</FormLabel>
									<Input placeholder="@不要" {...register("x_id", {})} />
									<FormErrorMessage>
										{/* {errors.title && errors.title.message
										? errors.title.message.toString()
										: null} */}
									</FormErrorMessage>
								</FormControl>
							</Stack>
						</CardBody>
						<CardFooter justify="center" flexWrap="wrap">
							<Button isLoading={isSubmitting} type="submit" colorScheme="teal">
								登録
							</Button>
						</CardFooter>
					</form>
				</Card>
			</Flex>
			)
		</>
	);
};
