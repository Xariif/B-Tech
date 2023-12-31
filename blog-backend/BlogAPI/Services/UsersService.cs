﻿using BlogAPI.DTOs.Users;
using BlogAPI.Repositories;
using Users = BlogAPI.Models.Users;

namespace BlogAPI.Services
{
    public class UsersService
    {
        private readonly UsersRepository _usersRepository;

        public UsersService(UsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }


        public async Task<Users> GetUserByAuth0IdAsync(string auth0Id)
        {
            return await _usersRepository.FindFirstByAuth0IdAsync(auth0Id) ?? throw new ArgumentException("User not found");
        }

        public async Task<Users> GetUserByIdAsync(string id)
        {
            return await _usersRepository.FindFirstByIdAsync<Users>(id) ?? throw new ArgumentException("User not found");
        }


        public async Task<List<UsersDTO>> GetAllUsersAsync()
        {

            var users = await _usersRepository.FindAllAsync<Users>();
            var usersDto = users.Select(user => new UsersDTO
            {
                Id = user.Id.ToString(),
                Auth0Id = user.Auth0Id,
                Name = user.Name,
                Surname = user.Surname,
                ActiveFrom = user.ActiveFrom,
                Email = user.Email,
                Phone = user.Phone
            }).ToList();


            return usersDto;
        }

        public async Task UpdateUserAsync(string userId, UpdateUsersDTO updateUser)
        {
            var user = await _usersRepository.FindFirstByAuth0IdAsync(userId) ??
                       throw new ArgumentException("User not found");
            user = new Users
            {
                Id = user.Id,
                Auth0Id = user.Auth0Id,
                Name = updateUser.Name,
                Surname = updateUser.Surname,
                ActiveFrom = user.ActiveFrom,
                Phone = updateUser.Phone,
                Email = user.Email
            };

            await _usersRepository.UpdateAsync<Users>(user.Id.ToString(), user);
        }

        public async Task DeleteUserAsync(string id)
        {
            await _usersRepository.DeleteAsync<Users>(id);
        }

    }
}
