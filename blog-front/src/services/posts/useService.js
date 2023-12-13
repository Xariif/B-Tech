import useAPI from "../../components/hooks/useAPI";

const useService = () => {
	const api = useAPI();

	const GetApprovedPosts = () => {
		return api.get("Posts/GetApprovedPosts");
	};

	const GetDraftPosts = () => {
		return api.get("Posts/GetDraftPosts");
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
	};
};

export default useService;
