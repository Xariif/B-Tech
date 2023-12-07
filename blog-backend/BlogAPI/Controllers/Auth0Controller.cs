using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "admin")]
    public class Auth0Controller : BaseController
    {
        private readonly Auth0Service _auth0Service;

        public Auth0Controller(Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
        {
            _auth0Service = auth0Service;
        }



        [HttpGet("GetUserRoles")]
        public async Task<ActionResult> GetUserRoles(string userId)
        {
            try
            {
                var res = await _auth0Service.GetUserRolesAsync(userId);
                return Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("RemoveRole")]
        public async Task<ActionResult> RemoveRole(string userId, string roleId)
        {
            try
            {
                await _auth0Service.RemoveRoleAsync(userId, roleId);
                return Ok("Role removed");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("GiveRole")]
        public async Task<ActionResult> GiveRole(string userId, string roleId)
        {
            try
            {
                await _auth0Service.GiveRoleAsync(userId, roleId);
                return Ok("Role given");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
