import useAPI from "../components/hooks/useAPI";

const UserService = () => {
	const api = useAPI();

	const GetAllUsers = async () => {
		return await api.get("/User/GetAllUsers");
	};

	return { GetAllUsers };
};

export default UserService;
