import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetUserRoles = ({ auth0Id }) => {
    console.log(auth0Id);
    return api.getWithParams("Auth0/GetUserRoles", {
      auth0Id,
    });
  };

  const RemoveRole = ({ auth0Id, roleId }) =>
    api.getWithParams("Auth0/RemoveRole", {
      auth0Id,
      roleId,
    });

  const GiveRole = ({ auth0Id, roleId }) =>
    api.getWithParams("Auth0/RemoveRole", {
      auth0Id,
      roleId,
    });

  return { GetUserRoles, RemoveRole, GiveRole };
};

export default useService;
