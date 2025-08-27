const API_KEY = "0004e59a194ec070b94cf4053f655725";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    return {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      condition: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    throw error;
  }
}