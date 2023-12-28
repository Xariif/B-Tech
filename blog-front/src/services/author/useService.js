import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetAuthorByUserId = ({ id }) => {
    return api.get("Authors/GetAuthorByUserId", {
      id,
    });
  };

  const GetAuthorById = ({ id }) => {
    return api.get("Authors/GetAuthorById", {
      id,
    });
  };

  const CreateAuthor = ({ newAuthorUserId }) =>
    api.post("Authors/CreateAuthor", null, {
      newAuthorUserId,
    });

  const UpdateAuthor = ({ description, socialMedia }) =>
    api.put("Authors/UpdateAuthor", {
      description,
      socialMedia,
    });

  const GetAvatarByAuthorId = ({ id }) => {
    return api
      .getFiles("Authors/GetAvatarByAuthorId", {
        id,
      })
      .then((avatar) => {
        const imageBlob = avatar;
        return URL.createObjectURL(imageBlob);
      });
  };

  const DeleteAuthor = () => api.put("Authors/DeleteAuthor");

  return {
    GetAuthorById,
    GetAvatarByAuthorId,
    GetAuthorByUserId,
    CreateAuthor,
    UpdateAuthor,
    DeleteAuthor,
  };
};

export default useService;
