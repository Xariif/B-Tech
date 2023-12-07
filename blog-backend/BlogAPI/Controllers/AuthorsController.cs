using BlogAPI.DTOs.Authors;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class AuthorsController : BaseController
    {
        private readonly AuthorsService _authorsService;

        public AuthorsController(AuthorsService authorsService, IWebHostEnvironment env) : base(env)
        {
            _authorsService = authorsService;
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
        public async Task<ActionResult> CreateAuthor(string newAuthorUserId)
        {
            try
            {
                await _authorsService.CreateAuthorAsync(newAuthorUserId);
                return Ok("Author created");
            }
            catch (ArgumentException ex)
            {

                return HandleError(ex);
            }
        }


        [Authorize(Roles = "author")]
        [HttpPut("UpdateAuthor")]
        public async Task<ActionResult> UpdateAuthor(AuthorsDTO authorDto)
        {
            try
            {
                await _authorsService.UpdateAuthorAsync(authorDto);
                return Ok("Author updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeleteAuthor")]
        public async Task<ActionResult> DeleteAuthor(string id)
        {
            try
            {
                await _authorsService.DeleteAuthorAsync(id);
                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

    }
}

