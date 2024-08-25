import React, { useState, useEffect } from 'react';
import './forcast.css';
import { MdOutlineAccessTime } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { MdWindPower } from "react-icons/md";
import { FaLevelUpAlt } from "react-icons/fa";


const Forecast = ({ weatherdata,unitconversion }) => {
    const [forecastdata, setforecastdata] = useState([]);
    const todaydetails=weatherdata[0]
    
console.log(unitconversion,"is")
    useEffect(() => {
        // Step 1: Parse and group data by day
        const dailyData = weatherdata.reduce((acc, entry) => {
            const date = new Date(entry.dt * 1000).toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
            if (!acc[date]) {
                acc[date] = { temps: [], date: date };
            }
            acc[date].temps.push(entry.main.temp);
            return acc;
        }, {});

        // Step 2: Calculate average temperature for each day
        const forecast = Object.values(dailyData).map(day => {
            const avgTemp = day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length;
            return {
                date: day.date,
                avgTemp: avgTemp.toFixed(1) // Round to 1 decimal place
            };
        });

        setforecastdata(forecast);
       
    }, [weatherdata]); // Run when weatherdata changes


    //-------------------------------------
    const today = new Date().setHours(0, 0, 0, 0);

    // Filter the weather data for today only
    const todayWeatherData = weatherdata.filter(hourData => {
      const forecastDate = new Date(hourData.dt * 1000).setHours(0, 0, 0, 0);
      return forecastDate === today;
    });

    return (
        <div className='forecastcomponent'>
            <div className="detailsforecast">
                <div className="head">
                    <MdOutlineAccessTime className='icon' />
                    <p>Hourly Forecast</p>
                </div>
                <div className="hourlyforecast">
                {weatherdata.slice(0,4).map((hourData, index) => (
                <div key={index} className="daily">
                        
                        <p>{new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className='slow'>{hourData.main.temp} °{unitconversion === 'metric' ? 'F' : 'C'}</p>
                            <p className='slow'>{hourData.weather[0].description}</p>
                            <img 
                                src={`http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`} 
                                alt={hourData.weather[0].description} />
                            
                       
            </div>
      ))}
                </div>
            </div>
            <div className="detailsforecast">
                <div className="head">
                    <LuCalendarDays className='icon' />
                    <p>5 Days Forecast</p>
                </div>
                <div className="hourlyforecast">
                    {forecastdata.map((day, index) => (
                        <div key={index} className="daily">
                            <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                           
                            <p className='slow fortemp'>{day.avgTemp}°{unitconversion === 'metric' ? 'F' : 'C'}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="detailsforecast" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className="others">
                    <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><MdWindPower  style={{fontSize:'2rem'}} />  Wind</p>
                    <p className='slow'>Gust :{todaydetails?.wind?.gust} mph</p>
                    
                    <p className='slow'>speed :{todaydetails?.wind?.speed} mph</p>
                </div>
                <div className="others">
                    <p><FaLevelUpAlt />  Sea Level</p>
                    <p className='slow'>{todaydetails?.main?.sea_level}</p>
                    <p>ground Level</p>
                    <p className='slow'>{todaydetails?.main?.grnd_level}</p>
                    
                </div>
            </div>
        </div>
    );
}

export default Forecast;
