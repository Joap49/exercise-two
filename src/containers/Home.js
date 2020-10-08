import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from "../components/Header";
import WeatherImage from "../components/WeatherImage";


const weatherKey = 'bcfd0efd34f39086ca2622a1b67396a0';

function Home() {
const history = useHistory();

const [weatherData, setWeatherData] = useState(null);
const [city, setCity] = useState("Milan");

useEffect(() => {
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${"Milan"}&units=metric&appid=${weatherKey}`
  )
  .then(function (response) {
    const weather = response.data;
    setWeatherData(weather);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}, [city]);

useEffect(() => {
  const searchParams = history.location.search;
  const urlParams = new URLSearchParams(searchParams);
  const city = urlParams.get("city");
  
  if(city){
    setCity(city)
  }
}, [history]); // any time history updates, we will get new param



const { // list of objects
  cloudiness,
  cloudinessValue,
  currentTemp,
  highTemp,
  humidity,
  lowTemp, 
  weatherType, 
  windSpeed
} = useMemo(() => {
  let cloudiness = '';
  let cloudinessValue = 0;
  let currentTemp = '';
  let highTemp = '';
  let humidity = '';
  let lowTemp = '';
  let weatherType = '';
  let windSpeed = '';

  if(weatherData){
    //console.log("weatherData not null");
    cloudiness = `${weatherData.clouds.all}%`;
    cloudinessValue = weatherData.clouds.all;
    currentTemp = `${Math.round(weatherData.main.temp)}°`;
    highTemp = `${Math.round(weatherData.main.temp_max)}°`;
    humidity = `${weatherData.main.humidity}%`; 
    lowTemp = `${Math.round(weatherData.main.temp_min)}°`;
    weatherType = `${weatherData.weather[0].description}`;
    windSpeed = `${weatherData.wind.speed} km/h`;
   
  }
  
    return { 
      cloudiness,
      currentTemp,
      highTemp,
      humidity,
      lowTemp,
      weatherType,
      windSpeed,
    };
}, [weatherData]);

console.log("weatherData", weatherData);

return (
  <>
    <Header />
    <main className="Home">
      <h2>
        Weather in <span>{city}</span>
      </h2>
      <div className="WeatherInfo">
        <div
          className="WeatherInfo_Basic"
          style={{ backgroundColor: `rgba(0,0,0,${cloudinessValue / 200})` }}
        >
          <div className="WeatherInfo_Image">
            <WeatherImage weatherType={weatherType} />
          </div>
          <p className="WeatherInfo_Type">{weatherType} </p>
          <h3 className="Label">Current Temperature:</h3>
          <p className="WeatherInfo_Temperature">{currentTemp}</p>
        </div>
        <div className="WeatherInfo_Extra">
          <div className="WeatherInfo_Extra_Column">
            <h3 className="Label">High Temperature:</h3>
            <p className="WeatherInfo_Temperature_Small">{highTemp}</p>
            <h3 className="Label">Low Temperature:</h3>
            <p className="WeatherInfo_Temperature_Small">{lowTemp}</p>
          </div>
          <div className="WeatherInfo_Extra_Column">
            <h3 className="Label">Cloudiness: </h3>
            <p className="WeatherInfo_Temperature_Small">{cloudiness}</p>
            <h3 className="Label">Humidity:</h3>
            <p className="WeatherInfo_Temperature_Small">{humidity}</p>
            <h3 className="Label">Wind Speed:</h3>
            <p className="WeatherInfo_Temperature_Small"> {windSpeed}</p>
          </div>
        </div>
      </div>
    </main>
  </>
);
}

export default Home;
