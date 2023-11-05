import useAPI from "../components/hooks/useAPI";

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
