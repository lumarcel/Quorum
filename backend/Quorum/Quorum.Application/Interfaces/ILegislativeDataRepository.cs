using Quorum.Domain.Entities;

namespace Quorum.Application.Interfaces
{
    public interface ILegislativeDataRepository
    {
        Task<IEnumerable<Legislator>> GetAllLegislatorsAsync();
        Task<IEnumerable<Bill>> GetAllBillsAsync();
        Task<IEnumerable<Vote>> GetAllVotesAsync();
        Task<IEnumerable<VoteResult>> GetAllVoteResultsAsync();
    }
}
