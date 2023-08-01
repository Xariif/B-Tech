import { useAPI } from "../components/hooks/useAPI";

var url = process.env.REACT_APP_API_URL + "Author/";


export function GetAuthorByNameSurname({ name, surname}) {
	var config = {
	  method: "get",
	  url: url + "GetAuthorByNameSurname",
	  params: {
		name: name,
		surname: surname,
	  },
	};
	return useAPI(config);
}

export function GetAuthorById({ id }) {
	var config = {
	  method: "get",
	  url: url + "GetAuthorById",
	  params: {
		id: id,
	  },
	};
	return useAPI(config);
}