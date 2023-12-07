using BlogAPI.Repositories;

namespace BlogAPI.Services
{
    public class FilesService
    {
        private readonly FilesRepository _filesRepository;
        private readonly ChunksRepository _chunksRepository;
        public FilesService(FilesRepository filesRepository, ChunksRepository chunksRepository)
        {
            _filesRepository = filesRepository;
            _chunksRepository = chunksRepository;


        }
    }
}
