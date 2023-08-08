import React, { useEffect, useState } from "react";
import "./WeatherInfo.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { CiLocationOff } from "react-icons/ci";

const WeatherInfo = () => {
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${process.env.REACT_APP_WEATHER}?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sorry, location not found!!!");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [location]);
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="container__header">
        <button onClick={handleGoBack} className="return__btn">
          <AiOutlineArrowLeft
            style={{ marginTop: "1px" }}
            className="return__btn"
          />
        </button>
        <h2>Weather App</h2>
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error_container">
          <p> {error} </p>
          <CiLocationOff className="error_icon" />
        </div>
      )}

      {weatherData && (
        <div>
          <div className="container__main">
            <img
              className="weather__icon"
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
            <h1>{weatherData.main.temp}°C</h1>
            <p className="weather__details">
              {weatherData.weather[0].description}
            </p>
            <p>
              <MdOutlineLocationOn />
              {weatherData.name}, {weatherData.sys.country}
            </p>
          </div>
          <div className="container__bottom">
            <div className="right">
              <FaTemperatureHigh className="bottom_icons" />
              <div>
                {weatherData.main.feels_like}°C
                <p className="feelslike_value">Feels like</p>
              </div>
            </div>
            <div className="left">
              <BsDropletHalf className="bottom_icons" />
              <div>
                {weatherData.main.humidity}%
                <p className="humidity_value">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
