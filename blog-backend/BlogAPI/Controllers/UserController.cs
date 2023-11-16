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
    public class UserController : BaseController
    {
        private readonly UserService _userService;

        public UserController(UserService userService, IWebHostEnvironment env) : base(env)
        {
            _userService = userService;
        }

        [HttpGet("GetUserByUserId")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> GetUserByUserIdAsync(string userId)
        {
            try
            {
                return await _userService.GetUserByUserIdAsync(userId);

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [HttpGet("GetUserByNameSurnameAsync")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDTO>> GetUserByNameSurnameAsync(string name, string surname)
        {
            try
            {
                return await _userService.GetUserByNameSurnameAsync(name, surname);

            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        
        [HttpPut("UpdateUser")]
        [Authorize(Policy ="user")]
        public async Task<ActionResult> UpdateUserAsync(UserDTO userDTO)
        {
            try
            {
                if (User?.Identity?.Name != userDTO.UserId)
                    throw new UnauthorizedAccessException();


                await _userService.UpdateUserAsync(userDTO);
                return Ok("User updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Policy ="user")]
        public async Task<ActionResult> DeleteUserAsync(string userId)
        {
            try
            {           


                if (User?.Identity?.Name != userId)
                    throw new UnauthorizedAccessException();

                await _userService.DeleteUserAsync(userId);
                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [HttpPut("GiveRole")]
        [Authorize(Policy ="admin")]
        public async Task<ActionResult> GiveRole(string roleId, string userId)
        {
            try
            { 
                await _userService.GiveRole(userId,roleId);
                return Ok("Role assigned");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        [HttpPut("RemoveRole")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> RemoveRole(string roleId, string userId)
        {
            try
            {
                await _userService.RemoveRole(userId, roleId);
                return Ok("Role removed");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}

