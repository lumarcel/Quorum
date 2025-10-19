namespace Quorum.Application.DTOs
{
    public class LegislatorStatisticsDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int SupportedBills { get; set; }
        public int OpposedBills { get; set; }
    }
}
