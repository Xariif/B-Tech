using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin,author,user")]
    public class PostLikeController : BaseController
    {
        public PostLikeController(IWebHostEnvironment env) : base(env)
        {

        }


        //like to post
        [HttpPost("AddLikeToPost")]
        public async Task<IActionResult> AddLikeToPost(string postId)
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //unlike the post
        [HttpPost("RemoveLikeFromPost")]
        public async Task<IActionResult> RemoveLikeFromPost(string postId)
        {
            try
            {
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
