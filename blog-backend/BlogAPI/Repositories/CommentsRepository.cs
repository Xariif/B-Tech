using BlogAPI.Contexts;

namespace BlogAPI.Repositories
{
    public class CommentsRepository : BaseRepository
    {
        public CommentsRepository(MongoDataBaseContext context) : base(context)
        {
        }
    }
}