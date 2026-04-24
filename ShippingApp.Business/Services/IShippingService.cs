using ShippingApp.Models.DTOs;
using ShippingApp.Models.Entities;

namespace ShippingApp.Business.Services
{
    public interface IShippingService
    {
        ShippingResponseDto CalculateRate(ShippingRequestDto request);
        IEnumerable<ShippingRate> GetAvailableCountries();
    }
}
