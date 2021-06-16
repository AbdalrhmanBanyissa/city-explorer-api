'use strict';
const express = require("express"); 
const server = express(); 
const weatherData = require("./data/weather.json");
require("dotenv").config();
const cors = require("cors");


const PORT = process.env.PORT;



server.use(cors());

server.get("/", (req, res) => {
  res.send('Hello from the other side');
});

class Forcast {
  constructor(item) {
    this.description = item.weather.description;
    this.date = item.valid_date
    
  }
}

server.get("/weather", (req, res) => {
  let arr = weatherData.find((i)=>i.city_name.toLocaleLowerCase() === req.query.searchQuery.toLocaleLowerCase())
  let weatherArray = arr.data.map((item) => new Forcast(item));
  res.send(weatherArray);
});


server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
