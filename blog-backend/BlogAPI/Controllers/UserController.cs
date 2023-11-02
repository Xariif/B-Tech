using System;
using Microsoft.AspNetCore.Authentication;
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


        

    }
}

