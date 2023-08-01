using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
	public class PostService : BaseService
	{
		public async Task<List<PostDTO>> GetPostsAsync()
		{
			var filter = Builders<Post>.Filter.Empty;
			var cursor = await _postCollection.FindAsync(filter);

			var posts = await cursor.ToListAsync();

			List<PostDTO> postDTOs = posts.Select(post => new PostDTO
			{
				Id = post.Id.ToString(),
				Title = post.Title,
				Content = post.Content,
				Category = post.Category,
				AuthorId = post.AuthorId.ToString(),
				Tag = post.Tag,
				CreatedAt = post.CreatedAt,
				UpdatedAt = post.UpdatedAt
			}).ToList();

			return postDTOs;
		}

		public async Task<PostDTO> GetPostByIdAsync(string id)
		{
			var post =await GetById(_postCollection, id) ?? throw new ArgumentException("Post with specific id dont exist");
            var res = new PostDTO
			{
				AuthorId = post.AuthorId.ToString(),
				CreatedAt = post.CreatedAt,
				UpdatedAt = post.UpdatedAt,
				Category = post.Category,
				Content = post.Content,
				Id = post.Id.ToString(),
				Tag = post.Tag,
				Title = post.Title
			};
			
            return res;

        }

		public async Task CreatePostAsync(NewPostDTO newPost)
		{

			var author = await GetById(_authorCollection, newPost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
            var post = new Post
			{
				Id = ObjectId.GenerateNewId(),
				AuthorId = ObjectId.Parse(newPost.AuthorId),
				Title = newPost.Title.Trim(),
				Content = newPost.Content.Trim(),
				Tag = newPost.Tag,
				Category = newPost.Category.Trim(),
				CreatedAt = DateTime.Now,
				UpdatedAt = DateTime.Now
			};

			var filter = Builders<Post>.Filter.Where(x => x.Title == newPost.Title);
			var res = await _postCollection.Find(filter).ToListAsync();
			if (res.Any())
			{
				throw new ArgumentException("Post with same name already exist.");
			}

			await _postCollection.InsertOneAsync(post);

		}

		public async Task UpdatePostAsync(PostDTO updatePost)
		{
            var post = await GetById(_postCollection, updatePost.Id) ?? throw new ArgumentException("Post with specific id dont exist.");
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(updatePost.Id));
			var author = await GetById(_authorCollection, updatePost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
            post = new Post
			{
				Id = ObjectId.Parse(updatePost.Id),
				Title = updatePost.Title,
				Content = updatePost.Content,
				AuthorId = ObjectId.Parse(updatePost.AuthorId),
				Category = updatePost.Category.Trim(),
				Tag = updatePost.Tag,
				CreatedAt = updatePost.CreatedAt,
				UpdatedAt = updatePost.UpdatedAt
			};

			await _postCollection.ReplaceOneAsync(filter, post);
		}


		public async Task DeletePost(string id)
		{
		   var post = await GetById(_postCollection, id) ?? throw new ArgumentException("Post with specific id doesn't exist");
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(id));
			await _postCollection.DeleteOneAsync(filter);
		}
	}
}
