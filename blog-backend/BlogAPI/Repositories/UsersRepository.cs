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

        public Task<Users> FindFirstByAuth0IdAsync(string auth0Id) =>
             _context.Users.Find(Builders<Users>.Filter.Eq(user => user.Auth0Id, auth0Id)).FirstOrDefaultAsync();

    }
}
