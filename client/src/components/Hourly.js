import React, { useState, useEffect } from 'react'


const Hourly = ({ hour, fToC }) => {
  const [time] = useState(new Date(hour.time * 1000));
  const [compHour] = useState(time.getHours());
  const [icon, setIcon] = useState("default-cloud.png");

  useEffect(() => {
    getIcon(hour.icon);
  }, [hour.icon])

  const getIcon = (icon) => {
    let link = "default-cloud.png";
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
    <div className="hour-card">
      <h6 className="hour">{compHour}</h6>
      <img src={window.location.origin + `/imgs/icons/${icon}`} alt={icon} />
      <h6 className="temp">{fToC(hour.temperature)}°</h6>
    </div>
  )
}

export default Hourly
