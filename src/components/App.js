import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query === "") {
      setWeather(null);
      return;
    }

    const API_KEY = "0bd4c354c356d22e15a517de69d46f41";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod !== 200) {
          setWeather(null);
        } else {
          setWeather(data);
        }
      })
      .catch(() => setWeather(null));
  }, [query]);

  const toFahrenheit = (k) => Math.round((k - 273.15) * 9/5 + 32);

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Enter a city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <h1>{toFahrenheit(weather.main.temp)}°F</h1>
          <p>{weather.weather[0].description}</p>

          <img
            alt="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};

export default App;
