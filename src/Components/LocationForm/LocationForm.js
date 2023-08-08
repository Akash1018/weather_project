import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LocationForm.css";

const LocationForm = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/weather/${location}`);
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // Call a function to fetch city based on latitude and longitude
          fetchCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchCityFromCoordinates = (latitude, longitude) => {
    // You can use a reverse geocoding service or API to get the city based on coordinates
    // For example, you might use the OpenStreetMap Nominatim API
    const apiUrl = `${process.env.REACT_APP_LOCATION}&lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const city = data.address.city || data.address.town || data.address.village;
        setLocation(city);
      })
      .catch(error => {
        console.error('Error fetching city:', error);
      });
  };

  return (
    <div className="container">
      <div className="container__header">
        <h2>Weather App</h2>
      </div>
      <div className="main__container">
        <form onSubmit={handleSubmit}>
          <input
            className="search__bar"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            required
          />
        </form>
        <div
          style={{
            display: "flex",
            color: "rgb(211, 211, 211)",
            margin: "12px",
          }}
        >
          <hr className="horizontal__line" />
          or <hr className="horizontal__line" />
        </div>
        <button className="location__btn" onClick={handleGetLocation}>Get Device Location</button>
      </div>
    </div>
  );
};

export default LocationForm;
