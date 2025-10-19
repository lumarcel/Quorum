using Quorum.Application.DTOs;

namespace Quorum.Application.Services.Interfaces
{
    public interface ILegislativeDataService
    {
        Task<IEnumerable<LegislatorStatisticsDto>> GetLegislatorStatisticsAsync();
        Task<IEnumerable<BillStatisticsDto>> GetBillStatisticsAsync();
    }
}
