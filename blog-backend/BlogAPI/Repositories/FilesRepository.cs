using BlogAPI.Contexts;
using MongoDB.Bson;

namespace BlogAPI.Repositories
{
    public class FilesRepository : BaseRepository
    {
        public FilesRepository(MongoDataBaseContext context) : base(context)
        {
        }


        public async Task<ObjectId> UploadFileAsync(string fileName, Stream fileStream)
        {
            return await _bucket.UploadFromStreamAsync(fileName, fileStream);
        }


    }
}
