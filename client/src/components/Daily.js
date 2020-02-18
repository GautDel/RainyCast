import React, { useState, useEffect } from 'react'

const Daily = ({ day, fToC, i }) => {
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("default-cloud.png");

  useEffect(() => {

    const getDay = (time) => {
      const day = new Date(time * 1000).getDay();
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      if (day === 0 && i === 0) {
        setDate("Today")
      } else {
        setDate(days[day]);
      }
    }

    getDay(day.time)
    getIcon(day.icon);
  }, [day.icon, day.time, i])

  const getIcon = (icon) => {
    let link;
    switch (icon) {
      case "clear-day": link = "clear-day.png";
        break;
      case "clear-night": link = "clear-night.png";
        break;
      case "rain": link = "rain.png";
        break;
      case "snow": link = "snow.png";
        break;
      case "sleet": link = "sleet.png";
        break;
      case "wind": link = "wind.png";
        break;
      case "fog": link = "fog.png";
        break;
      case "cloudy": link = "cloudy.png";
        break;
      case "partly-cloudy-day": link = "partly-cloudy-day.png";
        break;
      case "partly-cloudy-night": link = "partly-cloudy-night.png";
        break;
    }

    setIcon(link);
  }

  return (
    <div className="daily-card">
      <div className="daily-header-container">
        <h6 className="daily-header">{date}</h6>
      </div>
      <div className="daily-img-container">
        <img src={window.location.origin + `/imgs/icons/${icon}`} alt={icon}></img>
      </div>

      <div className="daily-temp-container">
        <span className="temp">{fToC(day.temperatureLow)}°</span>
        <span className="temp">{fToC(day.temperatureHigh)}°</span>
      </div>
    </div>
  )
}

export default Daily;
