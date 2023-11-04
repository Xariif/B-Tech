import { useNewAPI, useAPI } from "../components/hooks/useAPI";

var url = process.env.REACT_APP_API_URL + "User/";

const UserService = () => {
	const api = useNewAPI();

	const SecureEndpoint = () => {
		return api.get(url + "SecureEndpoint");
	};

	return { SecureEndpoint };
};

export default UserService;
