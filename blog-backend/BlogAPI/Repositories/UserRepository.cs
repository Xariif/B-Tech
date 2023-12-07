using BlogAPI.Contexts;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class UserRepository : BaseRepository
    {
        public UserRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public Task<Users> FindByUserIdAsync(string userId) =>
             _context.Users.Find(Builders<Users>.Filter.Eq(user => user.UserId, userId)).FirstOrDefaultAsync();

    }
}
