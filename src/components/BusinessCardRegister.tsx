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
import { useMessage } from "../hooks/useMessage";
import { fetchSkills, insertUserDetail } from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";

type FormData = {
	userId: string;
	name: string;
	description: string;
	githubId?: string;
	qiitaId?: string;
	xId?: string;
	skill: number[];
};

export const BusinessCardRegister: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [skillData, setSkillData] = useState<{ id: number; name: string }[]>(
		[]
	);

	const { showMessage } = useMessage();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormData>();

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
	}, [showMessage]);

	const onSubmit = async (fieldValues: FormData) => {
		setIsLoading(true);
		const userData: FormData = {
			userId: fieldValues.userId,
			name: fieldValues.name,
			description: fieldValues.description,
			githubId: fieldValues.githubId,
			qiitaId: fieldValues.qiitaId,
			xId: fieldValues.xId,
			skill: fieldValues.skill,
		};
		insertUserDetail(userData)
			.then(() => {
				showMessage({
					title: "登録しました",
					status: "success",
				});
			})
			.catch((error) => {
				alert(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<Flex align="center" justify="center" p={{ base: 4, md: 10 }}>
				<Card minW="xs" key="elevated">
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardHeader>名刺新規登録</CardHeader>
						<CardBody>
							<Stack spacing="4">
								<FormControl isInvalid={!!errors.userId}>
									<FormLabel>ID（好きな英単語） *</FormLabel>
									<Input
										placeholder="coffee"
										{...register("userId", {
											required: "IDの入力は必須です",
											pattern: {
												value: /[A-Za-z]{3}/,
												message: "IDは英語3文字以上で入力してください",
											},
										})}
									/>
									<FormErrorMessage>
										{errors.userId && errors.userId.message
											? errors.userId.message.toString()
											: null}
									</FormErrorMessage>
								</FormControl>
								<FormControl isInvalid={!!errors.name}>
									<FormLabel>お名前 *</FormLabel>
									<Input
										placeholder=""
										{...register("name", {
											required: "内容の入力は必須です",
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
											required: "内容の入力は必須です",
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
										// multiple
										placeholder=""
										{...register("skill", {
											required: "内容の入力は必須です",
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
									<Input
										placeholder=""
										// {...register("title", {
										// 	required: "内容の入力は必須です",
										// })}
									/>
									<FormErrorMessage>
										{/* {errors.title && errors.title.message
										? errors.title.message.toString()
										: null} */}
									</FormErrorMessage>
								</FormControl>
								<FormControl>
									<FormLabel>Qiita ID</FormLabel>
									<Input
										placeholder=""
										// {...register("title", {
										// 	required: "内容の入力は必須です",
										// })}
									/>
									<FormErrorMessage>
										{/* {errors.title && errors.title.message
										? errors.title.message.toString()
										: null} */}
									</FormErrorMessage>
								</FormControl>
								<FormControl>
									<FormLabel>X ID</FormLabel>
									<Input
										placeholder="@不要"
										// {...register("title", {
										// 	required: "内容の入力は必須です",
										// })}
									/>
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
