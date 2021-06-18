"use strict";

const axios = require("axios");
const Movies = require("./Movie");

const movieHandler = (req, res) => {
    const MOVIE_KEY = process.env.MOVIE_KEY;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&query=${req.query.searchQuery}`;
    axios
      .get(movieUrl)
      .then((responce) => {
        const moviearray = responce.data.results.map(movieItem => new Movies (movieItem));
        res.send(moviearray);
      })
      .catch(error => {
        res.send("Error 404! "+error)
      });
  }

  
  module.exports = movieHandler;
