using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagementAPI.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ILogger<CustomersController> _logger;

        public CustomersController(ICustomerService customerService, ILogger<CustomersController> logger)
        {
            _customerService = customerService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<CustomerEntity?>> Add(CustomerEntity customer)
        {
            _logger.LogInformation("Creating a new customer: {@Customer}", customer);
            return Ok(await _customerService.AddCustomerAsync(customer));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _customerService.GetAllCustomersAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            return customer == null ? NotFound() : Ok(customer);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? keyword, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var customers = await _customerService.SearchCustomersAsync(keyword, pageNumber, pageSize);
            return Ok(customers);
        }

        [HttpPut("update")]
        public async Task<ActionResult<CustomerEntity?>> Update(CustomerEntity customer)
        {
            _logger.LogInformation("Updating customer: {@Customer}", customer);
            return Ok(await _customerService.UpdateCustomerAsync(customer));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _customerService.DeleteCustomerAsync(id);
            return NoContent();
        }
    }
}
