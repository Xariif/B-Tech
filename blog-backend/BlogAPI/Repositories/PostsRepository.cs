using BlogAPI.Contexts;

namespace BlogAPI.Repositories
{
    public class PostsRepository : BaseRepository
    {
        public PostsRepository(MongoDataBaseContext context) : base(context)
        {
        }



    }
}
