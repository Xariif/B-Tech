import useAPI from "../components/hooks/useAPI";

const AuthorService = () => {
	const api = useAPI();

	const GetAuthorByNameSurname = ({ name, surname }) => {
		return api.getWithParams("Author/GetAuthorByNameSurname", {
			name: name,
			surname: surname,
		});
	};

	const GetAuthorById = ({ id }) => {
		return api.getWithParams("Author/GetAuthorById", {
			id: id,
		});
	};

	const GetAuthorPosts = ({ id }) => {
		return api.getWithParams("Post/GetPostsByAuthorId", {
			id: id,
		});
	};

	return { GetAuthorByNameSurname, GetAuthorById };
};

export default AuthorService;
