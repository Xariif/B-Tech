using System.IdentityModel.Tokens.Jwt;
using System.Xml.Linq;
using Amazon.Runtime.Internal;
using BlogAPI.Models;
using Microsoft.Azure.KeyVault;
using MongoDB.Bson;
using MongoDB.Driver;


namespace BlogAPI.Services
{
    public class BaseService
    {
        protected IMongoDatabase db;
        protected IMongoCollection<User> _userCollection;
        protected IMongoCollection<Author> _authorCollection;
        protected IMongoCollection<Comment> _commentCollection;
        protected IMongoCollection<CommentLike> _commentLikeCollection;
        protected IMongoCollection<Post> _postCollection;
        protected IMongoCollection<PostLike> _postLikeCollection;
        protected IMongoCollection<Models.File> _fileCollection;


        protected IConfigurationRoot _configuration;

        

        public BaseService()
        {

            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json", optional: false);

            _configuration = builder.Build();           
            var connectionURI = _configuration["MongoDB:ConnectionURI1"];
            var databaseName = _configuration["MongoDB:DatabaseName1"];


            var settings = MongoClientSettings.FromConnectionString(connectionURI);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            var client = new MongoClient(settings);

            db = client.GetDatabase(databaseName);

            _postCollection = db.GetCollection<Post>("Post");
            _userCollection = db.GetCollection<User>("User");
            _commentCollection = db.GetCollection<Comment>("Comment");
            _commentLikeCollection = db.GetCollection<CommentLike>("CommentLike");
            _postLikeCollection = db.GetCollection<PostLike>("PostLike");
            _fileCollection = db.GetCollection<Models.File>("File");
            _authorCollection = db.GetCollection<Author>("Author");

        }

        protected async Task<T> GetByIdAsync<T>(IMongoCollection<T> collection, string id)
        {
            var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
            var cursor = await collection.FindAsync(filter);
            var res = await cursor.FirstOrDefaultAsync();

            return res;
        }

        protected async Task<T> GetByUserIdAsync<T>(IMongoCollection<T> collection, string userId)
        {
            var filter = Builders<T>.Filter.Eq("UserId", ObjectId.Parse(userId));
            var cursor = await collection.FindAsync(filter);
            var res = await cursor.FirstOrDefaultAsync();

            return res;
        }


    

    }
}
