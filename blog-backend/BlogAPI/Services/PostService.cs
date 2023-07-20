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
            var cursor = await _postCollection.FindAsync(filter);
            return await cursor.ToListAsync();
        }

        public async Task CreatePostAsync(NewPostDTO newPost)
        {
            var post = new Post
            {
                Id = ObjectId.GenerateNewId(),
                AuthorId = ObjectId.Parse(newPost.AuthorId),
                Title = newPost.Title.Trim(),
                Content = newPost.Content.Trim(),
                Tag = newPost.Tag,
                Category = newPost.Category?.Trim(),
                CreatedAt = DateTime.Now,
                UpdatedAt = null
            };

            var filter = Builders<Post>.Filter.Where(x => x.Title == newPost.Title);
            var res = await _postCollection.Find(filter).ToListAsync();
            if (res.Any())
            {
                throw new ArgumentException("Post with same name already exist");
            }

            await _postCollection.InsertOneAsync(post);

        }

        public async Task UpdatePostAsync(PostDTO updatePost)
        {
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(updatePost.Id));

            var post = new Post
            {
                Id = ObjectId.Parse(updatePost.Id),
                Title = updatePost.Title,
                Content = updatePost.Content,
                AuthorId = ObjectId.Parse(updatePost.AuthorId),
                Category = updatePost.Category?.Trim(),
                Tag = updatePost.Tag,
                CreatedAt = updatePost.CreatedAt,
                UpdatedAt = updatePost.UpdatedAt
            };

            await _postCollection.ReplaceOneAsync(filter, post);
        }


        public async Task DeletePost(string id)
        {
            var filter = Builders<Post>.Filter.Where(x => x.Id == ObjectId.Parse(id));
            await _postCollection.DeleteOneAsync(filter);
        }
    }
}
