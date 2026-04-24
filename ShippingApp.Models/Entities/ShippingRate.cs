namespace ShippingApp.Models.Entities
{
    public class ShippingRate
    {
        public string Country { get; set; } = string.Empty;
        public string CountryCode { get; set; } = string.Empty;
        public decimal RatePerKg { get; set; }
    }
}
