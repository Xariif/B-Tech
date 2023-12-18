import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetUserByAuth0Id = ({ auth0Id }) =>
    api.getWithParams("Users/GetUserByAuth0Id", {
      auth0Id,
    });

  const UpdateUser = ({ name, surname, phone, email }) =>
    api.put("Users/GetUserByAuth0Id", {
      name,
      surname,
      phone,
      email,
    });

  const DeleteUser = () => api.del("Users/DeleteUser");

  const GetAllUsers = () => api.get("Users/GetAllUsers");

  return {
    GetUserByAuth0Id,
    UpdateUser,
    DeleteUser,
    GetAllUsers,
  };
};

export default useService;
