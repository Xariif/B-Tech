using BlogAPI.DTOs.Author;
using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Bson;

namespace BlogAPI.Services
{
    public class AuthorService
    {
        private readonly AuthorRepository _authorRepository;

        public AuthorService(AuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

      


        public async Task CreateAuthorAsync(CreateAuthorDto authorDto)
        {
            var author = new Author()

            {
                Id = ObjectId.GenerateNewId(),
                UserId = authorDto.UserId,
                Description = null,
                SocialMedia = null,
            };


            var res = await _authorRepository.FindByIdAsync<Author>(author.UserId);
            if (res != null)
            {
                throw new ArgumentException("Author with same id already exist.");
            }

            await _authorRepository.InsertOneAsync(author);
        }

        public async Task<AuthorDto> GetAuthorByIdAsync(string id)
        {
            var author = await _authorRepository.FindByIdAsync<Author>(id) ?? throw new ArgumentException("Author not found");
            return new AuthorDto
            {
                Id = author.Id.ToString(),
                UserId = author.UserId,
                Description = author.Description,
                SocialMedia = author.SocialMedia,
                
            };
        }

        public async Task UpdateAuthorAsync(AuthorDto authorDto)
        {
            if (authorDto.Id == null)
               throw new ArgumentException("Id is null");

            var author = await _authorRepository.FindByIdAsync<Author>(authorDto.Id) ?? throw new ArgumentException("Author not found");
            author = new Author
            {
                Id = author.Id,
                UserId = author.UserId,
                Description = authorDto.Description,
                SocialMedia = authorDto.SocialMedia
            };

            await _authorRepository.UpdateAsync(author.Id.ToString(),author);
            
        }

        public async Task DeleteAuthorAsync(string userId)
        {
            await _authorRepository.DeleteAsync(userId);
        }
    }
}

