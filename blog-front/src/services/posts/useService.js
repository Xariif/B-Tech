import useAPI from "../../components/hooks/useAPI";
import { useNotification } from "../../components/hooks/useNotification";

const useService = () => {
  const api = useAPI();
  const notification = useNotification();

  const GetApprovedPosts = () => api.get("Posts/GetApprovedPosts");

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

  const AcceptPost = ({ id }) => api.put("Posts/AcceptPost", { id });

  const RejectPost = ({ id }) => api.put("Posts/RejectPost", { id });

  const DeletePost = ({ id }) => api.del("Posts/DeletePost", { id });

  const GetImage = ({ id }) =>
    api.get("Posts/GetImage", { id }).then((image) => {
      function arrayBufferToBase64(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      console.log(image);
      console.log(arrayBufferToBase64(image));
      return arrayBufferToBase64(image);
    });

  const IncreaseViews = ({ id }) => api.post("Posts/IncreaseViews", { id });

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
    IncreaseViews,
  };
};

export default useService;
