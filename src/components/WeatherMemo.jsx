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
        catch (err) {
            setTemp("?");
        }

    }

    const handleSelectCity = (event) => {
        setCityName(event.target.value);
    }

    const handleInputCity = (event) => {
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
                    <input type="text"
                        maxLength="20"
                        placeholder="City name"
                        onChange={handleInputCity}
                    />
                    <button value="Saskatoon" onClick={handleSelectCity}>Saskatoon</button>
                    <button value="Hanoi" onClick={handleSelectCity}>Hanoi</button>
                    <button value="Tokyo" onClick={handleSelectCity}>Tokyo</button>
                    <button value="Vancouver" onClick={handleSelectCity}>Vancouver</button>
                    <button value="Toronto" onClick={handleSelectCity}>Toronto</button>
                </div>
            </div>


        </div>
    )
}
