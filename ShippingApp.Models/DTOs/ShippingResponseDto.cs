namespace ShippingApp.Models.DTOs
{
    public class ShippingResponseDto
    {
        public decimal ShippingCost { get; set; }
        public string Currency { get; set; } = "USD";
        public string Country { get; set; } = string.Empty;
        public decimal Weight { get; set; }
        public decimal RatePerKg { get; set; }
    }
}
