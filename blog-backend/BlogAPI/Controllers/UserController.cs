using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.User;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "user")]
    public class UserController : BaseController
    {
        private readonly UserService _userService;

        public UserController(UserService userService, IWebHostEnvironment env) : base(env)
        {
            _userService = userService;
        }

        [Authorize (Policy = "admin")]
        [HttpGet("GetUserByUserId")]
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

        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUserAsync(UpdateUserDTO userDTO)
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

        [Authorize(Policy = "admin")]
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                var res = await _userService.GetAllUsersAsync();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}

