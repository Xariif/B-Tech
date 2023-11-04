import useAPI from "../components/hooks/useAPI";

var url = process.env.REACT_APP_API_URL + "Post/";

const PostService = () => {
	const api = useAPI();

	const GetPosts = () => {
		return api.get("Post/GetPosts");
	};

	const GetPostById = (id) => {
		return api.getWithParams("Post/GetPostById", {
			id: id,
		});
	};

	return { GetPosts, GetPostById };
};

export default PostService;
