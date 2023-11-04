import useAPI from "../components/hooks/useAPI";

var url = process.env.REACT_APP_API_URL + "Author/";

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
