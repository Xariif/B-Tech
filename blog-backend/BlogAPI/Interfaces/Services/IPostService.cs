using BlogAPI.Models;

namespace BlogAPI.Interfaces.Services
{
    public interface IPostService
    {
        Task<IEnumerable<Posts>> GetAllPostsAsync();

        Task<Posts?> GetPostByIdAsync(string postId);

        Task<IEnumerable<Posts>> GetApprovedPostsByAuthorIdAsync(string authorId);

        Task<IEnumerable<Posts>> GetPostsByCategoryAsync(string category);

        Task<IEnumerable<Posts>> GetPostsByTagAsync(string tag);

        Task<IEnumerable<Posts>> GetPostsByStatusAsync(Status status);

        Task<IEnumerable<Posts>> GetPostsByDateRangeAsync(DateTime startDate, DateTime endDate);

        Task<Posts> CreatePostAsync(Posts newPost);

        Task UpdateDraftPostAsync(string postId, Posts updatedPost);

        Task UpdateAcceptedPostAsync(string postId, Posts updatedPost);

        Task DeletePostAsync(string postId);

        Task IncrementViewsAsync(string postId);

        Task IncrementLikesAsync(string postId);

        Task IncrementDislikesAsync(string postId);
    }
}
