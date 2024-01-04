using BlogAPI.DTOs.Authors;
using BlogAPI.DTOs.Users;
using BlogAPI.Entities;
using BlogAPI.Helpers;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : BaseController
    {
        private readonly AuthorsService _authorsService;
        private readonly UsersService _usersService;
        private readonly Auth0Service _auth0Service;


        public AuthorsController(AuthorsService authorsService, UsersService usersService, Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
        {
            _authorsService = authorsService;
            _usersService = usersService;
            _auth0Service = auth0Service;
        }

        [AllowAnonymous]
        [HttpGet("GetAuthorByUserId")]
        public async Task<ActionResult<AuthorsDTO>> GetAuthorByUserId(string id)
        {
            try
            {
                var author = await _authorsService.GetAuthorByUserIdAsync(id);
                var user = await _usersService.GetUserByIdAsync(author.UserId.ToString());

                return new AuthorsDTO()
                {
                    Id = author.Id.ToString(),
                    Description = author.Description,
                    UserId = author.UserId.ToString(),
                    SocialMedia = author.SocialMedia
                };


            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }

        }

        [AllowAnonymous]
        [HttpGet("GetAvatarByAuthorId")]
        public async Task<ActionResult<UsersDTO>> GetAvatar(string id)
        {
            try
            {
                var author = await _authorsService.GetAuthorByIdAsync(id);
                var user = await _usersService.GetUserByIdAsync(author.UserId);
                if (user.AvatarId == null)
                {
                    return NotFound("Avatar not found");
                }
                var res = await _usersService.GetAvatarAsync(user.AvatarId.ToString());
                return File(res, "image/jpeg");

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetAuthorById")]
        public async Task<ActionResult<object>> GetAuthorById(string id)
        {
            try
            {
                var author = await _authorsService.GetAuthorByIdAsync(id);
                var user = await _usersService.GetUserByIdAsync(author.UserId);

                return new
                {
                    author.Id,
                    author.UserId,
                    author.Description,
                    author.SocialMedia,
                    user.Name,
                    user.Surname,
                    user.Email,
                    user.Auth0Id,
                    user.ActiveFrom
                };
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }

        }
        [Authorize("admin")]
        [HttpPost("CreateAuthor")]
        public async Task<ActionResult> CreateAuthor(string userId)
        {
            try
            {
                await _authorsService.CreateAuthorAsync(userId);

                var user = await _usersService.GetUserByIdAsync(userId);
                await _auth0Service.GiveRoleAsync(user.Auth0Id, RoleIds.Author);

                return Ok("Author created");
            }
            catch (ArgumentException ex)
            {

                return HandleError(ex);
            }
        }


        [Authorize("write:posts")]
        [HttpPut("UpdateAuthor")]
        public async Task<ActionResult> UpdateAuthor([FromForm] UpdateAuthorsDTO authorDto)
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);

                await _authorsService.UpdateAuthorAsync(authorId, authorDto);

                return Ok("Author updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [Authorize("admin")]
        [HttpDelete("DeleteAuthor")]
        public async Task<ActionResult> DeleteAuthor()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);


                await _authorsService.DeleteAuthorAsync(authorId.ToString());

                var userId = IdHelper.GetUserId(User, _usersService);

                var user = await _usersService.GetUserByIdAsync(userId.ToString());
                await _auth0Service.RemoveRoleAsync(user.Auth0Id, RoleIds.Author);

                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

    }
}

