using BlogAPI.DTOs.Author;
using BlogAPI.DTOs.Post;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "author")]
    [Route("api/[controller]")]

    public class PostController : BaseController
    {
        private readonly PostService _postService;

        public PostController(PostService postService, IWebHostEnvironment env) : base(env)
        {
            _postService = postService;
        }

        [HttpGet("GetApprovedPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Posts>>> GetApprovedPosts()
        {
            try
            {
                var result = await _postService.GetPostsByStatusAsync(Status.Aproved);
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
                var userId = User?.Identity?.Name;




                var result = await _postService.GetPostsByStatusAndUserIdAsync(Status.Draft, userId);
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
                var result = await _postService.GetPostsByStatusAndUserIdAsync(Status.Rejected, "");
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
                var result = await _postService.GetPostsByStatusAsync(Status.ToConfirm);
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

                var res = await _postService.GetApprovedPostsByAuthorIdAsync(id);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost(NewPostDto newPost)
        {
            try
            {
                if (User?.Identity?.Name != newPost.AuthorId)
                    throw new UnauthorizedAccessException();

                Posts post = new()
                {
                    AuthorId = newPost.AuthorId,
                    Category = newPost.Category,
                    Content = newPost.Content,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    Id = MongoDB.Bson.ObjectId.GenerateNewId(),
                    MainParentId = null,
                    Status = Status.Drafts,
                    Tags = newPost.Tags,
                    Title = newPost.Title
                };

                await _postService.CreatePostAsync(post);
                return Ok("Post created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("UpdateDraftPost")]
        [Authorize(Policy = "author")]
        public async Task<ActionResult> UpdateDraftPost(PostDto postDto)
        {
            try
            {
                if (User?.Identity?.Name != postDto.AuthorId)
                    throw new UnauthorizedAccessException();         

                if (postDto?.Id != null)
                {
                    await _postService.UpdateDraftPostAsync(postDto);
                }
                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        //update accepted post - create a new copy with toconfirm status and search if exist then remove first one

        //przy accept main parent id = null  chyba

        [HttpPut("AcceptPost")]
        [Authorize(Policy = "admin")]
        public async Task<ActionResult> AcceptPost(string id)
        {
            try
            {
                await _postService.RejectPostAsync(id);
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
                await _postService.RejectPostAsync(id);
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
                await _postService.DeletePostAsync(id);
                return Ok("Post deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}
