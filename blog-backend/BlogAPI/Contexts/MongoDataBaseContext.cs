using System;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Contexts
{
	public class MongoDataBaseContext
	{
		public readonly IMongoDatabase _db;
		public MongoDataBaseContext(IConfiguration configuration)
		{
			var connectionString = configuration.GetSection("MongoDB").GetSection("ConnectionURI1").Value;
            var databaseName = configuration.GetSection("MongoDB").GetSection("DatabaseName1").Value;

			var clientSettings =  MongoClientSettings.FromUrl(new MongoUrl(connectionString));
			var mongoClient = new MongoClient(clientSettings);

			_db = mongoClient.GetDatabase(databaseName);
        }

		public IMongoCollection<T> GetCollection<T>(string collectionName)
		{
			return _db.GetCollection<T>(collectionName);
		}

		public IMongoCollection<User> Users => _db.GetCollection<User>("User");
        public IMongoCollection<Post> Posts => _db.GetCollection<Post>("Post");
        public IMongoCollection<Models.File> Files => _db.GetCollection<Models.File>("File");
        public IMongoCollection<Comment> Comments => _db.GetCollection<Comment>("Comment");
        public IMongoCollection<Like> Likes => _db.GetCollection<Like>("Like");
        public IMongoCollection<Author> Authors => _db.GetCollection<Author>("Author");
    }
}

