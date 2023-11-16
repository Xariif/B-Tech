using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
 
    public class PostController : BaseController
    {
        private readonly PostService _postService;

        public PostController(PostService postService,IWebHostEnvironment env) : base(env)
        {
            _postService = postService;
        }

        [HttpGet("GetPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Post>>> GetApprovedPosts()
        {
            try
            {
                var result = await _postService.GetApprovedPosts();
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


        [HttpGet("GetPostsByAuthorId")]
        public async Task<ActionResult<Post>> GetPostByAuthorId(string id)
        {
            try
            {

                var res = await _postService.GetPostsByAuthorIdAsync(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }



        [HttpPost("CreatePost")]
        [Authorize(Policy ="author")]
        public async Task<ActionResult> CreatePost(NewPostDTO newPost)
        {
            try
            {
                if (User?.Identity?.Name != newPost.AuthorId)
                    throw new UnauthorizedAccessException();

                await _postService.CreatePostAsync(newPost);
                return Ok("Post created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("UpdatePost")]
        [Authorize(Policy ="author")]
        public async Task<ActionResult> UpdatePost(PostDTO updatePost)
        {
            try
            {
                
                if (User?.Identity?.Name!= updatePost.AuthorId)
                    throw new UnauthorizedAccessException();


                await _postService.UpdatePostAsync(updatePost);
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("AcceptPost")]
        [Authorize(Policy ="author")]
        public async Task<ActionResult> AcceptPost(string id)
        {
            try
            {
                await _postService.AcceptPostAsync(id);
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeletePost")]
        [Authorize(Policy ="author")]
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
