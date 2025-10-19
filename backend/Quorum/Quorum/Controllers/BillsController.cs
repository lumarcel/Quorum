using Microsoft.AspNetCore.Mvc;
using Quorum.Application.Services.Interfaces;

namespace Quorum.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class BillsController : ControllerBase
    {
        private readonly IQuorumDataService _service;
        private readonly ILogger<BillsController> _logger;

        public BillsController(
            IQuorumDataService service,
            ILogger<BillsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        /// <summary>
        /// Get statistics for all bills including supporters, opposers, and primary sponsor
        /// </summary>
        /// <returns>List of bill statistics</returns>
        [HttpGet("statistics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var statistics = await _service.GetBillStatisticsAsync();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving bill statistics");
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}
