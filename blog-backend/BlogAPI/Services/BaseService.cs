using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
namespace BlogAPI.Services
{
    public class BaseService
    {
        protected IMongoDatabase db;
        protected IMongoCollection<Authors> _authorsCollection;
        protected IMongoCollection<Comments> _commentsCollection;
        protected IMongoCollection<Likes> _likesCollection;
        protected IMongoCollection<Posts> _postsCollection;
        protected IMongoCollection<Users> _usersCollection;

        public BaseService()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json", optional: false);

            var configuration = builder.Build();
            var connectionURI = configuration["MongoDB:ConnectionURI1"];
            var databaseName = configuration["MongoDB:DatabaseName1"];


            var settings = MongoClientSettings.FromConnectionString(connectionURI);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            var client = new MongoClient(settings);

            db = client.GetDatabase(databaseName);

            _postsCollection = db.GetCollection<Posts>("Posts");
            _authorsCollection = db.GetCollection<Authors>("Authors");
            _commentsCollection = db.GetCollection<Comments>("Comments");
            _likesCollection = db.GetCollection<Likes>("Likes");
            _usersCollection = db.GetCollection<Users>("Users");
        }

        public async Task<T> GetByIdAsync<T>(IMongoCollection<T> collection, string id)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            var cursor = await collection.FindAsync(filter);
            var res = await cursor.FirstOrDefaultAsync();

            return res;
        }
    }
}
