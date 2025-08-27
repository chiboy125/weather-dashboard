export default function WeatherCard({ weather }) {
  
  
  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <img src={weather.icon} alt={weather.condition} />
      <p className="temp">{weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.wind} km/h</p>
    </div>
  );
}
