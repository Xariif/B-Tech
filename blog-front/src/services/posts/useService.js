import useAPI from "../../components/hooks/useAPI";

const useService = () => {
  const api = useAPI();

  const GetApprovedPosts = () => api.get("Posts/GetApprovedPosts");

  const GetTopApprovedPosts = ({ from, to }) =>
    api.get("Posts/GetTopApprovedPosts", { from, to });

  const GetDraftPosts = () => api.get("Posts/GetDraftPosts");

  const GetAuthorApprovedPosts = () => api.get("Posts/GetAuthorApprovedPosts");

  const GetApprovedPostById = ({ id }) =>
    api.get("Posts/GetApprovedPostById", { id });

  const GetRejectedPosts = () => api.get("Posts/GetRejectedPosts");

  const GetPostWaitingForApproval = () =>
    api.get("Posts/GetPostWaitingForApproval");

  const GetApprovedPostsByAuthorId = ({ authorId }) =>
    api.get("Posts/GetApprovedPostsByAuthorId", { authorId });

  const GetApprovedPostsByCategory = ({ category }) =>
    api.get("Posts/GetApprovedPostsByCategory", { category });

  const GetApprovedPostsByTag = ({ tag }) =>
    api.get("Posts/GetApprovedPostsByTag", { tag });

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

  const AcceptPost = ({ id }) => api.put("Posts/AcceptPost", null, { id });

  const RejectPost = ({ id }) => api.put("Posts/RejectPost", null, { id });

  const DeletePost = ({ id }) => api.del("Posts/DeletePost", null, { id });

  const GetImage = ({ id }) =>
    api.getFiles("Posts/GetImage", { id }).then(async (image) => {
      console.log(image);
      const imageBlob = image;
      console.log(imageBlob);
      return URL.createObjectURL(imageBlob);
    });

  const IncreaseViews = ({ id }) =>
    api.post("Posts/IncreaseViews", null, { id });

  return {
    GetApprovedPosts,
    GetTopApprovedPosts,
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
    IncreaseViews,
  };
};

export default useService;
