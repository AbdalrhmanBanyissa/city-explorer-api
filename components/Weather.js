"use strict";

const axios = require("axios");
const Weather = require("./WeatherDay")

const weahtrHandler = (req, res) => {
    const WEATHER_KEY = process.env.WEATHER_KEY;
    const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&city=${req.query.searchQuery}`;
    axios
      .get(weatherURL)
      .then((responce) => {
        let weatherData = responce.data.data.map((item) => new Weather(item));
        res.send(weatherData);
      })
      .catch((error) => {
        res.send("Error 404! " + error);
      });
  }
  
  module.exports = weahtrHandler;
  