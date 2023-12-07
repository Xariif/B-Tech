using BlogAPI.Services;

namespace BlogAPI.Controllers
{
    public class LikesController : BaseController
    {
        private readonly LikesService _likesService;

        public LikesController(LikesService likesService, IWebHostEnvironment env) : base(env)
        {
            _likesService = likesService;

        }

    }
}
