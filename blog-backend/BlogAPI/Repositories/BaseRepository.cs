using BlogAPI.Interfaces.DataBase;
using MongoDB.Driver;
namespace BlogAPI.Interfaces.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        protected readonly IDataBaseContext _mongoContext;
        protected IMongoCollection<T> _dbCollection;

        protected BaseRepository(IDataBaseContext context)
        {
            _mongoContext = context;
            _dbCollection = _mongoContext.GetCollection<T>(typeof(T).Name);
        }

        public async Task<List<T>> FindAllAsync() =>
            await _dbCollection.Find(_ => true).ToListAsync();

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