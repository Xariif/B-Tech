using BlogAPI.DTOs.Posts;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "author")]
    [Route("api/[controller]")]

    public class PostsController : BaseController
    {
        private readonly PostsService _postsService;

        public PostsController(PostsService postsService, IWebHostEnvironment env) : base(env)
        {
            _postsService = postsService;
        }

        [HttpGet("GetApprovedPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Posts>>> GetApprovedPosts()
        {
            try
            {
                var result = await _postsService.GetPostsByStatusAsync(Status.Aproved);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetDraftPosts")]
        public async Task<ActionResult<List<Posts>>> GetDraftPosts()
        {
            try
            {
                var userId = User.Identity.Name;

                var result = await _postsService.GetPostsByStatusAndUserIdAsync(Status.Draft, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetRejectedPosts")]
        public async Task<ActionResult<List<Posts>>> GetRejectedPosts()
        {
            try
            {
                var result = await _postsService.GetPostsByStatusAndUserIdAsync(Status.Rejected, "");
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetPostWaitingForApproval")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<Posts>>> GetPostWaitingForApproval()
        {
            try
            {
                var result = await _postsService.GetPostsByStatusAsync(Status.ToConfirm);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpGet("GetApprovedPostsByAuthorId")]
        public async Task<ActionResult<Posts>> GetApprovedPostsByAuthorId(string id)
        {
            try
            {

                var res = await _postsService.GetApprovedPostsByAuthorIdAsync(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost(PostsDTO newPost)
        {
            try
            {
                if (User?.Identity?.Name != newPost.AuthorId)
                    throw new UnauthorizedAccessException();

                Posts post = new()
                {
                    AuthorId = ObjectId.Parse(newPost.AuthorId),
                    Category = newPost.Category,
                    Content = newPost.Content,
                    CreatedAt = DateTime.UtcNow,
                    Id = MongoDB.Bson.ObjectId.GenerateNewId(),
                    MainParentId = null,
                    Status = Status.Draft,
                    Tags = newPost.Tags,
                    Title = newPost.Title
                };

                await _postsService.CreatePostAsync(post);
                return Ok("Post created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("UpdateDraftPost")]
        [Authorize(Policy = "author")]
        public async Task<ActionResult> UpdateDraftPost(PostsDTO postDto)
        {
            try
            {
                if (User?.Identity?.Name != postDto.AuthorId)
                    throw new UnauthorizedAccessException();

                if (postDto?.Id != null)
                {
                    await _postsService.UpdateDraftPostAsync(postDto);
                }
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }



        [HttpPut("AcceptPost")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> AcceptPost(string id)
        {
            try
            {
                await _postsService.RejectPostAsync(id);
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("RejectPost")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> RejectPost(string id)
        {
            try
            {
                await _postsService.RejectPostAsync(id);
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpDelete("DeletePost")]
        [Authorize(Policy = "author")]
        public async Task<ActionResult> DeletePost(string id)
        {
            try
            {
                await _postsService.DeletePostAsync(id);
                return Ok("Post deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
