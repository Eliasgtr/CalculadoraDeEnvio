// Capa de Presentación → comunica con la Capa API (ASP.NET Core)
const BASE_URL = "http://localhost:5000/api/shipping";

export async function getCountries() {
  const res = await fetch(`${BASE_URL}/countries`);
  if (!res.ok) throw new Error("Error al obtener países");
  return res.json();
}

export async function calculateShipping(weight, destinationCountry) {
  const res = await fetch(`${BASE_URL}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weight: parseFloat(weight), destinationCountry }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al calcular tarifa");
  return data;
}
