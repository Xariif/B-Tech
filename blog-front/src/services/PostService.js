import { useDispatch } from "react-redux";
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

	const GetPostsByAuthorId = (id) => {
		return api.getWithParams("Post/GetPostsByAuthorId", {
			id: id,
		});
	};

	const CreatePost = (post) => {
		return api.post("Post/CreatePost", post);
	};

	const UpdatePost = (post) => {
		return api.put("Post/UpdatePost", post);
	};

	const DeletePost = (id) => {
		return api.delete("Post/DeletePost", id);
	};

	return {
		GetPosts,
		GetPostById,
		CreatePost,
		UpdatePost,
		DeletePost,
		GetPostsByAuthorId,
	};
};

export default PostService;
