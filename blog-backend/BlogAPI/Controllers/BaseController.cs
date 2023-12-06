using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Auth0.ManagementApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BlogAPI.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public BaseController(IWebHostEnvironment env)
        {
            _env = env;
        }

        protected ActionResult HandleError(Exception exception)
        {

            if (exception is ArgumentException)
            {
                return BadRequest(exception.Message);
            }
            else if (exception is ArgumentNullException)
            {
                return BadRequest(exception.Message);
            }
            else if (exception is UnauthorizedAccessException)
            {
                return Unauthorized("You're unauthorized");
            }
            else if (_env.IsDevelopment())
            {
                return StatusCode(500, new { ErrorMessage = exception.Message, exception.StackTrace });
            }
            else
            {
                return StatusCode(500, new { ErrorMessage = "Error occured, contact with administrator" });
            }
        }
    }
}

