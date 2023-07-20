using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class BaseService
    {
        protected IMongoDatabase db;
        protected IMongoCollection<Post> _postCollection;
        protected IMongoCollection<Author> _authorCollection;

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

        }
    }}
