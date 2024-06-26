import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaCloudSun, FaCloud, FaSun, FaCloudRain } from 'react-icons/fa'; // Import additional weather icons as needed
import './Navbar.css';
import { PiHeadCircuit } from 'react-icons/pi';

const Navbar = ({ weatherData, city, setCity }) => {
    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleCityChangeSubmit = (e) => {
        e.preventDefault();
        setCity(e.target.value)
    }

    const getWeatherIcon = (weatherDescription) => {
        if (weatherDescription.includes('cloud')) {
            return <FaCloud className='weather-icon' />;
        } else if (weatherDescription.includes('sun') || weatherDescription.includes('clear')) {
            return <FaSun className='weather-icon' />;
        } else if (weatherDescription.includes("rain")){
            return <FaCloudRain className='weather-icon'/>
        } else {
            return <FaCloudSun className='weather-icon' />;
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <FiExternalLink className="navbar-icon" />
                        <span className="navbar-label">Links</span>
                    </li>
                    <li className="navbar-item">
                        <PiHeadCircuit className="navbar-icon" />
                        <span className="navbar-label">Focus</span>
                    </li>
                </ul>
            </div>
            <div className="navbar-right">
                <div className='location-tile'>
                    <div className='weather-icon-container'>
                        <FaCloudRain/>
                    </div>
                    <div className='data-con'>
                        <form onSubmit={handleCityChangeSubmit}>
                            <input
                                type="text"
                                className='location'
                                value={city}
                                onChange={handleCityChange}
                                placeholder="Enter city"
                            />
                        </form>
                        <span className="navbar-label weather-details">
                            {weatherData ? `${weatherData.main.temp}°C, ${weatherData.weather[0].description}` : 'Weather'}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
