namespace Quorum.Application.DTOs
{
    public class BillStatisticsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Supporters { get; set; }
        public int Opposers { get; set; }
        public string PrimarySponsor { get; set; } = string.Empty;
    }
}
