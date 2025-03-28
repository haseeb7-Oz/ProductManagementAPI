using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Database.Entities;
using ProductManagementAPI.DTOs;
using ProductManagementAPI.Services.Interfaces;

namespace ProductManagementAPI.Controllers
{
    [Authorize]
    [Route("api/plan-management")]
    [ApiController]
    public class PlanManagementController : ControllerBase
    {
        public readonly IPlanManagementService _planManagementService;
        public readonly ILogger<PlanManagementController> _logger;

        public PlanManagementController(IPlanManagementService planManagementService, ILogger<PlanManagementController> logger)
        {
            _planManagementService = planManagementService;
            _logger = logger;
        }

        [HttpPost("create")]
        public async Task<ActionResult<PlanManagementEntity?>> Add(PlanManagementEntity plan)
        {
            _logger.LogInformation("Creating a new Plan: {@Plan}", plan);
            return Ok(await _planManagementService.AddPlanAsync(plan));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _planManagementService.GetAllPlansAsync();
            return Ok(plans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var plan = await _planManagementService.GetPlanByIdAsync(id);
            return plan == null ? NotFound() : Ok(plan);
        }

        [HttpPost("search")]
        public async Task<IActionResult> Search([FromBody] PlanSearchDto searchDto)
        {
            var plans = await _planManagementService.SearchPlansAsync(searchDto);
            return Ok(plans);
        }

        [HttpPut("update")]
        public async Task<ActionResult<PlanManagementEntity?>> Update(PlanManagementEntity plan)
        {
            _logger.LogInformation("Updating plan: {@Plan}", plan);
            return Ok(await _planManagementService.UpdatePlanAsync(plan));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _planManagementService.DeletePlanAsync(id);
            return NoContent();
        }
    }
}
