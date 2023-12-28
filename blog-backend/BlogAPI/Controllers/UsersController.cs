using BlogAPI.DTOs.Users;
using BlogAPI.Helpers;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : BaseController
{
    private readonly UsersService _usersService;
    private readonly Auth0Service _auth0Service;

    public UsersController(UsersService usersService, Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
    {
        _usersService = usersService;
        _auth0Service = auth0Service;
    }




    [Authorize("admin")]
    [HttpGet("GetUserByAuth0Id")]
    public async Task<ActionResult<Users>> GetUserByAuth0IdAsync(string auth0Id)
    {
        try
        {
            return await _usersService.GetUserByAuth0IdAsync(auth0Id);
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [Authorize]
    [HttpGet("GetUserData")]
    public async Task<ActionResult<UsersDTO>> GetUserData()
    {
        try
        {
            var userId = IdHelper.GetUserId(User, _usersService).ToString();
            var res = await _usersService.GetUserByIdAsync(userId);

            return new UsersDTO()
            {
                Id = res.Id.ToString(),
                Name = res.Name,
                Surname = res.Surname,
                Email = res.Email,
                Phone = res.Phone,
                ActiveFrom = res.ActiveFrom,
                Auth0Id = res.Auth0Id,
                AvatarId = res.AvatarId.ToString()
            };
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }
    [Authorize]
    [HttpGet("GetAvatar")]
    public async Task<ActionResult<UsersDTO>> GetAvatar(string id)
    {
        try
        {
            var res = await _usersService.GetAvatarAsync(id);
            return File(res, "image/jpeg");

        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }




    [Authorize]
    [HttpPut("UpdateUser")]
    public async Task<ActionResult> UpdateUserAsync([FromForm] UpdateUsersDTO userDto)
    {
        try
        {
            var userId = IdHelper.GetUserId(User, _usersService);

            await _usersService.UpdateUserAsync(userId.ToString(), userDto);
            return Ok("User updated");
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [Authorize]
    [HttpDelete("DeleteUser")]
    public async Task<ActionResult> DeleteUserAsync()
    {
        try
        {
            var userId = IdHelper.GetUserId(User, _usersService).ToString();

            await _usersService.DeleteUserAsync(userId);
            await _auth0Service.DeleteUserAsync(User.Identity.Name);
            // await _auth0Service.DeleteUserConnectionAsync(User.Identity.Name);

            return Ok("Author Deleted");
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }

    [Authorize("admin")]
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