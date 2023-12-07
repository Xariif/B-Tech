using BlogAPI.Repositories;

namespace BlogAPI.Services
{
    public class CommentsService
    {
        private readonly CommentsRepository _commentsRepository;

        public CommentsService(CommentsRepository commentsRepository)
        {
            _commentsRepository = commentsRepository;
        }
    }
}
