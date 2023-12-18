import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetAuthorById = ({ id }) => {
    console.log("GetAuthorById");
    return api.getWithParams("Authors/GetAuthorById", {
      id,
    });
  };

  const CreateAuthor = ({ newAuthorUserId }) =>
    api.post("Authors/CreateAuthor", {
      newAuthorUserId,
    });

  const UpdateAuthor = ({ description, socialMedia }) =>
    api.put("Authors/UpdateAuthor", {
      description,
      socialMedia,
    });

  const DeleteAuthor = ({ id }) =>
    api.put("Authors/DeleteAuthor", {
      id,
    });

  return {
    GetAuthorById,
    CreateAuthor,
    UpdateAuthor,
    DeleteAuthor,
  };
};

export default useService;
