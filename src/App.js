import React, {useEffect,useState} from "react";
import './App.css';
import axios from 'axios';


 

function App() {
const [change,setchange] =  useState (true);
const [climate,changeclimate] = useState({})
const [temperature,assigntemperature] =useState(0)
  const success = pos => {
    console.log(pos.coords.latitude);
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=eb6f2d9e00b06c30f2d865f3e68d9f08`)
    .then(res =>  {
      console.log(res.data);
      changeclimate(res.data); 
      assigntemperature((res.data.main?.temp-(273.15)).toFixed(2));

    } 
  )
  }
  const convert = () =>{
    if(change){
      const far = (climate.main?.temp-273.15)*(9/5) + 32;
      assigntemperature(far.toFixed(2))
      setchange(false)

    }else{
      const degrees = (climate.main?.temp)-(273.15)
      assigntemperature(degrees.toFixed(2))
      setchange(true)
    }
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success);
},[]);

  return (
    <div className="App">
       
      <span className="humidity">{climate.main?.humidity}</span>
      <h1 className="temp_max">{climate.main?.temp_max}</h1>
      <p className="name">{climate.name}</p>
      <span className="climate">{climate.sys?.country}</span>
      <span className="temperature">{temperature}</span>
      <div className="button">
        <button onClick={convert}>converti</button>
      </div>
      <img className='icon' src={climate.weather?.[0].icon? `http://openweathermap.org/img/wn/${climate.weather?.[0].icon}@2x.png` : ""} alt="" />
    </div>
  );
}

export default App;