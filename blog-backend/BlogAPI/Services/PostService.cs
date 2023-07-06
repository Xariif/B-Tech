using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostService : BaseService
    {
        public async Task<List<Post>> GetPostsAsync()
        {
            var filter = Builders<Post>.Filter.Empty;
            var cursor = await postCollection.FindAsync(filter);
            return await cursor.ToListAsync();
        }

        public async Task CreatePostAsync(NewPostDTO newPost)
        {
            var post = new Post
            {
                Id = ObjectId.GenerateNewId(),
                Author = newPost.Author.Trim(),
                Title = newPost.Title.Trim(),
                Content = newPost.Content.Trim(),
                Tags = newPost.Tags,
                Category = newPost.Category?.Trim(),
                CreatedAt = DateTime.Now,
                UpdatedAt = null
            };

            var filter = Builders<Post>.Filter.Where(x => x.Title == newPost.Title);
            var res = await postCollection.Find(filter).ToListAsync();
            if (res.Any())
            {
                throw new ArgumentException("Post with same name already exist");
            }

            await postCollection.InsertOneAsync(post);

        }

        public async Task UpdatePostAsync(PostDTO updatePost)
        {
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(updatePost.Id));

            var post = new Post
            {
                Id = ObjectId.Parse(updatePost.Id),
                Title = updatePost.Title,
                Content = updatePost.Content,
                Author = updatePost.Author,
                Category = updatePost.Category?.Trim(),
                Tags = updatePost.Tags,
                CreatedAt = updatePost.CreatedAt,
                UpdatedAt = updatePost.UpdatedAt
            };

            await postCollection.ReplaceOneAsync(filter,post);
        }


        public async Task DeletePost(string id)
        {
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(id));
            await postCollection.DeleteOneAsync(filter);
        }
    }
}
