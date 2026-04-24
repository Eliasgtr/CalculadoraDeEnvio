namespace ShippingApp.Models.DTOs
{
    public class ShippingRequestDto
    {
        public decimal Weight { get; set; }
        public string DestinationCountry { get; set; } = string.Empty;
    }
}
