using BlogAPI.Contexts;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class PostsRepository : BaseRepository
    {
        public PostsRepository(MongoDataBaseContext context) : base(context)
        {
        }
    }
}
