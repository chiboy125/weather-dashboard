// components/ForecastCard.jsx
export default function ForecastCard({ forecast }) {
  // group forecast by day (OpenWeather gives 3-hour intervals)
  const daily = {};
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daily[date]) daily[date] = [];
    daily[date].push(item);
  });

  // pick one forecast per day (e.g., midday data)
  const dailyData = Object.keys(daily).slice(0, 7).map((date) => {
    const midday = daily[date][Math.floor(daily[date].length / 2)];
    return {
      date,
      temp: Math.round(midday.main.temp),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
    };
  });

  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>
      <div className="forecast-cards">
        {dailyData.map((day, i) => (
          <div className="forecast-card" key={i}>
            <p>{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />
            <p>{day.temp}°C</p>
            <p className="desc">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
