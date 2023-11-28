using BlogAPI.DTOs.Author;
using BlogAPI.Services;
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
        [Authorize(Policy = "user")]
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
        [Authorize(Policy = "user")]
        public async Task<ActionResult> DeleteUserAsync(string userId)
        {
            try
            {


                //   if (User?.Identity?.Name != userId)
                //      throw new UnauthorizedAccessException();

                //  await _userService.DeleteUserAsync(userId);
                return Ok("Author Deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [HttpPost("CreateAuthor")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> GiveRole(string userId)
        {
            try
            {
                //   await _aut.GiveRole(userId, "rol_mEDYNSt4dPqgXNz7");
                //await _userService.CreateAuthorInDbAsync(userId);
                return Ok("New author created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
        [HttpDelete("DeleteAuthor")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> RemoveRole(string userId)
        {
            try
            {
                //   await _userService.RemoveRole(userId, "rol_mEDYNSt4dPqgXNz7");
                return Ok("Author deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Policy = "admin")]
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

        [HttpGet("TestGetUsers")]
        [AllowAnonymous]
        public async Task<ActionResult> TestGetUsers()
        {
            try
            {

                return Ok();
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}

