
import React,{useState} from "react";
import {makeStyles,TextField, Button,Grid} from "@material-ui/core";
import axios from "axios";
import Image from "./image/image.jpg";

const useStyles = makeStyles({

    h1: {
        fontFamily: 'Montserrat',
        fontWeight: 'bolder',
        fontSize: '2.25rem',
        position: 'relative',
        right: '2rem'

    },

    base: {
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center' ,
        margin: '10rem auto'   
    },

    btn: {
        position: "relative",
        top: "5rem",
        right: '17.25rem',
        textAlign: 'center'
    },

    textfield: {
        position: 'relative',
        top: '2rem',
        marginLeft: '6rem',
        width: '25rem'
    },

    text: {
        fontFamily: 'Montserrat',
        fontWeight: 'bolder',
        textAlign: 'center',
        marginRight: '3rem'
    }

});

const Weather = () => {

    const [city, setCity] = useState('');
    const [locationDetails, setLocationDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({})

    const classes = useStyles();

    const key = process.env.REACT_APP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        return axios.get(url).then(res => {
            setLocationDetails(res.data)
            setWeather(res.data.main)
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div>
        <div className={classes.base}>   
            
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h1 className={classes.h1}>Weather Forecast</h1>
                <TextField onChange={(e) => {setCity(e.target.value)}} className={classes.textfield} placeholder="Search a city" name="city" value={city}/>
                <Button type="submit" className={classes.btn} variant="outlined" color="primary" size='medium'>Get Weather</Button>
            </form>      
            
        </div>

    {Object.keys(weather).length === 0 && weather.constructor === Object ? null : <h2 className={classes.text}>It's {weather['temp'].toString().substring(0,2)}° C in {locationDetails.name}</h2>}
        </div>
    )
}

export default Weather;