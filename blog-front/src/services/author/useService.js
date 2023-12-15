import useAPI from "../../components/hooks/useAPI";

const useService = () => {
	const api = useAPI();

	const GetAuthorById = ({ id }) => {
		console.log("GetAuthorById");
		return api.getWithParams("Authors/GetAuthorById", {
			id: id,
		});
	};

	const CreateAuthor = ({ newAuthorUserId }) => {
		return api.post("Authors/CreateAuthor", {
			newAuthorUserId: newAuthorUserId,
		});
	};

	const UpdateAuthor = ({ description, socialMedia }) => {
		return api.put("Authors/UpdateAuthor", {
			description: description,
			socialMedia: socialMedia,
		});
	};

	const DeleteAuthor = ({ id }) => {
		return api.put("Authors/DeleteAuthor", {
			id: id,
		});
	};

	return { GetAuthorById, CreateAuthor, UpdateAuthor, DeleteAuthor };
};

export default useService;
