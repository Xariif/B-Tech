using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Contexts
{
    public class MongoDataBaseContext
    {
        public readonly IMongoDatabase Db;
        public MongoDataBaseContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("MongoDB").GetSection("ConnectionURI1").Value;
            var databaseName = configuration.GetSection("MongoDB").GetSection("DatabaseName1").Value;

            var clientSettings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            var mongoClient = new MongoClient(clientSettings);

            Db = mongoClient.GetDatabase(databaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return Db.GetCollection<T>(collectionName);
        }

        public IMongoCollection<Users> Users => Db.GetCollection<Users>("Users");
        public IMongoCollection<Authors> Authors => Db.GetCollection<Authors>("Authors");
        public IMongoCollection<Posts> Posts => Db.GetCollection<Posts>("Posts");
        public IMongoCollection<Comments> Comments => Db.GetCollection<Comments>("Comments");
        public IMongoCollection<Likes> Likes => Db.GetCollection<Likes>("Likes");
    }
}

