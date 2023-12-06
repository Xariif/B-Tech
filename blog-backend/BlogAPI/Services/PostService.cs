using BlogAPI.DTOs.Post;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Interfaces.Services;
using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostService 
    {
        private readonly PostRepository _postRepository;

        public PostService(PostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post?> GetPostByIdAsync(string postId)
        {
            return await _postRepository.FindByIdAsync<Post>(postId)!;
        }

        public async Task<IEnumerable<Post>> GetPostsByCategoryAsync(string category)
        {
            return await _postRepository.GetPostsByCategoryAsync(category);
        }

        public async Task<IEnumerable<Post>> GetPostsByTagAsync(string tag)
        {
            return await _postRepository.GetPostsByTagAsync(tag);
        }

        public async Task<IEnumerable<Post>> GetPostsByStatusAndAuthorIdAsync(Status status, string authorId)
        {
            return await _postRepository.GetPostsByStatusAndAuthorIdAsync(status, authorId);
        }

        public async Task<IEnumerable<Post>> GetPostsByStatusAsync(Status status)
        {
            return await _postRepository.GetPostsByStatusAsync(status);
        }

        public async Task<IEnumerable<Post>> GetPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _postRepository.GetPostsByDateRangeAsync(startDate, endDate);
        }

        public async Task<Post> CreatePostAsync(Post newPost)
        {
            await _postRepository.InsertOneAsync(newPost);
            return newPost;
        }

        public async Task UpdateDraftPostAsync(PostDto updatedPost)
        {
            if (updatedPost.Id == null)
                throw new Exception("Id is null");
            var post  = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Post updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                UpdatedAt = DateTime.UtcNow,
                Views = post.Views,
                Category = updatedPost.Category,
                Content = updatedPost.Content,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Image = updatedPost.Image,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Drafts
            };

            await _postRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task UpdateAcceptedPostAsync(PostDto updatedPost)
        {
            if (updatedPost.Id == null)
                throw new Exception("Id is null");
            var post = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Post updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                UpdatedAt = DateTime.UtcNow,
                Views = post.Views,
                Category = updatedPost.Category,
                Content = updatedPost.Content,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Image = updatedPost.Image,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Drafts
            };

            await _postRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task RejectPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            Post updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                UpdatedAt = DateTime.UtcNow,
                Views = post.Views,
                Category = post.Category,
                Content = post.Content,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                Image = post.Image,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Rejected
            };

            await _postRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task AcceptPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            Post updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                UpdatedAt = DateTime.UtcNow,
                Views = post.Views,
                Category = post.Category,
                Content = post.Content,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                Image = post.Image,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Aproved
            };

            await _postRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task DeletePostAsync(string postId)
        {
            _ = await _postRepository.FindByIdAsync<Post>(postId) ?? throw new Exception("Post doesn't exist");
            await _postRepository.DeleteAsync(postId);
        }

        public async Task IncrementViewsAsync(string postId)
        {
            await _postRepository.IncrementViewsAsync(postId);
        }

        public async Task IncrementLikesAsync(string postId)
        {
            await _postRepository.IncrementLikesAsync(postId);
        }

        public async Task IncrementDislikesAsync(string postId)
        {
            await _postRepository.IncrementDislikesAsync(postId);
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _postRepository.FindAllAsync<Post>();
        }

        public async Task<IEnumerable<Post>> GetApprovedPostsByAuthorIdAsync(string authorId)
        {
            return await _postRepository.GetApprovedPostsByAuthorIdAsync(authorId);
        }
    }
}