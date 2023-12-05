using BlogAPI.Interfaces.DataBase;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class AuthorRepository : BaseRepository<Author>
    {
        public AuthorRepository(IDataBaseContext context) : base(context)
        {
        }

        public async Task<Author> GetAuthorByIdAsync(string id)
        {
            return await _dbCollection.Find(Builders<Author>.Filter.Eq(author => author.Id, ObjectId.Parse(id))).FirstOrDefaultAsync();
        }
    }
}
