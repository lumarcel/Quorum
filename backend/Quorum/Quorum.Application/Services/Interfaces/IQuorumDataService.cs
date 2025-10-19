using Quorum.Application.DTOs;

namespace Quorum.Application.Services.Interfaces
{
    public interface IQuorumDataService
    {
        Task<IEnumerable<LegislatorStatisticsDto>> GetLegislatorStatisticsAsync();
        Task<IEnumerable<BillStatisticsDto>> GetBillStatisticsAsync();
    }
}
