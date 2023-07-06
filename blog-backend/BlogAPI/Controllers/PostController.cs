using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    public class PostController : Controller
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet("GetPosts")]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            try
            {
                var result = await _postService.GetPostsAsync();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost(NewPostDTO newPost)
        {
            try
            {
                await _postService.CreatePostAsync(newPost);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("UpdatePost")]
        public async Task<ActionResult> Ip[]


        [HttpDelete("DeletePost")]
        public async Task<ActionResult> DeletePost(string id)
        {
            try
            {
                await _postService.DeletePost(id);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
