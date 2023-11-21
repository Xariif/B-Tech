import { useAuth0 } from "@auth0/auth0-react";
import { CompareSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}

		getAccessTokenSilently()
			.then((token) => {
				const decodedUser = jwtDecode(token);
				setUser(decodedUser);
			})
			.catch((err) => {
				console.error(err);
				setUser(false);
			});
	}, [isAuthenticated]);

	return { user };
};
