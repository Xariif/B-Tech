using BlogAPI.Contexts;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class BaseRepository
    {
        protected readonly MongoDataBaseContext _context;
        protected readonly IMongoDatabase _db;

        protected BaseRepository(MongoDataBaseContext context)
        {
            _context = context;
            _db = context.Db;
        }


         public  Task<List<T>> FindAllAsync<T>()
         {

            return _db.GetCollection<T>(typeof(T).Name).FindAsync(_ => true).Result.ToListAsync();
         }


        public Task<List<T>> FindAllAsync<T>(FilterDefinition<T> filter)
        {

            return _db.GetCollection<T>(typeof(T).Name).FindAsync(filter).Result.ToListAsync();
        }


        public Task<T> FindByIdAsync<T>(string id)
        {
            return _db.GetCollection<T>(typeof(T).Name).Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();
        }

        public Task InsertOneAsync<T>(T newItem)
        {
            return _db.GetCollection<T>(typeof(T).Name).InsertOneAsync(newItem);
        }

        public Task<ReplaceOneResult> UpdateAsync<T>(string id, T updatedItem)
        {
            return  _db.GetCollection<T>(typeof(T).Name).ReplaceOneAsync(Builders<T>.Filter.Eq("_id", ObjectId.Parse(id)), updatedItem);
        }

        public Task<DeleteResult> DeleteAsync(string id)
        {
            return _db.GetCollection<User>(nameof(User)).DeleteOneAsync(Builders<User>.Filter.Eq("_id", id));
        }
    }
}