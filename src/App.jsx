import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import { fetchWeather } from "./api/weather";
import "./styles/styles.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]); // NEW: track recent searches

  const handleSearch = async (city) => {
    try {
      setError("");
      setWeather(null);
      setLoading(true);

      const data = await fetchWeather(city);
      setWeather(data);

      // update recent searches (remove duplicates, keep max 5)
      setRecentSearches((prev) => {
        const updated = [city, ...prev.filter((c) => c !== city)];
        return updated.slice(0, 5);
      });
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🌤️ Weather Dashboard</h1>
        <p className="app-subtitle">Search for current weather in any city</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} />

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h3>Recent Searches</h3>
            <ul>
              {recentSearches.map((city, index) => (
                <li key={index}>
                  <button onClick={() => handleSearch(city)}>{city}</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {/* Error message */}
        {error && !loading && <ErrorMessage message={error} />}

        {/* Weather card */}
        {weather && !loading && <WeatherCard weather={weather} />}
      </main>

      <footer className="app-footer">
        <p>Built by Chiboy using React + OpenWeather API</p>
      </footer>
    </div>
  );
}
