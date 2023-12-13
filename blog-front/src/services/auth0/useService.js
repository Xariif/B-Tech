import useAPI from "../../components/hooks/useAPI";

const useService = () => {
	const api = useAPI();

	const GetUserRoles = ({ auth0Id }) => {
		console.log(auth0Id);
		return api.getWithParams("Auth0/GetUserRoles", {
			auth0Id: auth0Id,
		});
	};

	const RemoveRole = ({ auth0Id, roleId }) => {
		return api.getWithParams("Auth0/RemoveRole", {
			auth0Id: auth0Id,
			roleId: roleId,
		});
	};

	const GiveRole = ({ auth0Id, roleId }) => {
		return api.getWithParams("Auth0/RemoveRole", {
			auth0Id: auth0Id,
			roleId: roleId,
		});
	};

	return { GetUserRoles, RemoveRole, GiveRole };
};

export default useService;
