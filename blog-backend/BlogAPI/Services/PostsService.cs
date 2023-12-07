using BlogAPI.DTOs.Posts;
using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostsService
    {
        private readonly PostsRepository _postsRepository;
        private readonly AuthorsRepository _authorsRepository;

        public PostsService(PostsRepository postsRepository, AuthorsRepository authorsRepository)
        {
            _postsRepository = postsRepository;
            _authorsRepository = authorsRepository;
        }

        public async Task<Posts?> GetPostByIdAsync(string postId)
        {
            return await _postsRepository.FindFirstByIdAsync<Posts>(postId)!;
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByAuthorIdAsync(string authorId)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.AuthorId, ObjectId.Parse(authorId))
                      & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByCategoryAsync(string category)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.Category, category)
                    & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByTagAsync(string tag)
        {
            var filter = Builders<Posts>.Filter.AnyEq(x => x.Tags, tag)
                                & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetPostsByStatusAndUserIdAsync(Status status, string userId)
        {
            var author = await _authorsRepository.FindFirstByIdAsync<Authors>(userId);

            var filter = Builders<Posts>.Filter.Eq(post => post.Status, status) &
                      Builders<Posts>.Filter.Eq(post => post.AuthorId, author.Id);

            return await _postsRepository.FindAllAsync(filter);

        }

        public async Task<IEnumerable<Posts>> GetPostsByStatusAsync(Status status)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.Status, status);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<Posts>.Filter.Gte(post => post.CreatedAt, startDate) &
                        Builders<Posts>.Filter.Lte(post => post.CreatedAt, endDate);


            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task CreatePostAsync(Posts newPost)
        {
            await _postsRepository.InsertOneAsync(newPost);
        }

        public async Task UpdateDraftPostAsync(PostsDTO updatedPost)
        {
            if (updatedPost.Id == null)
                throw new Exception("Id is null");

            var post = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                MainParentId = post.MainParentId,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                Content = updatedPost.Content,
                Category = updatedPost.Category,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Views = post.Views,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                Status = Status.Draft,
            };

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task UpdateAcceptedPostAsync(PostsDTO updatedPost)
        {
            if (updatedPost.Id == null)
                throw new Exception("Id is null");
            var post = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                Views = post.Views,
                Category = updatedPost.Category,
                Content = updatedPost.Content,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Draft
            };

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task RejectPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                Views = post.Views,
                Category = post.Category,
                Content = post.Content,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Rejected
            };

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task AcceptPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                Views = post.Views,
                Category = post.Category,
                Content = post.Content,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Aproved
            };

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task DeletePostAsync(string postId)
        {
            await _postsRepository.DeleteAsync(postId);
        }


    }
}