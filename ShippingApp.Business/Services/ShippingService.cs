using ShippingApp.Data.Repositories;
using ShippingApp.Models.DTOs;
using ShippingApp.Models.Entities;

namespace ShippingApp.Business.Services
{
    public class ShippingService : IShippingService
    {
        private readonly IRateRepository _rateRepository;

        public ShippingService(IRateRepository rateRepository)
        {
            _rateRepository = rateRepository;
        }

        public ShippingResponseDto CalculateRate(ShippingRequestDto request)
        {
            var rate = _rateRepository.GetRateByCountryCode(request.DestinationCountry);

            if (rate == null)
                throw new KeyNotFoundException($"No se encontró tarifa para: {request.DestinationCountry}");

            return new ShippingResponseDto
            {
                ShippingCost = request.Weight * rate.RatePerKg,
                Currency     = "USD",
                Country      = rate.Country,
                Weight       = request.Weight,
                RatePerKg    = rate.RatePerKg
            };
        }

        public IEnumerable<ShippingRate> GetAvailableCountries()
        {
            return _rateRepository.GetAllRates();
        }
    }
}
