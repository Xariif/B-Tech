using MongoDB.Driver;

namespace BlogAPI.Interfaces.Repositories
{
    public interface IBaseRepository
    {
        Task<IEnumerable<T>> FindAllAsync<T>();

        Task<T> FindByIdAsync<T>(string id);

        Task InsertOneAsync<TDocument>(TDocument newItem);

        Task<ReplaceOneResult> UpdateAsync<TDocument>(string id, TDocument updatedItem);

        Task<DeleteResult> DeleteAsync(string id);

    }
}
