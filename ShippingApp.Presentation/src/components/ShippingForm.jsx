import { useState } from "react";
import CountrySelector from "./CountrySelector";

export default function ShippingForm({ countries, onCalculate, loading }) {
  const [weight, setWeight]   = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    if (!weight || parseFloat(weight) <= 0) {
      alert("Ingresa un peso válido mayor a 0.");
      return;
    }
    if (!country) {
      alert("Selecciona un país de destino.");
      return;
    }
    onCalculate(weight, country);
  };

  const handleClear = () => {
    setWeight("");
    setCountry("");
  };

  return (
    <div className="form-card">
      <h2>Calculadora de Envío</h2>

      <div className="field">
        <label>Peso del paquete (kg)</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          placeholder="Ej: 2.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>

      <CountrySelector
        countries={countries}
        value={country}
        onChange={setCountry}
      />

      <div className="buttons">
        <button onClick={handleSubmit} disabled={loading} className="btn-primary">
          {loading ? "Calculando..." : "Calcular Tarifa"}
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Limpiar
        </button>
      </div>
    </div>
  );
}
