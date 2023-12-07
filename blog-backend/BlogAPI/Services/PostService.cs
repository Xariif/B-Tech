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

		public async Task<Post?> GetPostByIdAsync(string postId)
		{
			return await _postRepository.FindFirstByIdAsync<Post>(postId)!;
		}

        public async Task<IEnumerable<Post>> GetApprovedPostsByAuthorIdAsync(string authorId)
        {
            var filter = Builders<Post>.Filter.Eq(post => post.AuthorId, authorId)
                      & Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Post>> GetApprovedPostsByCategoryAsync(string category)
		{
			var filter = Builders<Post>.Filter.Eq(post => post.Category, category)
					& Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Post>> GetApprovedPostsByTagAsync(string tag)
		{
			var filter = Builders<Post>.Filter.AnyEq(x => x.Tags, tag)
								& Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Post>> GetPostsByStatusAndUserIdAsync(Status status, string userId)
		{
			var author = await _authorRepository.FindFirstByIdAsync<Author>(userId);

			var filter = Builders<Post>.Filter.Eq(post => post.Status, status) &
						Builders<Post>.Filter.Eq(post => post.AuthorId, author.Id);

			return await _postRepository.FindAllAsync(filter);

		}

		public async Task<IEnumerable<Post>> GetPostsByStatusAsync(Status status)
		{
			var filter = Builders<Post>.Filter.Eq(post => post.Status, status);

			return await _postRepository.FindAllAsync(filter);
		}

		public async Task<IEnumerable<Post>> GetApprovedPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
		{
			var filter = Builders<Post>.Filter.Gte(post => post.CreatedAt, startDate) &
						Builders<Post>.Filter.Lte(post => post.CreatedAt, endDate);


			return await _postRepository.FindAllAsync(filter);
		}

		public async Task CreatePostAsync(Post newPost)
		{
			await _postRepository.InsertOneAsync(newPost);
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
			await _postRepository.DeleteAsync(postId);
		}

		
	}
}