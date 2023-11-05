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

	return { GetAuthorByNameSurname, GetAuthorById };
};

export default AuthorService;
