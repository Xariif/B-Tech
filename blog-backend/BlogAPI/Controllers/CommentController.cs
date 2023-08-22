using System;
using BlogAPI.DTOs.Comment;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : BaseController
	{
        private readonly CommentService _commentService;

        public CommentController(CommentService commentService, IWebHostEnvironment env) : base(env)
        {
            _commentService = commentService;
        }

        [HttpPost("AddCommentToPost")]
        public async Task<IActionResult> AddCommentToPost(string postId, NewCommentDTO comment, string? parentCommentId = null)
        {
            try
            {
                await _commentService.AddCommentToPost(postId, comment, parentCommentId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("GetCommentsForPost")]
        public async Task<IActionResult> GetCommentsForPost(string postId, int pageNumber, int pageSize)
        {
            try
            {
                var comments = await _commentService.GetCommentsByPostIdAsync(postId,pageNumber,pageSize );
                return Ok(comments);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}

