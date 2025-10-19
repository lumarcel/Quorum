using Microsoft.AspNetCore.Mvc;
using Quorum.Application.Services.Interfaces;

namespace Quorum.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class QuorumController : ControllerBase
    {
        private readonly IQuorumDataService _service;
        private readonly ILogger<QuorumController> _logger;

        public QuorumController(
            IQuorumDataService service,
            ILogger<QuorumController> logger)
        {
            _service = service;
            _logger = logger;
        }

        /// <summary>
        /// Get statistics for all legislators including supported and opposed bills
        /// </summary>
        /// <returns>List of legislator statistics</returns>
        [HttpGet("statistics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var statistics = await _service.GetLegislatorStatisticsAsync();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving legislator statistics");
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}
