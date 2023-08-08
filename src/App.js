import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherInfo from "./Components/WeatherInfo/WeatherInfo";
import LocationForm from "./Components/LocationForm/LocationForm";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationForm />} />
        <Route path="/weather/:location" element={<WeatherInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
