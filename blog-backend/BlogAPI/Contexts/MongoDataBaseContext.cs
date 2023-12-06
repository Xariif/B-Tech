using System;
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

			var clientSettings =  MongoClientSettings.FromUrl(new MongoUrl(connectionString));
			var mongoClient = new MongoClient(clientSettings);

			Db = mongoClient.GetDatabase(databaseName);
        }

		public IMongoCollection<T> GetCollection<T>(string collectionName)
		{
			return Db.GetCollection<T>(collectionName);
		}

		public IMongoCollection<User> Users => Db.GetCollection<User>("User");
        public IMongoCollection<Post> Posts => Db.GetCollection<Post>("Post");
        public IMongoCollection<Models.File> Files => Db.GetCollection<Models.File>("File");
        public IMongoCollection<Comment> Comments => Db.GetCollection<Comment>("Comment");
        public IMongoCollection<Like> Likes => Db.GetCollection<Like>("Like");
        public IMongoCollection<Author> Authors => Db.GetCollection<Author>("Author");
    }
}

