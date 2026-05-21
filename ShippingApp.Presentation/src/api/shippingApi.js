// Capa de Presentación — lógica de cálculo embebida (sin backend)
// Mismas tarifas que appsettings.json en ShippingApp.API

const SHIPPING_RATES = [
  { country: "India",                countryCode: "IN", ratePerKg: 5  },
  { country: "Estados Unidos",       countryCode: "US", ratePerKg: 8  },
  { country: "Reino Unido",          countryCode: "UK", ratePerKg: 10 },
  { country: "Canada",               countryCode: "CA", ratePerKg: 7  },
  { country: "Republica Dominicana", countryCode: "DO", ratePerKg: 6  },
];

export async function getCountries() {
  // Devuelve los países disponibles directamente (sin llamada HTTP)
  return SHIPPING_RATES;
}

export async function calculateShipping(weight, destinationCountry) {
  const w = parseFloat(weight);

  if (!w || w <= 0) {
    throw new Error("El peso debe ser mayor a 0.");
  }

  const rate = SHIPPING_RATES.find((r) => r.countryCode === destinationCountry);

  if (!rate) {
    throw new Error(`No se encontró tarifa para: ${destinationCountry}`);
  }

  // Misma fórmula que ShippingService.cs: Weight * RatePerKg
  return {
    shippingCost: w * rate.ratePerKg,
    currency:     "USD",
    country:      rate.country,
    weight:       w,
    ratePerKg:    rate.ratePerKg,
  };
}
