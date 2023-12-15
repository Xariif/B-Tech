import useAPI from "../../components/hooks/useAPI";
import { useNotification } from "../../components/hooks/useNotification";

const useService = () => {
	const api = useAPI();
	const notification = useNotification();

	const GetApprovedPosts = () => {
		return api.get("Posts/GetApprovedPosts").catch((error) => {
			throw error;
		});
	};

	const GetDraftPosts = () => {
		return api.get("Posts/GetDraftPosts");
	};

	const GetAuthorApprovedPosts = () => {
		return api.get("Posts/GetAuthorApprovedPosts");
	};

	const GetApprovedPostById = ({ id }) => {
		return api.getWithParams("Posts/GetApprovedPostById", { id: id });
	};

	const GetRejectedPosts = () => {
		return api.get("Posts/GetRejectedPosts");
	};

	const GetPostWaitingForApproval = () => {
		return api.get("Posts/GetPostWaitingForApproval");
	};

	const GetApprovedPostsByAuthorId = ({ authorId }) => {
		return api.getWithParams("Posts/GetApprovedPostsByAuthorId", { authorId });
	};

	const GetApprovedPostsByCategory = ({ category }) => {
		return api.getWithParams("Posts/GetApprovedPostsByCategory", { category });
	};

	const GetApprovedPostsByTag = ({ tag }) => {
		return api.getWithParams("Posts/GetApprovedPostsByTag", { tag });
	};

	const CreatePost = ({
		MainParentId,
		Title,
		Content,
		Category,
		Tags,
		MainImage,
	}) => {
		return api.post("Posts/CreatePost", {
			MainParentId: MainParentId,
			Title: Title,
			Content: Content,
			Category: Category,
			Tags: Tags,
			MainImage: MainImage,
		});
	};

	const CreateDraftPost = ({
		MainParentId,
		Title,
		Content,
		Category,
		Tags,
		MainImage,
	}) => {
		return api.post("Posts/CreateDraftPost", {
			MainParentId: MainParentId,
			Title: Title,
			Content: Content,
			Category: Category,
			Tags: Tags,
			MainImage: MainImage,
		});
	};

	const UpdateDraftPost = ({
		Id,
		MainParentId,
		Title,
		Content,
		Category,
		Tags,
		MainImage,
	}) => {
		return api.put("Posts/UpdateDraftPost", {
			Id: Id,
			MainParentId: MainParentId,
			Title: Title,
			Content: Content,
			Category: Category,
			Tags: Tags,
			MainImage: MainImage,
		});
	};

	const AcceptPost = ({ id }) => {
		return api.put("Posts/AcceptPost", { id: id });
	};

	const RejectPost = ({ id }) => {
		return api.put("Posts/RejectPost", { id: id });
	};

	const DeletePost = ({ id }) => {
		return api.del("Posts/DeletePost", { id: id });
	};

	const GetImage = ({ id }) => {
		return api.getImage("Posts/GetImage", { id: id });
	};

	return {
		GetApprovedPosts,
		GetApprovedPostById,
		GetDraftPosts,
		GetRejectedPosts,
		GetPostWaitingForApproval,
		GetApprovedPostsByAuthorId,
		GetApprovedPostsByCategory,
		GetApprovedPostsByTag,
		CreatePost,
		CreateDraftPost,
		UpdateDraftPost,
		AcceptPost,
		RejectPost,
		DeletePost,
		GetImage,
		GetAuthorApprovedPosts,
	};
};

export default useService;
