using BlogAPI.Services;
using MongoDB.Bson;
using System.Security.Claims;

namespace BlogAPI.Helpers
{
    public static class IdHelper
    {

        public static ObjectId GetUserId(ClaimsPrincipal user, UsersService _usersService)
        {
            var userId = user.Identity?.Name;

            if (userId is null)
            {
                throw new UnauthorizedAccessException();
            }


            var userEntity = _usersService.GetUserByAuth0IdAsync(userId).Result;

            if (userEntity is null)
            {
                throw new UnauthorizedAccessException();
            }
            return userEntity.Id;
        }

        public static ObjectId GetAuthorId(ClaimsPrincipal user, UsersService _usersService, AuthorsService _authorsService)
        {
            var userId = GetUserId(user, _usersService);

            var authorEntity = _authorsService.GetAuthorByUserIdAsync(userId.ToString()).Result;


            if (authorEntity is null)
            {
                throw new UnauthorizedAccessException();
            }

            return authorEntity.Id;
        }

    }
}
