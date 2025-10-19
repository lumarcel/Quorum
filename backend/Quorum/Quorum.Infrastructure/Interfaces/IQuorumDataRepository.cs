using Quorum.Domain.Entities;

namespace Quorum.Infrastructure.Interfaces
{
    public interface IQuorumDataRepository
    {
        Task<IEnumerable<Legislator>> GetAllLegislatorsAsync();
        Task<IEnumerable<Bill>> GetAllBillsAsync();
        Task<IEnumerable<Vote>> GetAllVotesAsync();
        Task<IEnumerable<VoteResult>> GetAllVoteResultsAsync();
    }
}
