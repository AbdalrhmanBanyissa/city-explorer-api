"use strict";

const axios = require("axios");
const Weather = require("./WeatherDay")
let weatherCacheObj = {};

const weahtrHandler = (req, res) => {
    const WEATHER_KEY = process.env.WEATHER_KEY;
    let city = req.query.searchQuery;
    if(weatherCacheObj[city] !== undefined){
      console.log("get the weather data from the cache object");
      res.send(weatherCacheObj[city]);
    } else{
    const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&city=${city}`;
    axios
      .get(weatherURL)
      .then((responce) => {
        let weatherData = responce.data.data.map((item) => new Weather(item));
        console.log("get the weather data from the api");
        weatherCacheObj[city] = weatherData;
        res.send(weatherData);
      })
      .catch((error) => {
        res.send("Error 404! " + error);
      });
    }
  }
  
  module.exports = weahtrHandler;
  