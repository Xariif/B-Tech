using BlogAPI.Contexts;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;

namespace BlogAPI.Repositories
{
    public class CommentRepository : BaseRepository
    {
        public CommentRepository(MongoDataBaseContext context) : base(context)
        {
        }

      
    }
}