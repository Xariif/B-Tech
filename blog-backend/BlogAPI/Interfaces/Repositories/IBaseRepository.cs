using System;
using System.Linq.Expressions;
using Auth0.ManagementApi.Models;
using MongoDB.Driver;

namespace BlogAPI.Interfaces.Repositories
{
    public interface IBaseRepository<TDocument>
    {
        Task<List<TDocument>> FindAllAsync();

        Task<TDocument?> FindByIdAsync(string id);

        Task CreateAsync(TDocument newItem);
            
        Task<ReplaceOneResult> UpdateAsync(string id, TDocument updatedItem);

        Task<DeleteResult> DeleteAsync(string id);

    }
}
