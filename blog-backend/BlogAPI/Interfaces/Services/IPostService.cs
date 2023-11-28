using BlogAPI.DTOs.Post;

namespace BlogAPI.Interfaces.Services
{
    public interface IPostService
    {
        public Task<List<PostDTO>> GetApprovedPosts();
        public Task<List<PostDTO>> GetApprovedPostsByCategory(string category);
        public Task<PostDTO> GetApprovedPostById(string postId);
        public Task<List<PostDTO>> GetApprovedPostsByAuthorId(string authorId);

        public Task<List<PostDTO>> GetPostWaitingForApproval();

        public Task<List<PostDTO>> GetDraftPostsByAuthrId(string authorId);
        public Task<PostDTO> GetDraftPostByAuthor (string authorId);

        public Task CreatePostDraft(PostDTO postDTO);
        public Task UpdatePostDraft(PostDTO postDTO);
        public Task DeletePostDraft(string postId); 

        public Task SendPostToApprove(string postId);

        public Task ApprovePost(string postId);
        public Task RejestPost(string postId);
    }
}
