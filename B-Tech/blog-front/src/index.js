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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-uasjfxeuwrj58j4g.us.auth0.com"
			clientId="zxa0jWBh7donY0oLbt3X4FCkWVQQ9yc7"
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: "https://b-tech-api",
				scope: "openid profile email admin author user",
			}}
			cacheLocation="localstorage"
		>
			<BrowserRouter>
				<PrimeReactProvider>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</PrimeReactProvider>
			</BrowserRouter>
		</Auth0Provider>
	</React.StrictMode>
);
