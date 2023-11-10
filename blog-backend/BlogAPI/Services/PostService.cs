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
			var filter = Builders<Post>.Filter.Eq("Approved", true);
			var cursor = await _postCollection.FindAsync(filter);

			var posts = await cursor.ToListAsync();

			List<PostDTO> postDTOs = posts.Select(post => new PostDTO
			{
				Id = post.Id.ToString(),
				Title = post.Title,
				Content = post.Content,
				Category = post.Category,
				AuthorId = post.AuthorId.ToString(),
				AuthorName = post.AuthorName,
				Tag = post.Tag,
				CreatedAt = post.CreatedAt,
				UpdatedAt = post.UpdatedAt,
				Approved = post.Approved
			}).ToList();

			return postDTOs;
		}

		public async Task<PostDTO> GetPostByIdAsync(string id)
		{
			var post =await GetByIdAsync(_postCollection, id) ?? throw new ArgumentException("Post with specific id dont exist");
            var res = new PostDTO
			{
				AuthorId = post.AuthorId.ToString(),
				AuthorName = post.AuthorName,
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
        public async Task<List<PostDTO>> GetPostsByAuthorIdAsync(string id)
        {
          //  var post = await GetByIdAsync(_postCollection, id) ?? throw new ArgumentException("Post with specific id dont exist");


            var filter = Builders<Post>.Filter.Eq("AuthorId",BsonObjectId.Parse(id));
            var cursor = await _postCollection.FindAsync(filter);


            var posts = await cursor.ToListAsync();


			var res = new List<PostDTO>();


			res = posts.Select(post=> new PostDTO {
                AuthorId = post.AuthorId.ToString(),
                AuthorName = post.AuthorName,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                Category = post.Category,
                Content = post.Content,
                Id = post.Id.ToString(),
                Tag = post.Tag,
                Title = post.Title

            }).ToList();
			        
            return res;
        }





        public async Task CreatePostAsync(NewPostDTO newPost)
		{

			var author = await GetByIdAsync(_authorCollection, newPost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
            var post = new Post
			{
				Id = ObjectId.GenerateNewId(),
				AuthorId = ObjectId.Parse(newPost.AuthorId),
				AuthorName= author.Name + " "+ author.Surname,
				Title = newPost.Title.Trim(),
				Content = newPost.Content.Trim(),
				Tag = newPost.Tag,
				Category = newPost.Category.Trim(),
				CreatedAt = DateTime.Now,
				UpdatedAt = DateTime.Now,
				Approved = false,
				Comments = new List<Comment>(),
				Dislikes = 0,
				Likes = 0,
				Views = 0,
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
            var post = await GetByIdAsync(_postCollection, updatePost.Id) ?? throw new ArgumentException("Post with specific id dont exist.");
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(updatePost.Id));
			var author = await GetByIdAsync(_authorCollection, updatePost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
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
		   var post = await GetByIdAsync(_postCollection, id) ?? throw new ArgumentException("Post with specific id doesn't exist");
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(id));
			await _postCollection.DeleteOneAsync(filter);
		}
	}
}
