using ProductManagementAPI.Data.Entities;
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

        public async Task<IEnumerable<Product>> GetAllProductsAsync() => await _productRepository.GetAllAsync();

        public async Task<Product> GetProductByIdAsync(Guid id) => await _productRepository.GetByIdAsync(id);

        public async Task<IEnumerable<Product>> SearchProductsAsync(string? keyword, int pageNumber, int pageSize)
        {
            return await _productRepository.SearchAsync(keyword, pageNumber, pageSize);
        }

        public async Task<Product> AddProductAsync(Product product) => await _productRepository.AddAsync(product);

        public async Task<Product> UpdateProductAsync(Product product) => await _productRepository.UpdateAsync(product);

        public async Task DeleteProductAsync(Guid id) => await _productRepository.DeleteAsync(id);       
    }
}
