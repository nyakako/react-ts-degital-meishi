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
import { fetchSkills } from "../utils/supabaseFunctions";
import { LoadingSpinner } from "./LoadingSpinner";

type Skill = {
	id: string;
	name: string;
	created_at: string;
};

export const BusinessCardRegister: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [skillData, setSkillData] = useState<Skill[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	useEffect(() => {
		const getAllSkills = async () => {
			setIsLoading(true);
			fetchSkills()
				.then((data) => {
					console.log(data);
					setSkillData(data);
				})
				.catch((error) => {
					console.log(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};
		getAllSkills();
	}, []);

	const onSubmit = () => {};

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
