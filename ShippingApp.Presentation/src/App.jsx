import { useEffect, useState } from "react";
import ShippingForm from "./components/ShippingForm";
import ResultDisplay from "./components/ResultDisplay";
import { getCountries, calculateShipping } from "./api/shippingApi";
import "./App.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch(() => setError("No se pudo conectar con el servidor."));
  }, []);

  const handleCalculate = async (weight, country) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await calculateShipping(weight, country);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🚚 Tarifas de Envío Internacional</h1>
        <p>Calcula el costo de envío según el peso y destino de tu paquete</p>
      </header>
      <main>
        <ShippingForm
          countries={countries}
          onCalculate={handleCalculate}
          loading={loading}
        />
        <ResultDisplay result={result} error={error} />
      </main>
    </div>
  );
}
