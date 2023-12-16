import { createContext, useEffect, useState } from "react";
import { useUser } from "../components/hooks/useUser";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
	const [authLoaded, setAuthLoaded] = useState(false);

	const [user, setUser] = useState(null);

	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}
		getAccessTokenSilently()
			.then((token) => {
				const decodedUser = jwtDecode(token);
				setUser(decodedUser);
				console.log(decodedUser);
			})
			.catch((err) => {
				console.error(err);
				setUser(false);
			})
			.finally(() => {
				console.log("finished");
			});
	}, [isLoading]);

	return (
		<UserContext.Provider value={{ isAuthenticated, user, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};
