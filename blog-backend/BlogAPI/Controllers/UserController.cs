using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController :BaseController
	{
		public UserController(IWebHostEnvironment env) : base(env)
        { 
		}

        [HttpGet("claims")]
        public IActionResult Claims()
        {
            return Ok(User.Claims.Select(c =>
                new
                {
                    c.Type,
                    c.Value
                }));
        }

        [HttpGet("SecureEndpoint")]
        [Authorize]
        public IActionResult GetSecureData()
        {            


            var x= User?.Identity?.Name;

            var y = User.Claims;

           var z =  User.FindFirst(ClaimTypes.NameIdentifier)?.Value;



            return Ok("Dane chronione");
        }

        [HttpGet("SecureEndpointAdmin")]
        [Authorize( Policy="admin")]
        public IActionResult SecureEndpointAdmin()
        {
            return Ok("Dane chronione admin");
        }
        [HttpGet("SecureEndpointAuthor")]
        [Authorize(Policy ="author")]
        public IActionResult SecureEndpointAuthor()
        {
            return Ok("Dane chronione author");
        }
        [HttpGet("SecureEndpointUser")]
        [Authorize(Policy ="user")]
        public IActionResult SecureEndpointUser()
        {
            return Ok("Dane chronione user");
        }


    

    }
}

