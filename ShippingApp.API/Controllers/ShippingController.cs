using Microsoft.AspNetCore.Mvc;
using ShippingApp.Business.Services;
using ShippingApp.Models.DTOs;

namespace ShippingApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShippingController : ControllerBase
    {
        private readonly IShippingService _shippingService;

        public ShippingController(IShippingService shippingService)
        {
            _shippingService = shippingService;
        }

        // GET api/shipping/countries
        [HttpGet("countries")]
        public IActionResult GetCountries()
        {
            var countries = _shippingService.GetAvailableCountries();
            return Ok(countries);
        }

        // POST api/shipping/calculate
        [HttpPost("calculate")]
        public IActionResult Calculate([FromBody] ShippingRequestDto request)
        {
            if (request.Weight <= 0)
                return BadRequest(new { error = "El peso debe ser mayor a 0." });

            if (string.IsNullOrWhiteSpace(request.DestinationCountry))
                return BadRequest(new { error = "Debes seleccionar un país de destino." });

            try
            {
                var result = _shippingService.CalculateRate(request);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }
    }
}
