import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { BusinessCard } from "./components/BusinessCard.tsx";
import { BusinessCardRegister } from "./components/BusinessCardRegister.tsx";
import { theme } from "./theme/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/cards/register" element={<BusinessCardRegister />} />
					<Route path="cards/:user_id" element={<BusinessCard />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
);
