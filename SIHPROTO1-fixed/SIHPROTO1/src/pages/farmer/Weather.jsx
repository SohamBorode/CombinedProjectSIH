import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { getStoredLocation } from "../../services/auth";

const fallbackWeather = {
  location: "Amravati, Maharashtra",
  currentTemp: 29,
  description: "Partly Cloudy",
  humidity: 72,
  rainfall: 12,
  windSpeed: 14,
  forecast: [
    { day: "Today", temp: "29°", icon: "☀️" },
    { day: "Tomorrow", temp: "28°", icon: "🌦️" },
    { day: "Sunday", temp: "27°", icon: "🌧️" },
  ],
};

function Weather() {
  const [weather, setWeather] = useState(fallbackWeather);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use real GPS from localStorage (set by Detection page), fallback to Amravati
    const stored = getStoredLocation();
    const latitude = stored?.latitude ?? 20.9374;
    const longitude = stored?.longitude ?? 77.7796;

    apiGet(`/weather?lat=${latitude}&lng=${longitude}`)
      .then((data) => {
        const normalized = data?.data || data || fallbackWeather;
        setWeather({
          ...fallbackWeather,
          ...normalized,
          forecast: normalized.forecast || fallbackWeather.forecast,
        });
      })
      .catch(() => {
        setWeather(fallbackWeather);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page">Loading weather...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Weather</h1>
          <p>Weather conditions for your farming area.</p>
        </div>
      </div>

      <div className="content-card">
        <div className="weather-summary">
          <div className="temperature">
            ☀️
            <strong>{weather.currentTemp}°</strong>
          </div>

          <div>
            <h3>{weather.description}</h3>
            <p>{weather.location}</p>
          </div>
        </div>

        <div className="weather-details">
          <div>
            <span>Humidity</span>
            <strong>{weather.humidity}%</strong>
          </div>

          <div>
            <span>Rainfall</span>
            <strong>{weather.rainfall} mm</strong>
          </div>

          <div>
            <span>Wind Speed</span>
            <strong>{weather.windSpeed} km/h</strong>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2>7 Day Forecast</h2>

        <div className="weather-details">
          {(weather.forecast || fallbackWeather.forecast).map((item, index) => (
            <div key={`${item.day}-${index}`}>
              <span>{item.day}</span>
              <strong>
                {item.icon} {item.temp}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;