"use strict";

const axios = require("axios");
const Movies = require("./Movie");
let moviesCacheObj = {};

const movieHandler = (req, res) => {
  const MOVIE_KEY = process.env.MOVIE_KEY;
  const city = req.query.searchQuery;

  if (moviesCacheObj[city] !== undefined) {
    console.log("get the movies data from the cache object");
    res.send(moviesCacheObj[city]); // get the data from the cache object
  } else {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${city}`;
    axios
      .get(movieUrl)
      .then((responce) => {
        const moviearray = responce.data.results.map(
          (movieItem) => new Movies(movieItem)
        );
        moviesCacheObj[city] = moviearray; // save the data in the cache object
        console.log("get the movies data from the api");
        res.send(moviearray);
      })
      .catch((error) => {
        res.send("Error 404! " + error);
      });
  }
};

module.exports = movieHandler;
