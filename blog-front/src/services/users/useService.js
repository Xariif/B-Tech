import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetUserByAuth0Id = ({ auth0Id }) =>
    api.getWithParams("Users/GetUserByAuth0Id", {
      auth0Id,
    });

  const UpdateUser = ({ name, surname, phone, email, avatar }) =>
    api.put("Users/UpdateUser", {
      name,
      surname,
      phone,
      email,
      avatar,
    });

  const GetAvatar = ({ id }) =>
    api.getFiles("Users/GetAvatar", { id }).then(async (image) => {
      const imageBlob = image;
      return URL.createObjectURL(imageBlob);
    });
  const DeleteUser = () => api.del("Users/DeleteUser");

  const GetAllUsers = () => api.get("Users/GetAllUsers");

  const GetUserData = () => api.get("Users/GetUserData");

  return {
    GetUserByAuth0Id,
    GetAvatar,
    UpdateUser,
    DeleteUser,
    GetAllUsers,
    GetUserData,
  };
};

export default useService;
