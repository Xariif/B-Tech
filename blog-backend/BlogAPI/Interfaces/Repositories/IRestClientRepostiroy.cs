using RestSharp;

namespace BlogAPI.Interfaces.Repositories
{
    public interface IRestClientRepostiroy
    {

        Task<T> GetAsync<T>(string url);
        Task<T> PostAsync<T, T1>(T1 data,string url);

    }
}
