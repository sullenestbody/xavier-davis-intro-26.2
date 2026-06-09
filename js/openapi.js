const currentWeatherElement = document.getElementById("current-weather");
const forecastElement = document.getElementById("forecast");

// Richmond, VA coordinates
const latitude = 37.5407;
const longitude = -77.4360;

const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York`;

const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=3`;

function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm"
  };

  return weatherCodes[code] || "Weather condition unavailable";
}

async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
      throw new Error("Current weather request failed");
    }

    const data = await response.json();
    const current = data.current;

    currentWeatherElement.innerHTML = `
      <strong>Temperature:</strong> ${current.temperature_2m}°F<br>
      <strong>Feels like:</strong> ${current.apparent_temperature}°F<br>
      <strong>Humidity:</strong> ${current.relative_humidity_2m}%<br>
      <strong>Wind speed:</strong> ${current.wind_speed_10m} mph<br>
      <strong>Condition:</strong> ${getWeatherDescription(current.weather_code)}<br>
      <strong>Updated:</strong> ${current.time}
    `;
  } catch (error) {
    currentWeatherElement.textContent = "Sorry, the current weather could not be loaded.";
    console.error(error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);

    if (!response.ok) {
      throw new Error("Forecast request failed");
    }

    const data = await response.json();
    const daily = data.daily;

    forecastElement.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {
      const forecastDay = document.createElement("div");
      forecastDay.classList.add("forecast-day");

      forecastDay.innerHTML = `
        <h3>${daily.time[i]}</h3>
        <p><strong>High:</strong> ${daily.temperature_2m_max[i]}°F</p>
        <p><strong>Low:</strong> ${daily.temperature_2m_min[i]}°F</p>
        <p><strong>Chance of precipitation:</strong> ${daily.precipitation_probability_max[i]}%</p>
        <p><strong>Condition:</strong> ${getWeatherDescription(daily.weather_code[i])}</p>
      `;

      forecastElement.appendChild(forecastDay);
    }
  } catch (error) {
    forecastElement.textContent = "Sorry, the forecast could not be loaded.";
    console.error(error);
  }
}

getCurrentWeather();
getForecast();