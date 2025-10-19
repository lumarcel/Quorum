using CsvHelper.Configuration.Attributes;


namespace LegislativeData.Infrastructure.Repositories
{
    public class CsvModels
    {
        public class LegislatorCsv
        {
            [Name("id")]
            public int Id { get; set; }

            [Name("name")]
            public string Name { get; set; } = string.Empty;
        }

        public class BillCsv
        {
            [Name("id")]
            public int Id { get; set; }

            [Name("title")]
            public string Title { get; set; } = string.Empty;

            [Name("sponsor_id")]
            public int SponsorId { get; set; }
        }

        public class VoteCsv
        {
            [Name("id")]
            public int Id { get; set; }

            [Name("bill_id")]
            public int BillId { get; set; }
        }

        public class VoteResultCsv
        {
            [Name("id")]
            public int Id { get; set; }

            [Name("legislator_id")]
            public int LegislatorId { get; set; }

            [Name("vote_id")]
            public int VoteId { get; set; }

            [Name("vote_type")]
            public int VoteType { get; set; }
        }
    }
}
