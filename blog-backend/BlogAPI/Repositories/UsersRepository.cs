using BlogAPI.Contexts;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class UsersRepository : BaseRepository
    {
        public UsersRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public Task<Users> FindByUserIdAsync(string userId) =>
             _context.Users.Find(Builders<Users>.Filter.Eq(user => user.UserId, userId)).FirstOrDefaultAsync();

    }
}
