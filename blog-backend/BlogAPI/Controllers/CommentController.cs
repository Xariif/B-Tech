using System;
using BlogAPI.DTOs.Comment;
using BlogAPI.Models;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin,author,user")]
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
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpGet("GetCommentsForPost")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCommentsForPost(string postId, int pageNumber, int pageSize)
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

