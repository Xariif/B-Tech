using BlogAPI.Contexts;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class PostRepository : BaseRepository
    {
        public PostRepository(MongoDataBaseContext context) : base(context)
        {
        }

       
        
    }
}
