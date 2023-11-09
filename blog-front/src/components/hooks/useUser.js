import { useAuth0 } from "@auth0/auth0-react";
import { CompareSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
	const { getAccessTokenSilently } = useAuth0();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getAccessTokenSilently()
			.then((token) => {
				const decodedUser = jwtDecode(token);
				setUser(decodedUser);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setIsLoading(false);
			});
	}, []);

	return { user, isLoading };
};
