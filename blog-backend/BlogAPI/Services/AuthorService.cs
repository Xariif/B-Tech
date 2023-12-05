using System;
using BlogAPI.DTOs.Author;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class AuthorService
    {
        private readonly AuthorRepository _authorRepository;

        public AuthorService(AuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

      


        public async Task CreateAuthorAsync(CreateAuthorDTO authorDTO)
        {
            var author = new Author()

            {
                Id = ObjectId.GenerateNewId(),
                UserId = authorDTO.UserId,
                Description = null,
                SocialMedia = null,
            };


            var res = await _authorRepository.FindByIdAsync(author.UserId);
            if (res != null)
            {
                throw new ArgumentException("Author with same id already exist.");
            }

            await _authorRepository.CreateAsync(author);
        }
        public async Task DeleteAuthorAsync(string userId)
        {
            await _authorRepository.DeleteAsync(userId);
        }
    }
}

