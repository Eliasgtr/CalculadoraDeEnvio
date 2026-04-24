using Microsoft.Extensions.Configuration;
using ShippingApp.Models.Entities;

namespace ShippingApp.Data.Repositories
{
    public class RateRepository : IRateRepository
    {
        private readonly IConfiguration _configuration;

        public RateRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public ShippingRate? GetRateByCountryCode(string countryCode)
        {
            return GetAllRates().FirstOrDefault(r =>
                r.CountryCode.Equals(countryCode, StringComparison.OrdinalIgnoreCase));
        }

        public IEnumerable<ShippingRate> GetAllRates()
        {
            var rates = _configuration
                .GetSection("ShippingRates")
                .Get<List<ShippingRate>>();
            return rates ?? new List<ShippingRate>();
        }
    }
}
