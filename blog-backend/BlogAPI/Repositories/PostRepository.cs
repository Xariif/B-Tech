using BlogAPI.Interfaces.DataBase;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class PostRepository : BaseRepository<Post>
    {
        public PostRepository(IDataBaseContext context) : base(context)
        {
        }
        public async Task<List<Post>> GetApprovedPostsByAuthorIdAsync(string authorId)
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

        public async Task<List<Post>> GetPostsByStatusAndAuthorIdAsync(Status status,string authorId)
        {
            var filter = Builders<Post>.Filter.Eq(post => post.Status, status) &
                         Builders<Post>.Filter.Eq(post => post.AuthorId, authorId);

            return await _dbCollection.Find(filter).ToListAsync();
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
}
