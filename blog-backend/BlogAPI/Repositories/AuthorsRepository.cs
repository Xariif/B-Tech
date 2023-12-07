using BlogAPI.Contexts;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class AuthorsRepository : BaseRepository
    {
        public AuthorsRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public Task<Authors> GetAuthorByUserIdAsync(string userId)
        {
            return _context.Authors.Find(Builders<Authors>.Filter.Eq(author => author.UserId, userId)).FirstOrDefaultAsync();

        }
    }
}
