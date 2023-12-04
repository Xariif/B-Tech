using System;
using System.Linq.Expressions;
using Auth0.ManagementApi.Models;
using BlogAPI.Interfaces.DataBase;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using User = BlogAPI.Models.User;

namespace BlogAPI.Interfaces.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        protected readonly IDataBaseContext _mongoContext;
        protected IMongoCollection<T> _dbCollection;

        protected BaseRepository(IDataBaseContext context)
        {
            _mongoContext = context;
            _dbCollection = _mongoContext.GetCollection<T>(typeof(T).Name);
        }

        public async Task<List<T>> FindAllAsync() =>
            await _dbCollection.Find(_ => true).ToListAsync();

        public async Task<T?> FindByIdAsync(string id) =>
            await _dbCollection.Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();

        public async Task CreateAsync(T newItem) =>
            await _dbCollection.InsertOneAsync(newItem);

        public async Task<ReplaceOneResult> UpdateAsync(string id, T updatedItem) =>
            await _dbCollection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", id), updatedItem);

        public async Task<DeleteResult> DeleteAsync(string id) =>
            await _dbCollection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", id));
    }

    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(IDataBaseContext context) : base(context)
        {
        }
    }

    public class AuthorRepository : BaseRepository<Author>
    {
        public AuthorRepository(IDataBaseContext context) : base(context)
        {
        }

        public async Task<Author> GetAuthorByIdAsync(string id)
        {
            return await _dbCollection.Find(Builders<Author>.Filter.Eq(author => author.Id, ObjectId.Parse(id))).FirstOrDefaultAsync();
        }
    }

    public class PostRepository : BaseRepository<Post>
    {
        public PostRepository(IDataBaseContext context) : base(context)
        {
        }
        public async Task<List<Post>> GetPostsByAuthorIdAsync(string authorId)
        {
            return await _dbCollection.Find(Builders<Post>.Filter.Eq(post => post.AuthorId, authorId)
                & Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved)).ToListAsync();
        }

        public async Task<List<Post>> GetPostsByCategoryAsync(string category)
        {
            return await _dbCollection.Find(Builders<Post>.Filter.Eq(post => post.Category, category)
                & Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved)).ToListAsync();
        }

        public async Task<List<Post>> GetPostsByTagAsync(string tag)
        {
            var filter = Builders<Post>.Filter.AnyEq(x => x.Tags, tag)
                       & Builders<Post>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _dbCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Post>> GetPostsByStatusAsync(Status status)
        {
            return await _dbCollection.Find(Builders<Post>.Filter.Eq(post => post.Status, status)).ToListAsync();
        }

        public async Task<List<Post>> GetPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<Post>.Filter.Gte(post => post.CreatedAt, startDate) &
                         Builders<Post>.Filter.Lte(post => post.CreatedAt, endDate);

            return await _dbCollection.Find(filter).ToListAsync();
        }

        public async Task IncrementViewsAsync(string postId)
        {
            var update = Builders<Post>.Update.Inc(post => post.Views, 1);
            await _dbCollection.UpdateOneAsync(Builders<Post>.Filter.Eq(post => post.Id.ToString(), postId), update);

        }

        public async Task IncrementLikesAsync(string postId)
        {
            var update = Builders<Post>.Update.Inc(post => post.Likes, 1);
            await _dbCollection.UpdateOneAsync(Builders<Post>.Filter.Eq(post => post.Id.ToString(), postId), update);

        }

        public async Task IncrementDislikesAsync(string postId)
        {
            var update = Builders<Post>.Update.Inc(post => post.Dislikes, 1);
            await _dbCollection.UpdateOneAsync(Builders<Post>.Filter.Eq(post => post.Id.ToString(), postId), update);

        }

        public async Task DecreseLikesAsync(string postId)
        {
            var update = Builders<Post>.Update.Inc(post => post.Likes, -1);
            await _dbCollection.UpdateOneAsync(Builders<Post>.Filter.Eq(post => post.Id.ToString(), postId), update);

        }

        public async Task DecreseDislikesAsync(string postId)
        {
            var update = Builders<Post>.Update.Inc(post => post.Dislikes, -1);
            await _dbCollection.UpdateOneAsync(Builders<Post>.Filter.Eq(post => post.Id.ToString(), postId), update);

        }



    }

    public class CommentRepository : BaseRepository<Comment>
    {
        public CommentRepository(IDataBaseContext context) : base(context)
        {
        }
    }
}