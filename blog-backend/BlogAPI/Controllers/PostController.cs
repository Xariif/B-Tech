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

        public PostController(PostService postService, IWebHostEnvironment env) : base(env)
        {
            _postService = postService;
        }

        [HttpGet("GetApprovedPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Post>>> GetApprovedPosts()
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

        [HttpGet("GetPostWaitingForApproval")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<Post>>> GetPostWaitingForApproval()
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
        [Authorize(Policy = "author")]
        public async Task<ActionResult> CreatePost(NewPostDTO newPost)
        {
            try
            {
                if (User?.Identity?.Name != newPost.AuthorId)
                    throw new UnauthorizedAccessException();

                Post post = new Post()
                {
                    AuthorId = newPost.AuthorId,
                    Category = newPost.Category,
                    Content = newPost.Content,
                    CreatedAt = DateTime.UtcNow,
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

        [HttpPut("UpdatePost")]
        [Authorize(Policy = "author")]
        public async Task<ActionResult> UpdatePost(PostDTO updatePost)
        {
            try
            {

                if (User?.Identity?.Name != updatePost.AuthorId)
                    throw new UnauthorizedAccessException();

                Post post = new Post()
                {
                    AuthorId = updatePost?.AuthorId,
                    Category = updatePost?.Category,
                    Content = updatePost?.Content,
                    CreatedAt = updatePost?.CreatedAt ?? DateTime.UtcNow,
                    Tags = updatePost?.Tags,
                    Id = MongoDB.Bson.ObjectId.Parse(updatePost?.Id),
                    MainParentId = null,
                    Status = (Status)(updatePost?.Status ?? 0),
                    Title = updatePost?.Title
                };

                if (updatePost?.Id != null)
                {
                    await _postService.UpdatePostAsync(updatePost.Id, post);
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

                var post = await _postService.GetPostByIdAsync(id) ?? throw new Exception("Post doesn't exist");
                post.Status = Status.Aproved;

                await _postService.UpdatePostAsync(id, post);
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

                var post = await _postService.GetPostByIdAsync(id) ?? throw new Exception("Post not found");
                post.Status = Status.Rejected;

                await _postService.UpdatePostAsync(id, post);
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
