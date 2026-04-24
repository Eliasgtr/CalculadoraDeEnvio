export default function ResultDisplay({ result, error }) {
  if (error) {
    return (
      <div className="result error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="result success">
      <h3>Resultado del Envío</h3>
      <table>
        <tbody>
          <tr>
            <td>País de destino</td>
            <td><strong>{result.country}</strong></td>
          </tr>
          <tr>
            <td>Peso del paquete</td>
            <td><strong>{result.weight} kg</strong></td>
          </tr>
          <tr>
            <td>Tarifa por kg</td>
            <td><strong>${result.ratePerKg} USD</strong></td>
          </tr>
          <tr className="total">
            <td>Costo total</td>
            <td><strong>${result.shippingCost} USD</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
