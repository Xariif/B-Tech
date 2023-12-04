using System;
using BlogAPI.Extensions;
using BlogAPI.Interfaces.DataBase;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BlogAPI.Models
{
    public class DataBaseContext : IDataBaseContext
    {
        private readonly IMongoDatabase _db;

        public DataBaseContext(IOptions<ConnectionSetting> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.DataBase);
        }


        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _db.GetCollection<T>(name);
        }
    }
}

