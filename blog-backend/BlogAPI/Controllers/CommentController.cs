using System;
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

    }
}

