using BlogAPI.Contexts;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class AuthorsRepository : BaseRepository
    {
        public AuthorsRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public Task<Authors> GetAuthorByUserIdAsync(ObjectId userId)
        {
            return _context.Authors.Find(Builders<Authors>.Filter.Eq(author => author.UserId, userId)).FirstOrDefaultAsync();

        }
    }
}
