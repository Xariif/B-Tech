using BlogAPI.DTOs.Authors;
using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Bson;

namespace BlogAPI.Services
{
    public class AuthorsService
    {
        private readonly AuthorsRepository _authorsRepository;

        public AuthorsService(AuthorsRepository authorsRepository)
        {
            _authorsRepository = authorsRepository;
        }

        public async Task CreateAuthorAsync(string userId)
        {
            var author = new Authors()

            {
                Id = ObjectId.GenerateNewId(),
                UserId = userId,
                Description = null,
                SocialMedia = new SocialMedia(),
            };


            var res = await _authorsRepository.FindFirstByIdAsync<Authors>(author.UserId);
            if (res != null)
            {
                throw new ArgumentException("Author with same id already exist.");
            }

            await _authorsRepository.InsertOneAsync(author);
        }

        public async Task<AuthorsDTO> GetAuthorByIdAsync(string id)
        {
            var author = await _authorsRepository.FindFirstByIdAsync<Authors>(id) ?? throw new ArgumentException("Author not found");
            return new AuthorsDTO
            {
                Id = author.Id.ToString(),
                UserId = author.UserId,
                Description = author.Description,
                SocialMedia = author.SocialMedia,
            };
        }

        public async Task UpdateAuthorAsync(AuthorsDTO authorDto)
        {
            if (authorDto.Id == null)
                throw new ArgumentException("Id is null");

            var author = await _authorsRepository.FindFirstByIdAsync<Authors>(authorDto.Id) ?? throw new ArgumentException("Author not found");
            author = new Authors
            {
                Id = author.Id,
                UserId = author.UserId,
                Description = authorDto.Description,
                SocialMedia = authorDto.SocialMedia
            };

            await _authorsRepository.UpdateAsync(author.Id.ToString(), author);

        }

        public async Task DeleteAuthorAsync(string userId)
        {
            await _authorsRepository.DeleteAsync(userId);
        }
    }
}

