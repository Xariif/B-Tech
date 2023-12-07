using BlogAPI.DTOs.Author;

using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class AuthorController : BaseController
    {
   private readonly AuthorService _authorService;

        public AuthorController(AuthorService authorService, IWebHostEnvironment env) : base(env)
        {
            _authorService = authorService;
        }

        [AllowAnonymous]
        [HttpGet("GetAuthorById")]
        public async Task<ActionResult<AuthorDto>> GetAuthorById(string id)
        {
            try
            {
                return await _authorService.GetAuthorByIdAsync(id);

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }

        }

        [HttpPost("CreateAuthor")]
        public async Task<ActionResult> CreateAuthor(CreateAuthorDto newAuthorDto)
        {
            try
            {
                await _authorService.CreateAuthorAsync(newAuthorDto);
                return Ok("Author created");
            }
            catch (ArgumentException ex)
            {

                return HandleError(ex);
            }
        }


        [Authorize(Roles ="author")]
        [HttpPut("UpdateAuthor")]
        public async Task<ActionResult> UpdateAuthor(AuthorDto authorDto)
        {
            try
            {
                await _authorService.UpdateAuthorAsync(authorDto);
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
                await _authorService.DeleteAuthorAsync(id);
                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

    }
}

