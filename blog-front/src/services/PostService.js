import { useAPI } from "../components/hooks/useAPI";

var url = process.env.REACT_APP_API_URL + "Post/";

export function GetPosts() {
	var config = {
		method: "get",
		url: url + "GetPosts",
	};
	return useAPI(config);
}

export function GetPostById(id) {
	var config = {
		method: "get",
		url: url + "GetPostById",
		params: { id: id },
	};
	return useAPI(config);
}
