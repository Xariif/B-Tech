using BlogAPI.Interfaces.Repositories;

namespace BlogAPI.Repositories
{
    public class RestClientRepository : IRestClientRepostiroy
    {
        private IRestClientRepostiroy _iRestRepository;
        public RestClientRepository(IRestClientRepostiroy restClientRepostiroy)
        {
            _iRestRepository = restClientRepostiroy;
        }

        public Task<T> GetAsync<T>(string url)
        {
           _iRestRepository.
        }

        public Task<T> PostAsync<T, T1>(T1 data, string url)
        {
            throw new NotImplementedException();
        }
    }
}
