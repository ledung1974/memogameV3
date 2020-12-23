import React, { useEffect, useState } from 'react';

export default function WeatherMemo() {
    const [cityName, setCityName] = useState("Saskatoon");
    const [temp, setTemp] = useState();
    useEffect(() => {
        getWeatherApi();

    }, [cityName]);

    async function getWeatherApi() {
        const appid = "ed52e6534d6e61e9cc976b588820c835";
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${appid}`)
            const infor = await response.json();
            setTemp(infor.main.temp);
        }
        catch (err){
            setTemp("?");
        }
            
    }
    
    const handleSelectCity = (event) => {
        setCityName(event.target.value);
    }
    
    return (
        <div className="temperature">
            <div className="div-temp">
                <p>&#9729; <span>{temp}</span> °C</p>
            </div>
            <div className="dropdown">
                <button className="dropbtn">{cityName}</button>
                <div class="dropdown-content">
                    <button value="Saskatoon" onClick={handleSelectCity}>Saskatoon</button>
                    <button value="Edmonton" onClick={handleSelectCity}>Edmonton</button>
                    <button value="Calgary" onClick={handleSelectCity}>Calgary</button>
                    <button value="Hanoi" onClick={handleSelectCity}>Hanoi</button>
                </div>
            </div>
            

        </div>
    )
}
