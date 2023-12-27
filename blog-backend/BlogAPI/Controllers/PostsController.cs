using BlogAPI.DTOs.Posts;
using BlogAPI.Helpers;
using BlogAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BlogAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : BaseController
    {
        private readonly PostsService _postsService;
        private readonly UsersService _usersService;
        private readonly AuthorsService _authorsService;


        public PostsController(IWebHostEnvironment env, PostsService postsService, UsersService usersService,
            AuthorsService authorsService) : base(env)
        {
            _postsService = postsService;
            _usersService = usersService;
            _authorsService = authorsService;
        }

        [AllowAnonymous]
        [HttpGet("GetImage")]
        public async Task<ActionResult<(byte[], BsonDocument)>> GetImage(string id)
        {
            try
            {
                var post = await _postsService.GetPostByMainPhotoIdAsync(id);

                if (post == null)
                {
                    throw new ArgumentException("Post using that image not found");
                }

                var result = await _postsService.GetPostImageAsync(id);

                var fileinfo =await _postsService.GetFileInfo(id);
                
                if (post.Status == Status.Aproved)
                {
                    return (result,fileinfo);
                }

                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                

                if (post.AuthorId != authorId)
                    throw new UnauthorizedAccessException();

                return (result, fileinfo);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetApprovedPosts")]
        public async Task<ActionResult<List<PostsDTO>>> GetApprovedPosts()
        {
            try
            {
                var result = await _postsService.GetPostsByStatusAsync(Status.Aproved);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();


                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [Authorize("write:posts")]
        [HttpGet("GetDraftPosts")]
        public async Task<ActionResult<List<PostsDTO>>> GetDraftPosts()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);

                var result = await _postsService.GetPostsByStatusAndAuthorIdAsync(Status.Draft, authorId);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [Authorize("write:posts")]
        [HttpGet("GetRejectedPosts")]
        public async Task<ActionResult<List<PostsDTO>>> GetRejectedPosts()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                var result = await _postsService.GetPostsByStatusAndAuthorIdAsync(Status.Rejected, authorId);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [Authorize("write:posts")]
        [HttpGet("GetPostWaitingForApproval")]
        public async Task<ActionResult<List<PostsDTO>>> GetPostWaitingForApproval()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                var result = await _postsService.GetPostsByStatusAndAuthorIdAsync(Status.ToConfirm, authorId);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetApprovedPostsByAuthorId")]
        public async Task<ActionResult<PostsDTO>> GetApprovedPostsByAuthorId(string authorId)
        {
            try
            {
                var result = await _postsService.GetApprovedPostsByAuthorIdAsync(authorId);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [AllowAnonymous]
        [HttpGet("GetApprovedPostsByCategory")]
        public async Task<ActionResult<List<PostsDTO>>> GetApprovedPostsByCategory(string category)
        {
            try
            {
                var result = await _postsService.GetApprovedPostsByCategoryAsync(category);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [AllowAnonymous]
        [HttpGet("GetAuthorApprovedPosts")]
        public async Task<ActionResult<List<PostsDTO>>> GetAuthorApprovedPosts()
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);

                var posts = await _postsService.GetApprovedPostsByAuthorIdAsync(authorId.ToString()) ?? throw new Exception("Author posts not found");

                var res = posts.Select(post =>
                {
                    var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                    var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                    return new PostsDTO
                    {
                        Id = post.Id.ToString(),
                        Title = post.Title,
                        Category = post.Category,
                        Content = post.Content,
                        Tags = post.Tags,
                        MainPhotoId = post.MainPhotoId.ToString(),
                        AuthorName = user.Name,
                        AuthorSurname = user.Surname,
                        AuthorId = author.Id.ToString(),
                        CreatedAt = post.CreatedAt,
                        Status = post.Status,
                        Dislikes = post.Dislikes,
                        Likes = post.Likes,
                        Views = post.Views,
                        MainParentId = post.MainParentId?.ToString()
                    };
                }).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetTopApprovedPosts")]
        public async Task<ActionResult<List<PostsDTO>>> GetTopApprovedPosts(DateTime from, DateTime to)
        {
            try
            {
                var posts = await _postsService.GetTopApprovedPostsAsync(from, to) ?? throw new Exception("Author posts not found");

                var res = posts.Select(post =>
                {
                    var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                    var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                    return new PostsDTO
                    {
                        Id = post.Id.ToString(),
                        Title = post.Title,
                        Category = post.Category,
                        Content = post.Content,
                        Tags = post.Tags,
                        MainPhotoId = post.MainPhotoId.ToString(),
                        AuthorName = user.Name,
                        AuthorSurname = user.Surname,
                        AuthorId = author.Id.ToString(),
                        CreatedAt = post.CreatedAt,
                        Status = post.Status,
                        Dislikes = post.Dislikes,
                        Likes = post.Likes,
                        Views = post.Views,
                        MainParentId = post.MainParentId?.ToString()
                    };
                }).ToList();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [AllowAnonymous]
        [HttpGet("GetApprovedPostsByTag")]
        public async Task<ActionResult<List<PostsDTO>>> GetApprovedPostsByTag(string tag)
        {
            try
            {
                var result = await _postsService.GetApprovedPostsByTagAsync(tag);

                var res = result.Select(post =>
                    {
                        var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                        var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                        return new PostsDTO
                        {
                            Id = post.Id.ToString(),
                            Title = post.Title,
                            Category = post.Category,
                            Content = post.Content,
                            Tags = post.Tags,
                            MainPhotoId = post.MainPhotoId.ToString(),
                            AuthorName = user.Name,
                            AuthorSurname = user.Surname,
                            AuthorId = author.Id.ToString(),
                            CreatedAt = post.CreatedAt,
                            Status = post.Status,
                            Dislikes = post.Dislikes,
                            Likes = post.Likes,
                            Views = post.Views,
                            MainParentId = post.MainParentId?.ToString()
                        };
                    }
                ).ToList();


                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("GetApprovedPostById")]
        public async Task<ActionResult<List<PostsDTO>>> GetApprovedPostById(string id)
        {
            try
            {
                var post = await _postsService.GetPostByIdAsync(id) ?? throw new Exception("Post not found");


                var author = _authorsService.GetAuthorByIdAsync(post.AuthorId.ToString()).Result;
                var user = _usersService.GetUserByIdAsync(author.UserId).Result;

                var res = new PostsDTO
                {
                    Id = post.Id.ToString(),
                    Title = post.Title,
                    Category = post.Category,
                    Content = post.Content,
                    Tags = post.Tags,
                    MainPhotoId = post.MainPhotoId.ToString(),
                    AuthorName = user.Name,
                    AuthorSurname = user.Surname,
                    AuthorId = author.Id.ToString(),
                    CreatedAt = post.CreatedAt,
                    Status = post.Status,
                    Dislikes = post.Dislikes,
                    Likes = post.Likes,
                    Views = post.Views,
                    MainParentId = post.MainParentId?.ToString()
                };

                return Ok(res);
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }



        [Authorize("write:posts")]
        [HttpPost("CreateDraftPost")]
        public async Task<ActionResult> CreateDraftPost([FromForm] CreateDraftPostDTO newDraftPost)
        {

            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);

                await _postsService.CreateDraftPostAsync(newDraftPost, Status.Draft, authorId);

                return Ok("Post created");
            }

            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [Authorize("write:posts")]
        [HttpPost("CreatePost")]
        public async Task<ActionResult> CreatePost([FromForm] CreatePostDTO newPost)
        {

            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);

                await _postsService.CreatePostAsync(newPost, Status.ToConfirm, authorId);

                return Ok("Post created");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [Authorize("write:posts")]
        [HttpPut("UpdateDraftPost")]
        public async Task<ActionResult> UpdateDraftPost([FromForm] UpdateDraftPostDTO postDto)
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                var post = await _postsService.GetPostByIdAsync(postDto.Id);

                if (post?.AuthorId != authorId)
                    throw new UnauthorizedAccessException();


                await _postsService.UpdateDraftPostAsync(postDto);

                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }



        [Authorize("write:posts")]
        [HttpPut("UpdateAcceptedPost")]
        public async Task<ActionResult> UpdateAcceptedPost([FromForm] UpdatePostDTO postDto)
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                var post = await _postsService.GetPostByIdAsync(postDto.Id);

                if (post?.AuthorId != authorId)
                    throw new UnauthorizedAccessException();


                await _postsService.UpdateAcceptedPostAsync(postDto);

                return Ok("Post updated");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }


        [HttpPut("AcceptPost")]
        [Authorize("admin")]
        public async Task<ActionResult> AcceptPost(string id)
        {
            try
            {
                await _postsService.AcceptPostAsync(id);
                return Ok("Post accepted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [HttpPut("RejectPost")]
        [Authorize("admin")]
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

        [Authorize("delete:posts")]
        [HttpDelete("DeletePost")]
        public async Task<ActionResult> DeletePost(string id)
        {
            try
            {
                var authorId = IdHelper.GetAuthorId(User, _usersService, _authorsService);
                var post = await _postsService.GetPostByIdAsync(id);

                if (post?.AuthorId != authorId)
                    throw new UnauthorizedAccessException();

                await _postsService.DeletePostAsync(id);
                return Ok("Post deleted");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }

        [AllowAnonymous]
        [HttpPost("IncreaseViews")]
        public async Task<ActionResult> IncreaseViews(string id)
        {
            try
            {
                await _postsService.IncreaseViewsAsync(id);
                return Ok("Views increased");
            }
            catch (Exception ex)
            {
                return HandleError(ex);
            }
        }
    }
}

