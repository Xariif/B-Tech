import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

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

  const DeleteAuthor = () => api.put("Authors/DeleteAuthor");

  return {
    GetAuthorById,
    CreateAuthor,
    UpdateAuthor,
    DeleteAuthor,
  };
};

export default useService;
