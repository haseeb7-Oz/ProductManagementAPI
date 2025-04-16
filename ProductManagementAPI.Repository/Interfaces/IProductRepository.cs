using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductEntity>> GetAllAsync();
        Task<ProductEntity> GetByIdAsync(Guid id);
        Task<IEnumerable<ProductEntity>> SearchAsync(string? keyword, int pageNumber, int pageSize);
        Task<ProductEntity> AddAsync(ProductEntity product);
        Task<ProductEntity> UpdateAsync(ProductEntity product);
        Task DeleteAsync(Guid id);
    }
}
