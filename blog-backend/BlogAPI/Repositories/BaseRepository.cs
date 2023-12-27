using BlogAPI.Contexts;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace BlogAPI.Repositories
{
    public class BaseRepository
    {
        protected readonly MongoDataBaseContext _context;
        protected readonly IMongoDatabase _db;
        protected readonly GridFSBucket _bucket;
        protected BaseRepository(MongoDataBaseContext context)
        {
            _context = context;
            _db = context.Db;
            _bucket = new GridFSBucket(_db);
        }


        public Task<List<T>> FindAllAsync<T>()
        {
            return _context.GetCollection<T>(typeof(T).Name).FindAsync(_ => true).Result.ToListAsync();
        }


        public Task<List<T>> FindAllAsync<T>(FilterDefinition<T> filter, FindOptions<T> findOptions = null)
        {
            return _context.GetCollection<T>(typeof(T).Name).FindAsync(filter, findOptions).Result.ToListAsync();
        }

        public async Task<T> FindFirstAsync<T>(FilterDefinition<T> filter)
        {
            return _context.GetCollection<T>(typeof(T).Name).FindAsync(filter).Result.FirstOrDefault();
        }


        public Task<T> FindFirstByIdAsync<T>(string id)
        {
            return _context.GetCollection<T>(typeof(T).Name).Find(Builders<T>.Filter.Eq("_id", ObjectId.Parse(id))).FirstOrDefaultAsync();
        }

        public Task InsertOneAsync<T>(T newItem)
        {
            return _context.GetCollection<T>(typeof(T).Name).InsertOneAsync(newItem);
        }

        public Task<ReplaceOneResult> UpdateAsync<T>(string id, T updatedItem)
        {
            return _context.GetCollection<T>(typeof(T).Name).ReplaceOneAsync(Builders<T>.Filter.Eq("_id", ObjectId.Parse(id)), updatedItem);
        }

        public Task<DeleteResult> DeleteAsync<T>(string id)
        {

            return _context.GetCollection<T>(typeof(T).Name).DeleteOneAsync(Builders<T>.Filter.Eq("_id", ObjectId.Parse(id)));
        }


        public Task<ObjectId> UploadFileAsync(string fileName, Stream fileStream)
        {
            return _bucket.UploadFromStreamAsync(fileName, fileStream);
        }


        public Task<byte[]> DownloadFileAsync(string id)
        {
            return _bucket.DownloadAsBytesAsync(ObjectId.Parse(id));
        }

        public async Task<GridFSFileInfo<ObjectId>> GetFileInfoAsync(string id)
        {
            var filter = Builders<GridFSFileInfo<ObjectId>>.Filter.Eq(x => x.Id, ObjectId.Parse(id));

            var cursor = await _bucket.FindAsync(filter);

            var info = await cursor.FirstOrDefaultAsync();

            return info;
        }

        public Task DeleteFileAsync(string id)
        {
            return _bucket.DeleteAsync(ObjectId.Parse(id));
        }
    }
}