import { useDispatch } from "react-redux";
import useAPI from "../components/hooks/useAPI";

const PostService = () => {
	const api = useAPI();

	const GetApprovedPosts = () => {
		return api.get("Post/GetApprovedPosts");
	};

	const GetPostWaitingForApproval = () => {
		return api.get("Post/GetPostWaitingForApproval");
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

	const AcceptPost = (id) => {
		return api.put("Post/AcceptPost", {
			id: id,
		});
	};

	const RejectPost = (id) => {
		return api.put("Post/RejectPost", {
			id: id,
		});
	};
	const DeletePost = (id) => {
		return api.delete("Post/DeletePost", id);
	};

	return {
		GetApprovedPosts,
		GetPostWaitingForApproval,
		GetPostById,
		CreatePost,
		UpdatePost,
		DeletePost,
		GetPostsByAuthorId,
	};
};

export default PostService;
