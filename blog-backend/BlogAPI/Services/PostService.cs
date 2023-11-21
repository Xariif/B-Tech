using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
	public class PostService : BaseService
	{
		public async Task<List<PostDTO>> GetApprovedPosts()
		{
			var filter = Builders<Post>.Filter.Eq("Approved", true);

			var cursor = await _postCollection.FindAsync(filter);

			var posts = await cursor.ToListAsync();



            List<PostDTO> postDTOs = posts.Select( post =>
			{


                var cursor =  _postCollection.FindAsync(filter);

                var author =  GetByIdAsync(_userCollection, post.AuthorId).Result;


                return new PostDTO
				{
					Approved = post.Approved,
					AuthorName = $"{author.Name} {author.Surname}",
					AuthorId = post.AuthorId,
					CreatedAt = post.CreatedAt,
					Category = post.Category,
					Content = post.Content,
					Id = post.Id.ToString(),
					Image = post.Image,
					Tag = post.Tag,
					Title = post.Title,
					UpdatedAt = post.UpdatedAt
				};
            }).ToList();

			return postDTOs;
		}

		public async Task<PostDTO> GetPostByIdAsync(string id)
		{
			var post =await GetByIdAsync(_postCollection, id) ?? throw new ArgumentException("Post with specific id dont exist");
            var author = GetByIdAsync(_userCollection, post.AuthorId).Result;
	
            var res = new PostDTO
			{
                Approved = post.Approved,
                AuthorName = $"{author.Name} {author.Surname}",
                AuthorId = post.AuthorId,
                CreatedAt = post.CreatedAt,
                Category = post.Category,
                Content = post.Content,
                Id = post.Id.ToString(),
                Image = post.Image,
                Tag = post.Tag,
                Title = post.Title,
                UpdatedAt = post.UpdatedAt
            };
			
            return res;

        }

        public async Task<List<PostDTO>> GetPostsByAuthorIdAsync(string id)
        {
            var filter = Builders<Post>.Filter.Eq("AuthorId",id);
            var cursor = await _postCollection.FindAsync(filter);
            var posts = await cursor.ToListAsync();


			if (posts.Count == 0)
				return new List<PostDTO>();

            var filterAuthor = Builders<Author>.Filter.Eq("AuthorId", id);
            var cursorAuthor = await _authorCollection.FindAsync(filterAuthor);

			var author =await GetByIdAsync(_userCollection, posts[0].AuthorId);

            var res = new List<PostDTO>();


			return posts.Select(post =>
			{
				return new PostDTO
				{
					AuthorId = post.AuthorId.ToString(),
					AuthorName = $"{author.Name} {author.Surname}",
					CreatedAt = post.CreatedAt,
					UpdatedAt = post.UpdatedAt,
					Category = post.Category,
					Content = post.Content,
					Id = post.Id.ToString(),
					Tag = post.Tag,
					Title = post.Title
				};
			}).ToList();
        }





        public async Task CreatePostAsync(NewPostDTO newPost)
		{
			
			var author = await GetByUserIdAsync(_userCollection, newPost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
            var post = new Post
			{
				Id = ObjectId.GenerateNewId(),
				AuthorId =author.UserId,
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
				Image = null,
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
			var author = await GetByIdAsync(_userCollection, updatePost.AuthorId) ?? throw new ArgumentException("Author with specific id dont exist.");
            post = new Post
			{
				Id = ObjectId.Parse(updatePost.Id),
				Title = updatePost.Title,
				Content = updatePost.Content,
				AuthorId = updatePost.AuthorId,
				Category = updatePost.Category.Trim(),
				Tag = updatePost.Tag,
				CreatedAt = updatePost.CreatedAt,
				UpdatedAt = updatePost.UpdatedAt
			};

			await _postCollection.ReplaceOneAsync(filter, post);
		}

		public async Task AcceptPostAsync(string id)
		{
            var post = await GetByIdAsync(_postCollection, id) ?? throw new ArgumentException("Post with specific id dont exist.");
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(id));

            post.Approved = true;

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
