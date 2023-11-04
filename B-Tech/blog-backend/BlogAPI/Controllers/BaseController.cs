using System;
using Microsoft.AspNetCore.Mvc;

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
                return Unauthorized("Nie posiadasz uprawnień do wykonania tej akcji.");
            }
            else if (_env.IsDevelopment())
            {
                return StatusCode(500, new { ErrorMessage = exception.Message, StackTrace = exception.StackTrace });
            }
            else
            {
                return StatusCode(500, new { ErrorMessage = "Wystąpił błąd serwera. Skontaktuj się z administratorem." });
            }
        }
    }
}

