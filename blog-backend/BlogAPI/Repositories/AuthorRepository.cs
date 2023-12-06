using BlogAPI.Contexts;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Repositories
{
    public class AuthorRepository : BaseRepository
    {
        public AuthorRepository(MongoDataBaseContext context) : base(context)
        {
        }

        public async Task<Author> GetAuthorByIdAsync(string id)
        {
            return await _context.Authors.Find(Builders<Author>.Filter.Eq(author => author.Id, ObjectId.Parse(id))).FirstOrDefaultAsync();
            
        }
    }
}
