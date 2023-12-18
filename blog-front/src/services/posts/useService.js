import useAPI from "../../components/hooks/useAPI";
import { useNotification } from "../../components/hooks/useNotification";

const useService = () => {
  const api = useAPI();
  const notification = useNotification();

  const GetApprovedPosts = () =>
    api.get("Posts/GetApprovedPosts").catch((error) => {
      throw error;
    });

  const GetDraftPosts = () => api.get("Posts/GetDraftPosts");

  const GetAuthorApprovedPosts = () => api.get("Posts/GetAuthorApprovedPosts");

  const GetApprovedPostById = ({ id }) =>
    api.getWithParams("Posts/GetApprovedPostById", { id });

  const GetRejectedPosts = () => api.get("Posts/GetRejectedPosts");

  const GetPostWaitingForApproval = () =>
    api.get("Posts/GetPostWaitingForApproval");

  const GetApprovedPostsByAuthorId = ({ authorId }) =>
    api.getWithParams("Posts/GetApprovedPostsByAuthorId", { authorId });

  const GetApprovedPostsByCategory = ({ category }) =>
    api.getWithParams("Posts/GetApprovedPostsByCategory", { category });

  const GetApprovedPostsByTag = ({ tag }) =>
    api.getWithParams("Posts/GetApprovedPostsByTag", { tag });

  const CreatePost = ({
    MainParentId,
    Title,
    Content,
    Category,
    Tags,
    MainImage,
  }) =>
    api.post("Posts/CreatePost", {
      MainParentId,
      Title,
      Content,
      Category,
      Tags,
      MainImage,
    });

  const CreateDraftPost = ({
    MainParentId,
    Title,
    Content,
    Category,
    Tags,
    MainImage,
  }) =>
    api.post("Posts/CreateDraftPost", {
      MainParentId,
      Title,
      Content,
      Category,
      Tags,
      MainImage,
    });

  const UpdateDraftPost = ({
    Id,
    MainParentId,
    Title,
    Content,
    Category,
    Tags,
    MainImage,
  }) =>
    api.put("Posts/UpdateDraftPost", {
      Id,
      MainParentId,
      Title,
      Content,
      Category,
      Tags,
      MainImage,
    });

  const AcceptPost = ({ id }) => api.put("Posts/AcceptPost", { id });

  const RejectPost = ({ id }) => api.put("Posts/RejectPost", { id });

  const DeletePost = ({ id }) => api.del("Posts/DeletePost", { id });

  const GetImage = ({ id }) => api.getImage("Posts/GetImage", { id });

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
