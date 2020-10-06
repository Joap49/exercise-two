import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Header from "../components/Header";

const weatherKey = 'bcfd0efd34f39086ca2622a1b67396a0';

function Home() {

const history = useHistory();
console.log("history", history);
const [weatherData, setWeatherData] = useState(null);
const [city, setCity] = useState("Milan");

useEffect(() => {
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${"Milan"}&appid=${weatherKey}`
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
  currentTemp,
  highTemp,
  humidity,
  lowTemp, 
  weatherType, 
  windSpeed
} = useMemo(() => {
  let cloudiness = '';
  let currentTemp = '';
  let highTemp = '';
  let humidity = '';
  let lowTemp = '';
  let weatherType = '';
  let windSpeed = '';

  if(weatherData){
    console.log("weatherData not null");
    cloudiness = `${weatherData.clouds.all}%`
    currentTemp = `${weatherData.main.temp}`
    highTemp = `${weatherData.main.temp_max}`
    humidity = `${weatherData.main.humidity}%`; // instead of adding string
    lowTemp = `${weatherData.main.temp_min}` 
    weatherType = `${weatherData.weather[0].description}`
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
        <h2>Weather in { city }</h2>
          <div className="WeatherInfo">
            <p>Weather Type: {weatherType}</p>
            <p>Current Temperature: {currentTemp}</p>
            <p>High Temperature: {highTemp}</p>
            <p>Low Termperature: {lowTemp}</p>
            <p>Cloudiness: {cloudiness}</p>
            <p>Humidity: {humidity}</p>
            <p>Wind Speed: {windSpeed}</p>
          </div>
      </main>
    </>
  );

}

export default Home;
