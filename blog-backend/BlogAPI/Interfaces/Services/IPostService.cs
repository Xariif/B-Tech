using BlogAPI.DTOs.Post;
using BlogAPI.Models;

namespace BlogAPI.Interfaces.Services
{
    public interface IPostService
    {
        Task<IEnumerable<Post>> GetAllPostsAsync();

        Task<Post?> GetPostByIdAsync(string postId);

        Task<IEnumerable<Post>> GetApprovedPostsByAuthorIdAsync(string authorId);

        Task<IEnumerable<Post>> GetPostsByCategoryAsync(string category);

        Task<IEnumerable<Post>> GetPostsByTagAsync(string tag);

        Task<IEnumerable<Post>> GetPostsByStatusAsync(Status status);

        Task<IEnumerable<Post>> GetPostsByDateRangeAsync(DateTime startDate, DateTime endDate);

        Task<Post> CreatePostAsync(Post newPost);

        Task UpdateDraftPostAsync(string postId, Post updatedPost);

        Task UpdateAcceptedPostAsync(string postId, Post updatedPost);

        Task DeletePostAsync(string postId);

        Task IncrementViewsAsync(string postId);

        Task IncrementLikesAsync(string postId);

        Task IncrementDislikesAsync(string postId);
    }
}
