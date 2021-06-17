"use strict";
const express = require("express");
const server = express();
// const weatherData = require("./data/weather.json");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const { query } = require("express");

const PORT = process.env.PORT;

server.use(cors());

server.get("/", (req, res) => {
  res.send("Hello from the other side");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*-----------------------------------------------------------------------------------------------------------*/
server.get("/weather", weahtrHandler);

function weahtrHandler(req, res) {
  const WEATHER_KEY = process.env.WEATHER_KEY;
  const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&city=${req.query.searchQuery}`;
  axios
    .get(weatherURL)
    .then((responce) => {
      let weatherData = responce.data.data.map((item) => new Weather(item));
      res.send(weatherData);
    })
    .catch((error) => {
      res.send("Error 404!" + error);
    });
}

class Weather {
  constructor(item) {
    this.description = item.weather.description;
    this.date = item.valid_date;
  }
}
/*-----------------------------------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*-----------------------------------------------------------------------------------------------------------*/

server.get("/movie", movieHandler);

function movieHandler(req, res) {
  const MOVIE_KEY = process.env.MOVIE_KEY;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.searchQuery}`;
  axios
    .get(movieUrl)
    .then((responce) => {
      const moviearray = responce.data.results.map((item) => {
        return new Movies(item);
      });

      res.send(moviearray);
    })
    .catch(error => {
      res.send("Error 404!"+error)
    });
}

class Movies {
  constructor(item) {
    this.original_title = item.original_title;
    this.poster_path = item.poster_path;
    this.release_date = item.release_date;
    this.vote_average = item.vote_average;
  }
}

/*-----------------------------------------------------------------------------------------------------------*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// server.get("/weather", (req, res) => {
//   let arr = weatherData.find((i)=>i.city_name.toLocaleLowerCase() === req.query.searchQuery.toLocaleLowerCase())
//   let weatherArray = arr.data.map((item) => new Forcast(item));
//   res.send(weatherArray);
// });

server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
