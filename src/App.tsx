import { useEffect } from "react";

function App() {
	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// const getAllUsers = async () => {
		// 	setIsLoading(true);
		// 	fetchUsers()
		// 		.then((data) => {
		// 			console.log(data);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error.message);
		// 		})
		// 		.finally(() => {
		// 			setIsLoading(false);
		// 		});
		// };
		// getAllUsers();
	}, []);

	// if (isLoading) {
	// 	return <LoadingSpinner />;
	// }

	return (
		<>
			<h1>Hello World</h1>
		</>
	);
}

export default App;
