import React, { useEffect, useState } from 'react';
import './search.css';
import { SlLocationPin } from "react-icons/sl";
import axios from 'axios';
import { WiHumidity } from "react-icons/wi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiThermometerHot } from "react-icons/pi";
import { FaEye } from "react-icons/fa";




    



const API_key=import.meta.env.VITE_KEY;

const Search = ({weathedataupdate,unitconversion}) => {
    const [time, setTime] = useState(new Date());
    const [city, setCityName] = useState('delhi');
    const [data, setData] = useState(null);  // Initialize as null
    const [todaytemp, setTodayTemp] = useState(null);  // Initialize as null
    const [unit, setUnit] = useState('metric');  // State for unit ('metric' for Celsius, 'imperial' for Fahrenheit)

    

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=${unit}`);
                
                setData(res.data.city);
                weathedataupdate(res.data.list.slice(0,29))
                setTodayTemp(res.data.list[0]);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAPI();
    }, [city, unit]);  // Add unit as a dependency to refetch data when it changes

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = time.toLocaleTimeString();

    // Function to handle button click and toggle between Celsius and Fahrenheit
    const handleUnitToggle = () => {
        setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
        unitconversion(unit)
    };

    return (
        <div className='SearchContainer'>
            <div className="usersearchInput"> 
                <SlLocationPin className='icon'/>
                <input 
                    type="text" 
                    id='searchlocation' 
                    onChange={e => setCityName(e.target.value)} 
                />
                <button className='btn' onClick={handleUnitToggle}>
                    {unit === 'metric' ? '°C' : '°F'}
                </button>
            </div>

            <div className="displayBox">
            {todaytemp && data && todaytemp.weather && todaytemp.main ? (  // Additional checks
                    <div className="Todaydata">
                        <p className='temp'>
                            <img 
                                src={`https://openweathermap.org/img/wn/${todaytemp.weather[0].icon}@2x.png`} 
                                alt="Weather icon" 
                            />
                            {parseInt(todaytemp.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                        </p>
                        <p>{data.name}</p>
                        <p className='status slow'>{todaytemp.weather[0].main}</p>
                        <p className='descp slow'>there will be {todaytemp.weather[0].description}</p>
                        <p>{formatTime}</p>
                    </div>
                ) : (
                    <p>Loading...</p>  // Show a loading message while data is being fetched
                )}
                {todaytemp &&data ?(
                    <div className="weatherdetails">
                    <div className="info">
                        <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><WiHumidity style={{fontSize:'20px'}} /> Humidity</p>
                        <p className='slow'>{(todaytemp.main.humidity)} g/m³</p>
                    </div>
                    <div className="info">
                    <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><IoSpeedometerOutline /> Pressure</p>
                    <p className='slow'>{(todaytemp.main.pressure)} N/m2</p>
                    </div>
                    <div className="info">
                        <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}> <FaEye />Visibility</p>
                        <p className='slow'>{(todaytemp.visibility)} m</p>
                    </div>
                    <div className="info">
                    <p style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><PiThermometerHot /> Feels Like</p>
                    <p className='slow'> {(todaytemp.main.feels_like)} °{unit === 'metric' ? 'C' : 'F'}</p>
                    </div>
            </div>
                ):(
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Search;
