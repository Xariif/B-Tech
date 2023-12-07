using BlogAPI.DTOs.Users;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "user")]
public class UsersController : BaseController
{
    private readonly UsersService _usersService;
    private readonly Auth0Service _auth0Service;
    public UsersController(UsersService usersService, Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
    {
        _usersService = usersService;
        _auth0Service = auth0Service;
    }

    [Authorize(Policy = "admin")]
    [HttpGet("GetUserByUserId")]
    public async Task<ActionResult<UsersDTO>> GetUserByUserIdAsync(string userId)
    {
        try
        {
            return await _usersService.GetUserByUserIdAsync(userId);
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [HttpPut("UpdateUser")]
    public async Task<ActionResult> UpdateUserAsync(UsersDTO userDto)
    {
        try
        {
            var userId = User?.Identity?.Name ?? throw new UnauthorizedAccessException();

            await _usersService.UpdateUserAsync(userId, userDto);
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

            await _usersService.DeleteUserAsync(userId);
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
            var res = await _usersService.GetAllUsersAsync();
            return Ok(res);
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }
}