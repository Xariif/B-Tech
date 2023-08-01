using BlogAPI.DTOs.Author;

using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : BaseController
    {
        private readonly AuthorService _authorService;

        public AuthorController(AuthorService authorService, IWebHostEnvironment env) : base(env)
        {
            _authorService = authorService;
        }


        [HttpGet("GetAuthorById")]
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

