import React, { useState, useEffect, Suspense } from 'react';
import axios from "axios";
import Loader from "./components/Loader.js";
import './App.css';

const Background = React.lazy(() => import("./components/Background.js"))
const Time = React.lazy(() => import("./components/Time.js"))
const Moon = React.lazy(() => import("./components/Moon.js"))
const Forecast = React.lazy(() => import("./components/Forecast.js"))
const Today = React.lazy(() => import("./components/Today.js"))
const Hourly = React.lazy(() => import("./components/Hourly.js"))
const Daily = React.lazy(() => import("./components/Daily.js"))


function App() {

  // State
  const [init, setInit] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState("");
  const [hour, setHour] = useState("");
  const [day, setDay] = useState("");
  const [daily, setDaily] = useState("");
  const [hourly, setHourly] = useState("");
  const [weather, setWeather] = useState("");
  const [zone, setZone] = useState("");
  const [temp, setTemp] = useState("");
  const [msg, setMsg] = useState("Initialising App....");

  useEffect(() => {

    // Get Location
    const getLocation = async () => {
      const randomCoords = await axios.get("/random");
      const { lat, long } = randomCoords.data;

      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setMsg("Location found, updating forecast...");

        setTimeout(() => {
          setInit(true);
          setTimeout(() => {
            setLoaded(true);
          }, 10000);
        }, 1000);

        // Passes location values to Weather API
        getWeather(latitude, longitude);
      }

      const error = () => {
        setMsg("Privacy is important, Here's a random weather forecast");

        getWeather(lat, long);

        setTimeout(() => {
          setInit(true);
          setTimeout(() => {
            setLoaded(true);
          }, 10000);
        }, 1000);
      }

      if (!navigator.geolocation) {
        setMsg("Geolocation is off, here's a random weather forecast");
        getWeather(lat, long);

        setTimeout(() => {
          setInit(true);
          setTimeout(() => {
            setLoaded(true);
          }, 10000);
        }, 1000);
      } else {
        setMsg("Determining your location...");
        navigator.geolocation.getCurrentPosition(success, error, {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000
        });
      }
    }

    // Get Current Time
    const getTime = () => {

      // Variables
      const date = new Date();
      let hour = setNum(date.getHours());
      let minute = setNum(date.getMinutes());
      let second = setNum(date.getSeconds());
      const day = date.getDay();
      let dayMonth = setNum(date.getDate());
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


      // Set State
      setTime(`${hour} : ${minute} : ${second}`);
      setDay(`${days[day]}, ${dayMonth}`);
      setHour(parseInt(hour));
    };

    const getWeather = async (lat, long) => {
      const params = { lat: lat, long: long }

      let forecast = await axios.get(`/weather`, { params })
      const zone = forecast.data.timezone;
      const timezone = zone.replace("/", ", ").replace("_", " ");
      setWeather(forecast.data.currently);
      setDaily(forecast.data.daily);
      setHourly(forecast.data.hourly);
      setZone(timezone);
      setTemp(fToC(forecast.data.currently.temperature));
    }

    getLocation();

    setInterval(() => {
      getTime();
    }, 1000);
  }, []);

  // Fahrenheit to Celsius
  const fToC = (temp) => {
    const celsius = Math.floor((temp - 32) / 1.8);
    return celsius;
  }

  // Render hourly forecast list
  const renderHourly = () => {
    if (hourly.data !== undefined) {
      let rendered = hourly.data.map((hour, i) => {
        return <Hourly hour={hour} fToC={fToC} key={i} />
      })
      return rendered;
    }
  }

  // Render daily forecast list
  const renderDaily = () => {
    if (daily.data !== undefined) {
      let rendered = daily.data.map((day, i) => {
        return <Daily day={day} fToC={fToC} key={i} i={i} />
      })
      return rendered;
    }
  }

  // Render Moon
  const renderMoon = () => {
    if (daily.data !== undefined) {
      let moon = <Moon moonPhase={daily.data[0].moonPhase} />
      return moon;
    }

  }

  const renderBackground = () => {
    let link = "default.jpg";

    switch (true) {
      // Clear morning
      case (hour >= 5 && hour <= 9 && weather.icon === "clear-day"): link = "clear-morning.jpg";
        break;

      // Partly cloudy morning
      case (hour >= 5 && hour <= 9 && weather.icon === "partly-cloudy-day"): link = "clear-morning.jpg";
        break;

      // Clear day
      case (hour >= 10 && hour <= 18 && weather.icon === "clear-day"): link = "clear-day.jpg";
        break;

      // Partly cloudy day
      case (hour >= 10 && hour <= 18 && weather.icon === "partly-cloudy-day"): link = "clear-day.jpg";
        break;

      // Rainy day
      case (hour >= 10 && hour <= 18 && weather.icon === "rain"): link = "rain-day.jpg";
        break;

      // Cloudy day / morning
      case (hour >= 5 && hour <= 18 && weather.icon === "cloudy"): link = "cloudy.jpg";
        break;

      // Rainy night
      case (hour >= 19 && hour <= 4 && weather.icon === "rain"): link = "rain-night.jpg";
        break;

      // Cloudy night
      case (hour >= 19 && hour <= 4 && weather.icon === "cloudy"): link = "cloudy-night.jpg";
        break;

      // Snowy day
      case (hour >= 5 && hour <= 18 && weather.icon === "snow"): link = "snow.jpg";
        break;

      // Sleet day
      case (hour >= 5 && hour <= 18 && weather.icon === "sleet"): link = "rain-day.jpg";
        break;

      // Sleet night
      case (hour >= 19 && hour <= 4 && weather.icon === "sleet"): link = "rain-night.jpg";
        break;

      // Default day
      case (hour >= 5 && hour <= 18): link = "clear-day.jpg";
        break;

      // Default night
      case (hour >= 19): link = "clear-night.jpg";
        break;
    }

    return <Background link={link} />
  }

  // Changes single digit number into double. ie: 1 => 01
  const setNum = (num) => {
    let number = num;
    switch (num) {
      case 0: number = "00";
        break;
      case 1: number = "01";
        break;
      case 2: number = "02";
        break;
      case 3: number = "03";
        break;
      case 4: number = "04";
        break;
      case 5: number = "05";
        break;
      case 6: number = "06";
        break;
      case 7: number = "07";
        break;
      case 8: number = "08";
        break;
      case 9: number = "09";
        break;
    }

    return number;
  }

  return (
    <>
      {!loaded && <Loader msg={msg} anim={init ? init : ""} />}

      <Suspense fallback="Loading...">
        {renderBackground()}
        <div className="interface">
          <Time time={time} />
          {renderMoon()}
          <Forecast weather={weather} zone={zone} temp={temp} />
          <Today day={day} daily={daily} fToC={fToC} />
          <div className="hourly-container">
            {renderHourly()}
          </div>
          <div className="daily-container">
            {renderDaily()}
          </div>
          <footer>
            <div>
              <a href="https://darksky.net/dev" rel="noopener noreferrer" target="_blank">Powered By Dark Sky API</a>
            </div>
            <div><a href="https://www.gautdel.com" rel="noopener noreferrer" target="_blank">GautDel</a></div>
          </footer>
        </div>
      </Suspense>
    </>
  );
}

export default App;
