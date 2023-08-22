import React, { useContext } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
//primeflex
import "primeflex/primeflex.css";

import ThemeProvider, { ThemeContext } from "./context/ThemeContext";
import { PrimeReactContext, PrimeReactProvider } from "primereact/api";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<PrimeReactProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</PrimeReactProvider>
		</BrowserRouter>
	</React.StrictMode>
);
