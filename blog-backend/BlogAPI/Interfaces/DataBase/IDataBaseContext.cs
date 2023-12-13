using System;
using BlogAPI.Models;
using MongoDB.Driver;

namespace BlogAPI.Interfaces.DataBase
{
	public interface IDataBaseContext
	{
        IMongoCollection<CollectionType> GetCollection<CollectionType>(string name);

    }
}

