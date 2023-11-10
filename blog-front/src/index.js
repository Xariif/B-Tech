import React, { useContext, useState } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ReducerProvider } from "./context/ReducerContext";

import { Provider } from "react-redux";
import store from "./store";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
	<Provider store={store}>
		<Auth0Provider
			domain="dev-uasjfxeuwrj58j4g.us.auth0.com"
			clientId="zxa0jWBh7donY0oLbt3X4FCkWVQQ9yc7"
			authorizationParams={{
				redirect_uri: window.location.origin,
				audience: "https://b-tech-api",
				scope: "openid profile email",
			}}
			cacheLocation="localstorage"
		>
			<BrowserRouter>
				<ReducerProvider>
					<App />
				</ReducerProvider>
			</BrowserRouter>
		</Auth0Provider>
	</Provider>
);
