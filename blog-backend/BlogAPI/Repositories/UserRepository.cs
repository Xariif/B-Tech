using BlogAPI.Interfaces.DataBase;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(IDataBaseContext context) : base(context)
        {
        }

        public async Task<User> FindByUserIdAsync(string userId) =>
             await _dbCollection.Find(Builders<User>.Filter.Eq(user => user.UserId, userId)).FirstOrDefaultAsync();

    }
}
