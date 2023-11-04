using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin,author")]
    public class PostController : BaseController
    {
        private readonly PostService _postService;

        public PostController(PostService postService,IWebHostEnvironment env) : base(env)
        {
            _postService = postService;
        }

        [HttpGet("GetPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            try
            {
                var result = await _postService.GetPostsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetPostById")]
        [AllowAnonymous]
        public async Task<ActionResult<Post>> GetPostById(string id)
        {
            try
            {
                var res = await _postService.GetPostByIdAsync(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        
        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost(NewPostDTO newPost)
        {
            try
            {

                await _postService.CreatePostAsync(newPost);
                return Ok("Post created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("UpdatePost")]
        public async Task<ActionResult> UpdatePost(PostDTO updatePost)
        {
            try
            {
                await _postService.UpdatePostAsync(updatePost);
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeletePost")]
        public async Task<ActionResult> DeletePost(string id)
        {
            try
            {
                await _postService.DeletePost(id);
                return Ok("Post deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
