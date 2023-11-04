using BlogAPI.DTOs.Author;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class AuthorService : BaseService
    {
        public async Task<AuthorDTO> GetAuthorByIdAsync(string id)
        {
            var author = await GetByIdAsync(_authorCollection, id) ?? throw new ArgumentException("Author not found");
            return new AuthorDTO
            {
                Id = author.Id.ToString(),
                Name = author.Name,
                Surname = author.Surname,
                Description = author.Description,
                ActiveFrom = author.ActiveFrom
            };
        }

        public async Task<AuthorDTO> GetAuthorByNameSurnameAsync(string name, string surname)
        {
            var filter = Builders<Author>.Filter.Where(x => x.Name == name && x.Surname == surname);
            var cursor = await _authorCollection.FindAsync(filter);
            var author = await cursor.FirstOrDefaultAsync() ?? throw new ArgumentException("Author not found");
            return new AuthorDTO
            {
                Id = author.Id.ToString(),
                Name = author.Name,
                Surname = author.Surname,
                Description = author.Description,
                ActiveFrom = author.ActiveFrom
            };
        }



        public async Task CreateAuthorAsync(NewAuthorDTO newAuthor)
        {
            var author = new Author
            {
                Id = ObjectId.GenerateNewId(),
                Name = newAuthor.Name.Trim(),
                Surname = newAuthor.Surname.Trim(),
                Description = newAuthor.Description?.Trim(),
                ActiveFrom = newAuthor.ActiveFrom
            };

            var filter = Builders<Author>.Filter.Where(x => x.Name == newAuthor.Name && x.Surname == newAuthor.Surname);
            var res = await _authorCollection.Find(filter).ToListAsync();
            if (res.Any())
            {
                throw new ArgumentException("Author with same name and surname already exist");
            }

            await _authorCollection.InsertOneAsync(author);
        }

        public async Task UpdateAuthorAsync(AuthorDTO updateAuthor)
        {
            var author = await GetByIdAsync(_authorCollection, updateAuthor.Id) ?? throw new ArgumentException("Author not found");
            author = new Author
            {
                Id = ObjectId.Parse(updateAuthor.Id),
                Name = updateAuthor.Name ?? throw new ArgumentException("Name is required"),
                Surname = updateAuthor.Surname ?? throw new ArgumentException("Surname is required"),
                Description = updateAuthor.Description,
                ActiveFrom = updateAuthor.ActiveFrom
            };


            var filter = Builders<Author>.Filter.Where(x => x.Id == ObjectId.Parse(updateAuthor.Id));

            await _authorCollection.ReplaceOneAsync(filter, author);
        }


        public async Task DeleteAuthorAsync(string id)
        {
            var filter = Builders<Author>.Filter.Where(x => x.Id == ObjectId.Parse(id));
            await _authorCollection.DeleteOneAsync(filter);
        }
    }
}
