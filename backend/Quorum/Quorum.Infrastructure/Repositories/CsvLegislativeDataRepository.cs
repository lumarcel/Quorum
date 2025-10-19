using CsvHelper;
using CsvHelper.Configuration;
using Quorum.Domain.Entities;
using System.Globalization;
using static LegislativeData.Infrastructure.Repositories.CsvModels;

namespace Quorum.Infrastructure.Repositories
{
    class CsvLegislativeDataRepository
    {
        private readonly string _dataPath;
        private List<Legislator>? _legislators;
        private List<Bill>? _bills;
        private List<Vote>? _votes;
        private List<VoteResult>? _voteResults;

        public CsvLegislativeDataRepository(string dataPath)
        {
            _dataPath = dataPath;
        }

        public async Task<IEnumerable<Legislator>> GetAllLegislatorsAsync()
        {
            if (_legislators == null)
            {
                await LoadDataAsync();
            }
            return _legislators!;
        }

        public async Task<IEnumerable<Bill>> GetAllBillsAsync()
        {
            if (_bills == null)
            {
                await LoadDataAsync();
            }
            return _bills!;
        }

        public async Task<IEnumerable<Vote>> GetAllVotesAsync()
        {
            if (_votes == null)
            {
                await LoadDataAsync();
            }
            return _votes!;
        }

        public async Task<IEnumerable<VoteResult>> GetAllVoteResultsAsync()
        {
            if (_voteResults == null)
            {
                await LoadDataAsync();
            }
            return _voteResults!;
        }

        private async Task LoadDataAsync()
        {
            await Task.Run(() =>
            {
                _legislators = ReadCsv<LegislatorCsv, Legislator>(
                    Path.Combine(_dataPath, "legislators.csv"),
                    csv => new Legislator { Id = csv.Id, Name = csv.Name }
                );

                _bills = ReadCsv<BillCsv, Bill>(
                    Path.Combine(_dataPath, "bills.csv"),
                    csv => new Bill { Id = csv.Id, Title = csv.Title, SponsorId = csv.SponsorId }
                );

                _votes = ReadCsv<VoteCsv, Vote>(
                    Path.Combine(_dataPath, "votes.csv"),
                    csv => new Vote { Id = csv.Id, BillId = csv.BillId }
                );

                _voteResults = ReadCsv<VoteResultCsv, VoteResult>(
                    Path.Combine(_dataPath, "vote_results.csv"),
                    csv => new VoteResult
                    {
                        Id = csv.Id,
                        LegislatorId = csv.LegislatorId,
                        VoteId = csv.VoteId,
                        VoteType = (VoteType)csv.VoteType
                    }
                );
            });
        }

        private List<TEntity> ReadCsv<TCsv, TEntity>(string filePath, Func<TCsv, TEntity> mapper)
        {
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HeaderValidated = null,
                MissingFieldFound = null,
                BadDataFound = null
            };

            using var reader = new StreamReader(filePath);
            using var csv = new CsvReader(reader, config);

            return csv.GetRecords<TCsv>()
                .Where(record => record != null)
                .Select(mapper)
                .ToList();
        }
    }
}
