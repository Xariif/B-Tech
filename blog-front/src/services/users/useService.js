import useAPI from "../../components/hooks/useAPI";

const useService = () => {
	const api = useAPI();

	const GetUserByAuth0Id = ({ auth0Id }) => {
		return api.getWithParams("Users/GetUserByAuth0Id", {
			auth0Id: auth0Id,
		});
	};

	const UpdateUser = ({ name, surname, phone, email }) => {
		return api.put("Users/GetUserByAuth0Id", {
			name: name,
			surname: surname,
			phone: phone,
			email: email,
		});
	};

	const DeleteUser = () => {
		return api.del("Users/DeleteUser");
	};

	const GetAllUsers = () => {
		return api.get("Users/GetAllUsers");
	};

	return { GetUserByAuth0Id, UpdateUser, DeleteUser, GetAllUsers };
};

export default useService;
