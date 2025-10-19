using Quorum.Application.DTOs;
using Quorum.Application.Interfaces;
using Quorum.Application.Services.Interfaces;
using Quorum.Domain.Entities;

namespace Quorum.Application.Services
{
    public class LegislativeDataService : ILegislativeDataService
    {
        private readonly ILegislativeDataRepository _repository;

        public LegislativeDataService(ILegislativeDataRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LegislatorStatisticsDto>> GetLegislatorStatisticsAsync()
        {
            var legislators = await _repository.GetAllLegislatorsAsync();
            var voteResults = await _repository.GetAllVoteResultsAsync();

            var statistics = legislators.Select(legislator =>
            {
                var legislatorVotes = voteResults.Where(vr => vr.LegislatorId == legislator.Id);

                return new LegislatorStatisticsDto
                {
                    Id = legislator.Id,
                    Name = legislator.Name,
                    SupportedBills = legislatorVotes.Count(vr => vr.VoteType == VoteType.Yea),
                    OpposedBills = legislatorVotes.Count(vr => vr.VoteType == VoteType.Nay)
                };
            }).OrderBy(x => x.Name);

            return statistics;
        }

        public async Task<IEnumerable<BillStatisticsDto>> GetBillStatisticsAsync()
        {
            var bills = await _repository.GetAllBillsAsync();
            var legislators = await _repository.GetAllLegislatorsAsync();
            var votes = await _repository.GetAllVotesAsync();
            var voteResults = await _repository.GetAllVoteResultsAsync();

            var legislatorDict = legislators.ToDictionary(l => l.Id, l => l.Name);

            var statistics = bills.Select(bill =>
            {
                var billVote = votes.FirstOrDefault(v => v.BillId == bill.Id);
                var billVoteResults = billVote != null
                    ? voteResults.Where(vr => vr.VoteId == billVote.Id)
                    : Enumerable.Empty<VoteResult>();

                return new BillStatisticsDto
                {
                    Id = bill.Id,
                    Title = bill.Title,
                    Supporters = billVoteResults.Count(vr => vr.VoteType == VoteType.Yea),
                    Opposers = billVoteResults.Count(vr => vr.VoteType == VoteType.Nay),
                    PrimarySponsor = legislatorDict.GetValueOrDefault(bill.SponsorId, "Unknown")
                };
            }).OrderBy(x => x.Id);

            return statistics;
        }
    }
}
