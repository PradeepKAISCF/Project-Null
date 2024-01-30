import React, { useState, useEffect } from 'react';
import axios from 'axios';

import sun from '../assets/sun.png'
import cloudy from '../assets/cloudy.png'
import rain from '../assets/rain.png'
import snowy from '../assets/snowy.png'

const Whether = () => {

  const api = {
    key: "1a8f83609ffae7c9525c26725668a601",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  
  const [weatherData, setWeatherData] = useState(null);
  const [search,setsearch] = useState('Boston')

  useEffect(() => {
    const getLocation = async () => {
      try {
        const location = await axios.get('https://ipapi.co/json');
        setsearch(location.data.city);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    const getWeather = async () => {
      try {
        const response = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`);
        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    getLocation();
    getWeather();
  }, [search]);

  console.log(weatherData)

  return (
    <div style={{marginTop:'60px',backgroundColor:'azure'}}>
      <div className="weather-container">
      {weatherData && (
        <>
          <h2 style={{marginLeft:'15px'}}>Weather Reported in {weatherData.name}</h2>
          <div style={{display:'flex', justifyContent:"space-between"}}>
            <div>
              <p style={{marginLeft:'25px'}}>Temperature: {weatherData.main.temp}°C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Humidity: {weatherData.main.humidity}</p>
              <p style={{marginLeft:'25px'}}>Weather: {weatherData.weather[0].description} &nbsp;&nbsp;&nbsp;&nbsp;Pressue: {weatherData.main.pressure}</p>
            </div>
            <div>
              {
                weatherData.main.temp>35 ? <img src={sun} alt="" style={{height:'100px', marginRight:'25px'}}/>:
                weatherData.main.temp>25 ? <img src={cloudy} alt="" style={{height:'100px', marginRight:'25px'}}/>:
                weatherData.main.temp>15 ? <img src={rain} alt="" style={{height:'100px', marginRight:'25px'}}/>:
                <img src={snowy} alt="" style={{height:'100px', marginRight:'25px'}}/>
              }
            </div>
          </div>
          {/* You can include more weather information here */}
        </>
      )}
    </div>
    </div>
  )
}

export default Whether

