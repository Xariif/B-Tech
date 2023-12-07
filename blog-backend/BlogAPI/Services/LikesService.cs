using BlogAPI.Repositories;

namespace BlogAPI.Services
{
    public class LikesService
    {
        private readonly LikesRepository _likesRepository;

        public LikesService(LikesRepository likesRepository)
        {
            _likesRepository = likesRepository;
        }
    }
}
