using BlogAPI.Interfaces.DataBase;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;

namespace BlogAPI.Repositories
{
    public class CommentRepository : BaseRepository<Comment>
    {
        public CommentRepository(IDataBaseContext context) : base(context)
        {
        }
    }
}