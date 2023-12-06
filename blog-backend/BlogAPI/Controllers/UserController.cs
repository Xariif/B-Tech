using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.User;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers;

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

    [Authorize(Policy = "admin")]
    [HttpGet("GetUserByUserId")]
    public async Task<ActionResult<UserDto>> GetUserByUserIdAsync(string userId)
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
    public async Task<ActionResult> UpdateUserAsync(UpdateUserDto userDto)
    {
        try
        {
            await _userService.UpdateUserAsync(User.Identity.Name ,userDto);
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