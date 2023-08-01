using System.Xml.Linq;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;
namespace BlogAPI.Services
{
    public class BaseService
    {
        protected IMongoDatabase db;
        protected IMongoCollection<Post> _postCollection;
        protected IMongoCollection<Author> _authorCollection;
        protected IMongoCollection<Comment> _commentCollection;
        protected IMongoCollection<CommentLike> _commentLikeCollection;
        protected IMongoCollection<PostLike> _postLikeCollection;


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

            _postCollection = db.GetCollection<Post>("Post");
            _authorCollection = db.GetCollection<Author>("Author");
            _commentCollection = db.GetCollection<Comment>("Comment");
            _commentLikeCollection = db.GetCollection<CommentLike>("CommentLike");
            _postLikeCollection = db.GetCollection<PostLike>("PostLike");
        }

        protected async Task<T> GetById<T>(IMongoCollection<T> collection, string id)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            var cursor = await collection.FindAsync(filter);
            var res = await cursor.FirstOrDefaultAsync();

            return res;
        }
    }
}
