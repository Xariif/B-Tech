using System;
using System.Linq.Expressions;
using Auth0.ManagementApi.Models;
using MongoDB.Driver;

namespace BlogAPI.Interfaces.Repositories
{
    public interface IBaseRepository
    {
        Task<List<T>> FindAllAsync<T>();

        Task<T?> FindByIdAsync<T>(string id);

        Task CreateAsync<TDocument>(TDocument newItem);
            
        Task<ReplaceOneResult> UpdateAsync<TDocument>(string id, TDocument updatedItem);

        Task<DeleteResult> DeleteAsync(string id);

    }
}
