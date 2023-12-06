using BlogAPI.Contexts;
using MongoDB.Driver;
namespace BlogAPI.Interfaces.Repositories
{
    public class BaseRepository: IBaseRepository
    {
        protected readonly MongoDataBaseContext _context;
        protected IMongoDatabase _db;

        protected BaseRepository(MongoDataBaseContext context)
        {
            _context = context;
            _db = context._db;
        }

        public async Task<List<T>> FindAllAsync() =>
            await _db.Find(_ => true).ToListAsync();

        public async Task<T?> FindByIdAsync(string id) =>
            await _dbCollection.Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();

        public async Task CreateAsync(T newItem) =>
            await _dbCollection.InsertOneAsync(newItem);

        public async Task<ReplaceOneResult> UpdateAsync(string id, T updatedItem) =>
            await _dbCollection.ReplaceOneAsync(Builders<T>.Filter.Eq("_id", id), updatedItem);

        public async Task<DeleteResult> DeleteAsync(string id) =>
            await _dbCollection.DeleteOneAsync(Builders<T>.Filter.Eq("_id", id));
    }
}