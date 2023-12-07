using BlogAPI.Services;

namespace BlogAPI.Controllers
{
    public class CommentsController : BaseController
    {
        private readonly CommentsService _commentsService;

        public CommentsController(CommentsService commentsService, IWebHostEnvironment env) : base(env)
        {
            _commentsService = commentsService;
        }

    }
}
