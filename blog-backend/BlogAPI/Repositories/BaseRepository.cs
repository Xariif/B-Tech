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

        public Task<T> FindByIdAsync<T>(string id)
        {
            return _db.GetCollection<T>(typeof(T).Name).Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();
        }

        public Task InsertOneAsync<TDocument>(TDocument newItem)
        {
            return _db.GetCollection<TDocument>(typeof(TDocument).Name).InsertOneAsync(newItem);
        }

        public Task<ReplaceOneResult> UpdateAsync<TDocument>(string id, TDocument updatedItem)
        {
            var res =  _db.GetCollection<TDocument>(typeof(TDocument).Name).ReplaceOneAsync(Builders<TDocument>.Filter.Eq("_id", ObjectId.Parse(id)), updatedItem);

            if (!res.IsCompletedSuccessfully)
            {
                throw res.Exception;
                
            }

            return res;
        }

        public Task<DeleteResult> DeleteAsync(string id)
        {
            return _db.GetCollection<User>(nameof(User)).DeleteOneAsync(Builders<User>.Filter.Eq("_id", id));
        }
    }
}