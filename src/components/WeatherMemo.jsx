import React, { useEffect, useState } from 'react';

export default function WeatherMemo() {
    const defaultCity = "Saskatoon";
    let [inputCityName, setInputCityName] = useState("");
    let [cityName, setCityName] = useState(defaultCity);
    const [temp, setTemp] = useState();
    useEffect(() => {
        getWeatherApi();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityName]);

    async function getWeatherApi() {
        const appid = process.env.REACT_APP_OPEN_WEATHER_MAP_APPID;
        const url = process.env.REACT_APP_OPEN_WEATHER_MAP_URL;
        console.log(url);
        try {
            const response = await fetch(`${url}?q=${cityName}&units=metric&appid=${appid}`)
            const infor = await response.json();
            if (infor.cod==="404"){
                setInputCityName("City not found !");
                setCityName(defaultCity)
            }
            else{
                setTemp(infor.main.temp)
                setInputCityName("");
            }
        }
        catch (err) {
            setTemp("?");
        }

    }

    const handleSelectCity = (event) => {
        setCityName(event.target.value);
    }

    const handleInputCity = (event) => {
        setInputCityName(event.target.value);
    }

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            setCityName(inputCityName);
        }
    }
    const handleMouseLeave = (event) => {
        if (inputCityName==="City not found !") {
            setInputCityName("");
        }
    }
    
    return (
        <div className="temperature">
            <div className="div-temp">
                <p>&#9729; <span>{temp}</span> °C</p>
            </div>
            <div className="dropdown">
                <button className="dropbtn">{cityName}</button>
                <div className="dropdown-content" >
                    <input type="text"
                        maxLength="20"
                        value={inputCityName}
                        placeholder="Enter city name"
                        onChange={handleInputCity}
                        onKeyPress={handleEnterKey}
                        onMouseLeave={handleMouseLeave}
                    />
                    <button value="Saskatoon" onClick={handleSelectCity}>Saskatoon</button>
                    <button value="Hanoi" onClick={handleSelectCity}>Hanoi</button>
                </div>
            </div>


        </div>
    )
}
