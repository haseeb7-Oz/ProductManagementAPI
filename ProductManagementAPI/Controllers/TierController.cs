using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Controllers
{
    [Authorize]
    [Route("api/tier")]
    [ApiController]
    public class TierController : ControllerBase
    {
        private readonly ITierService _tierService;
        private readonly ILogger<TierController> _logger;

        public TierController(ITierService tierService, ILogger<TierController> logger)
        {
            _tierService = tierService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _tierService.GetAllTiersAsync();
            return Ok(plans);
        }
    }
}
