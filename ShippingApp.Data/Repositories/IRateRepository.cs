using ShippingApp.Models.Entities;

namespace ShippingApp.Data.Repositories
{
    public interface IRateRepository
    {
        ShippingRate? GetRateByCountryCode(string countryCode);
        IEnumerable<ShippingRate> GetAllRates();
    }
}
