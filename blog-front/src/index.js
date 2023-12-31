import React, { useContext, useState } from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

import { ToastProvider } from "./context/NotificationContext";
import { ErrorProvider } from "./context/ErrorContext";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

//openid profile email admin comment:posts write:posts delete:posts read:posts

root.render(
	<Auth0Provider
		domain="dev-uasjfxeuwrj58j4g.us.auth0.com"
		clientId="zxa0jWBh7donY0oLbt3X4FCkWVQQ9yc7"
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: "https://b-tech-api",
			scope: "",
		}}
		cacheLocation="localstorage"
	>
		<ToastProvider>
			<ErrorProvider>
				<App />
			</ErrorProvider>
		</ToastProvider>
	</Auth0Provider>
);
