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

        public Task<User> FindByUserIdAsync(string userId) =>
             _context.Users.Find(Builders<User>.Filter.Eq(user => user.UserId, userId)).FirstOrDefaultAsync();

    }
}
