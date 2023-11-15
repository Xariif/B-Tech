using BlogAPI.DTOs.Author;

using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin,author")]
    public class AuthorController : BaseController
    {
        private readonly AuthorService _authorService;

        public AuthorController(AuthorService authorService, IWebHostEnvironment env) : base(env)
        {
            _authorService = authorService;
        }

        [HttpGet("GetAuthorById")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthorDTO>> GetAuthorById(string id)
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


        [HttpGet("GetAuthorByNameSurname")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthorDTO>> GetAuthorByNameSurname(string name, string surname)
        {
            try
            {
                return await _authorService.GetAuthorByNameSurnameAsync(name, surname);

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }

        }

        
        [HttpPost("CreateAuthor")]
        [Authorize(Policy ="admin")]
        public async Task<ActionResult> CreateAuthor(NewAuthorDTO newAuthorDTO)
        {
            try
            {
                await _authorService.CreateAuthorAsync(newAuthorDTO);
                return Ok("Author created");
            }
            catch (ArgumentException ex)
            {

                return HandleError(ex);
            }
        }



        [HttpPut("UpdateAuthor")]
        [Authorize(Policy ="author")]
        public async Task<ActionResult> UpdateAuthor(AuthorDTO authorDTO)
        {
            try
            {
                await _authorService.UpdateAuthorAsync(authorDTO);
                return Ok("Author updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeleteAuthor")]
        [Authorize(Policy ="admin")]
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

