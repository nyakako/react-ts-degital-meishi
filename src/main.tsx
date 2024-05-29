import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { BussinessCard } from "./components/BussinessCard.tsx";
import theme from "./theme/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="cards/:id" element={<BussinessCard />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
