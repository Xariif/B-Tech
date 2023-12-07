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
    private readonly Auth0Service _auth0Service;
    public UserController(UserService userService, Auth0Service auth0Service,IWebHostEnvironment env) : base(env)
    {
        _userService = userService;
        _auth0Service = auth0Service;
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
            var userId = User?.Identity?.Name ?? throw new Exception();

            await _userService.UpdateUserAsync(userId,userDto);
            return Ok("User updated");
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [HttpDelete("DeleteUser")]
    public async Task<ActionResult> DeleteUserAsync()
    {
        try
        {
            var userId = User?.Identity?.Name ?? throw new UnauthorizedAccessException();

            await _userService.DeleteUserAsync(userId);
            await _auth0Service.DeleteUserAsync(userId);
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