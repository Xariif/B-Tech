using BlogAPI.DTOs.Post;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Interfaces.Services;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostService : IPostService
    {
        private readonly PostRepository _postRepository;

        public PostService(PostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post?> GetPostByIdAsync(string postId)
        {
            return await _postRepository.FindByIdAsync(postId)!;
        }

        public async Task<IEnumerable<Post>> GetPostsByCategoryAsync(string category)
        {
            return await _postRepository.GetPostsByCategoryAsync(category);
        }

        public async Task<IEnumerable<Post>> GetPostsByTagAsync(string tag)
        {
            return await _postRepository.GetPostsByTagAsync(tag);
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
            await _postRepository.CreateAsync(newPost);
            return newPost;
        }

        public async Task UpdatePostAsync(string postId, Post updatedPost)
        {
            var existingPost = await _postRepository.FindByIdAsync(postId);
            if (existingPost == null)
                throw new Exception("Post doesn't exist");

            updatedPost.Id = existingPost.Id;
            await _postRepository.UpdateAsync(postId, updatedPost);
        }

        public async Task DeletePostAsync(string postId)
        {
            var existingPost = await _postRepository.FindByIdAsync(postId);
            if (existingPost == null)
                throw new Exception("Post doesn't exist");

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
            return await _postRepository.FindAllAsync();
        }

        public async Task<IEnumerable<Post>> GetPostsByAuthorIdAsync(string authorId)
        {
            return await _postRepository.GetPostsByAuthorIdAsync(authorId);
        }
    }
}