import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { fetchUsers } from "./utils/supabaseFunctions";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getAllUsers = async () => {
			setIsLoading(true);
			fetchUsers()
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};
		getAllUsers();
	}, []);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<h1>Hello World</h1>
			<h2>github test</h2>
			<Button colorScheme="blue">Button</Button>
		</>
	);
}

export default App;
