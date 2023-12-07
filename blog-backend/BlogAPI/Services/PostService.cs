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
		private readonly AuthorRepository _authorRepository;

		public PostService(PostRepository postRepository, AuthorRepository authorRepository)
		{
			_postRepository = postRepository;
			_authorRepository = authorRepository;
		}

		public async Task<Posts?> GetPostByIdAsync(string postId)
		{
			return await _postRepository.FindFirstByIdAsync<Posts>(postId)!;
		}

        public async Task<IEnumerable<Posts>> GetApprovedPostsByAuthorIdAsync(string authorId)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.AuthorId, authorId)
                      & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByCategoryAsync(string category)
		{
			var filter = Builders<Posts>.Filter.Eq(post => post.Category, category)
					& Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Posts>> GetApprovedPostsByTagAsync(string tag)
		{
			var filter = Builders<Posts>.Filter.AnyEq(x => x.Tags, tag)
								& Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Posts>> GetPostsByStatusAndUserIdAsync(Status status, string userId)
		{
			var author = await _authorRepository.FindFirstByIdAsync<Authors>(userId);

			var filter = Builders<Posts>.Filter.Eq(post => post.Status, status) &
						Builders<Posts>.Filter.Eq(post => post.AuthorId, author.Id);

			return await _postRepository.FindAllAsync(filter);

		}

		public async Task<IEnumerable<Posts>> GetPostsByStatusAsync(Status status)
		{
			var filter = Builders<Posts>.Filter.Eq(post => post.Status, status);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Posts>> GetApprovedPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
		{
			var filter = Builders<Posts>.Filter.Gte(post => post.CreatedAt, startDate) &
						Builders<Posts>.Filter.Lte(post => post.CreatedAt, endDate);


			return await _postRepository.FindAllAsync(filter);
		}

		public async Task CreatePostAsync(Posts newPost)
		{
			await _postRepository.InsertOneAsync(newPost);
		}

		public async Task UpdateDraftPostAsync(PostDto updatedPost)
		{
			if (updatedPost.Id == null)
				throw new Exception("Id is null");

			var post  = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

			Posts updated = new()
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

			Posts updated = new()
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

			Posts updated = new()
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

			Posts updated = new()
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
			await _postRepository.DeleteAsync(postId);
		}

		
	}
}