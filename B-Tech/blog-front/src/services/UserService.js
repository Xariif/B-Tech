import { useNewAPI, useAPI } from "../components/hooks/useAPI";

const UserService = () => {
	const api = useNewAPI();

	const SecureEndpoint = () => {
		return api.get("User/SecureEndpoint");
	};

	return { SecureEndpoint };
};

export default UserService;
