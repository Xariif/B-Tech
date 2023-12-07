using BlogAPI.Contexts;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class AuthorRepository : BaseRepository
    {
        public AuthorRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public Task<Authors> GetAuthorByUserIdAsync(string userId)
        {
            return  _context.Authors.Find(Builders<Authors>.Filter.Eq(author => author.UserId, userId)).FirstOrDefaultAsync();
            
        }
    }
}
