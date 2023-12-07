using BlogAPI.Contexts;

namespace BlogAPI.Repositories
{
    public class LikesRepository : BaseRepository
    {
        public LikesRepository(MongoDataBaseContext context) : base(context)
        {
        }
    }
}
