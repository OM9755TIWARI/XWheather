import React, {useState} from "react";
import axios from "axios";
import "./Wheather.css";

const WheatherCard = ({title, data}) => {
    return (
        <div className="weather-card">
            <h3>{title}</h3>
            <p>{data}</p>
        </div>
    );
}

export default function Wheather(){
    const [city, setCity] = useState("");
    const [wheatherData, setWheatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchWheather = async() => {

        let API_KEY = "4c8b5b249bc147cda3b132817250709";

        if(!city) return;
        setLoading(true);
        setError("");

        try{
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
            setWheatherData(response.data);
        }catch(err){
            setError("Failed to fetch wheather data");
            alert("Failed to fetch wheather data")   
        }finally{
            setLoading(false);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWheather();
    }


    return(
        <div className="weather-display">
            <h1>XWheatherApp</h1>
            <form onSubmit={handleSearch} className="search-bar">
                <input 
                   type="text" 
                   value = {city}
                   onChange={(e) => setCity(e.target.value)}
                   placeholder="Enter city name"
                />
                <button type = "submit">Search</button>
            </form>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {wheatherData && (
                <div className="weather-cards">
                    <WheatherCard 
                        title="Temperature"
                        data={`${wheatherData.current.temp_c}°C`}
                    />
                    <WheatherCard
                        title="Humidity"
                        data={`${wheatherData.current.humidity}%`}
                    />
                    <WheatherCard
                        title="Condition"
                        data={wheatherData.current.condition.text}
                    />                    
                    <WheatherCard
                        title="Wind Speed"
                        data={`${wheatherData.current.wind_kph} kph`}
                    />
                </div>
            )

            }
        </div>
    )

}
