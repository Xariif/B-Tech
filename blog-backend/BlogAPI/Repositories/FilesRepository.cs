using BlogAPI.Contexts;

namespace BlogAPI.Repositories
{
    public class FilesRepository : BaseRepository
    {
        public FilesRepository(MongoDataBaseContext context) : base(context)
        {
        }
    }
}
