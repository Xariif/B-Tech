using BlogAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    public class Auth0Controller : BaseController
    {
        private readonly Auth0Service _auth0Service;

        public Auth0Controller(Auth0Service auth0Service, IWebHostEnvironment env) : base(env)
        {
            _auth0Service = auth0Service;
        }



        [HttpGet("test")]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
               await _auth0Service.GetAllUsersAuth0Async();

                return Ok("tu masz liste userów");
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
