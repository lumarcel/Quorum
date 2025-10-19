namespace Quorum.Domain.Entities
{
    public class VoteResult
    {
        public int Id { get; set; }
        public int LegislatorId { get; set; }
        public int VoteId { get; set; }
        public VoteType VoteType { get; set; }
    }

    public enum VoteType
    {
        Yea = 1,
        Nay = 2
    }
}
