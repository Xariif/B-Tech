using BlogAPI.DTOs.Authors;
using BlogAPI.Entities;
using BlogAPI.Helpers;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Authorize("admin")]
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
        [HttpGet("GetAuthorById")]
        public async Task<ActionResult<AuthorsDTO>> GetAuthorById(string id)
        {
            try
            {
                return await _authorsService.GetAuthorByIdAsync(id);

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }

        }

        [HttpPost("CreateAuthor")]
        public async Task<ActionResult> CreateAuthor(string userId)
        {
            try
            {
                await _authorsService.CreateAuthorAsync(userId);

                var user = await _usersService.GetUserByIdAsync(userId);
                await _auth0Service.GiveRoleAsync(user.Auth0Id, new string[] { RoleIds.Author });

                return Ok("Author created");
            }
            catch (ArgumentException ex)
            {

                return HandleError(ex);
            }
        }


        [Authorize("write:posts")]
        [HttpPut("UpdateAuthor")]
        public async Task<ActionResult> UpdateAuthor(UpdateAuthorsDTO authorDto)
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

        [HttpDelete("DeleteAuthor")]
        public async Task<ActionResult> DeleteAuthor()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);


                await _authorsService.DeleteAuthorAsync(authorId.ToString());

                var userId = IdHelper.GetUserId(User, _usersService);

                var user = await _usersService.GetUserByIdAsync(userId.ToString());
                await _auth0Service.RemoveRoleAsync(user.Auth0Id, new[] { RoleIds.Author });

                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

    }
}

