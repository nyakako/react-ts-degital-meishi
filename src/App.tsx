import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type formData = {
	user_id: string;
};

function App() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<formData>();
	const navigate = useNavigate();

	const onSubmit = (fieldValue: formData) => {
		const { user_id } = fieldValue;
		navigate(`/cards/${user_id}`);
		reset();
	};

	return (
		<>
			<Flex h="100vh" align="center" justify="center">
				<Card align="center" p={{ base: 4, md: 4 }} minW="xs" w="80%" maxW="md">
					<Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
						<CardHeader>
							<Heading size="md">デジタル名刺アプリ</Heading>
						</CardHeader>
						<CardBody px={2} py={4}>
							<FormControl isInvalid={!!errors.user_id}>
								<FormLabel>ID（好きな英単語）</FormLabel>
								<Input
									placeholder="coffee"
									{...register("user_id", {
										required: "IDの入力は必須です",
										pattern: {
											value: /[A-Za-z]{3}/,
											message: "IDは英字3文字以上です",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.user_id && errors.user_id.message
										? errors.user_id.message.toString()
										: null}
								</FormErrorMessage>
							</FormControl>
						</CardBody>
						<CardFooter p={2}>
							<Button
								colorScheme="blue"
								type="submit"
								isLoading={isSubmitting}
								w="100%"
							>
								名刺を見る
							</Button>
						</CardFooter>
					</Box>
				</Card>
			</Flex>
		</>
	);
}

export default App;
