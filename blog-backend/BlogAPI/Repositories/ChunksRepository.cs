using BlogAPI.Contexts;

namespace BlogAPI.Repositories
{
    public class ChunksRepository : BaseRepository
    {
        public ChunksRepository(MongoDataBaseContext context) : base(context)
        {
        }
    }
}
