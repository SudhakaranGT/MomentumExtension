import React from 'react'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Form from './Components/Form/Form';
import { useState,useEffect } from 'react';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city,setCity] = useState("Chennai");
    //localStorage.clear()
    const name = localStorage.getItem('name');
    //console.log(name)

    useEffect(() => {
        const obj = JSON.stringify(import.meta.env);
        console.log(obj);

        let apiKey = JSON.parse(obj);
       
        console.log(apiKey)
        console.log(apiKey.VITE_REACT_APP_WEATHER_API)
        
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey.VITE_REACT_APP_WEATHER_API}&units=metric`;

        const fetchWeather = async () => {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWeather();
    }, [city]);

  return (
    <BrowserRouter>
      <Navbar weatherData={weatherData} city={city} setCity={setCity}/>
      <Routes>
          <Route path={'/'} element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;