using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Data.Entities;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Controllers
{
    [Authorize]
    [Route("api/products")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService productService, ILogger<ProductsController> logger)
        {
           _productService = productService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Product?>> Add(Product product)
        {
            _logger.LogInformation("Creating a new product: {@Product}", product);
            return Ok(await _productService.AddProductAsync(product));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? keyword, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var products = await _productService.SearchProductsAsync(keyword, pageNumber, pageSize);
            return Ok(products);
        }

        [HttpPut("update")]
        public async Task<ActionResult<Product?>> Update(Product product)
        {
            _logger.LogInformation("Updating product: {@Product}", product);
            return Ok(await _productService.UpdateProductAsync(product));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
