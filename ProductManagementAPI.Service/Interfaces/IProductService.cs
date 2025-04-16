using ProductManagementAPI.Database.Entities;

namespace ProductManagementAPI.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductEntity>> GetAllProductsAsync();
        Task<ProductEntity> GetProductByIdAsync(Guid id);
        Task<IEnumerable<ProductEntity>> SearchProductsAsync(string? keyword, int pageNumber, int pageSize);
        Task<ProductEntity> AddProductAsync(ProductEntity product);
        Task<ProductEntity> UpdateProductAsync(ProductEntity product);
        Task DeleteProductAsync(Guid id);
    }
}
