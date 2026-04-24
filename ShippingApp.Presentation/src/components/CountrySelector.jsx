export default function CountrySelector({ countries, value, onChange }) {
  return (
    <div className="field">
      <label>País de destino</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">-- Selecciona un país --</option>
        {countries.map((c) => (
          <option key={c.countryCode} value={c.countryCode}>
            {c.country}
          </option>
        ))}
      </select>
    </div>
  );
}
