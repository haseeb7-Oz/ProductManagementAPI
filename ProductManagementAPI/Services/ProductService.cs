using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Repositories.Interfaces;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
           _productRepository = productRepository; 
        }

        public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync() => await _productRepository.GetAllAsync();

        public async Task<ProductEntity> GetProductByIdAsync(Guid id) => await _productRepository.GetByIdAsync(id);

        public async Task<IEnumerable<ProductEntity>> SearchProductsAsync(string? keyword, int pageNumber, int pageSize)
        {
            return await _productRepository.SearchAsync(keyword, pageNumber, pageSize);
        }

        public async Task<ProductEntity> AddProductAsync(ProductEntity product) => await _productRepository.AddAsync(product);

        public async Task<ProductEntity> UpdateProductAsync(ProductEntity product) => await _productRepository.UpdateAsync(product);

        public async Task DeleteProductAsync(Guid id) => await _productRepository.DeleteAsync(id);       
    }
}
