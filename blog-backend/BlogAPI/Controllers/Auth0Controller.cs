using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize("admin")]
    public class Auth0Controller : BaseController
    {
        private readonly Auth0Service _auth0Service;

        public Auth0Controller(Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
        {
            _auth0Service = auth0Service;
        }



        [HttpGet("GetUserRoles")]
        public async Task<ActionResult> GetUserRoles(string auth0Id)
        {
            try
            {
                var res = await _auth0Service.GetUserRolesAsync(auth0Id);
                return Ok(res);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("RemoveRole")]
        public async Task<ActionResult> RemoveRole(string auth0Id, string[] roleId)
        {
            try
            {
                await _auth0Service.RemoveRoleAsync(auth0Id, roleId);
                return Ok("Role removed");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("GiveRole")]
        public async Task<ActionResult> GiveRole(string auth0Id, string[] roleId)
        {
            try
            {
                await _auth0Service.GiveRoleAsync(auth0Id, roleId);
                return Ok("Role given");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
