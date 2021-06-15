const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
const weatherData = require("./data/weather.json");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors()); // after you initialize your express app instance
// a server endpoint

app.get("/weather", (req, res) => {
  let weatherArray = weatherData.data.map((item) => new Forcast(item));
  res.send(weatherArray);
});

class Forcast {
  constructor(item) {
    this.date = item.valid_date;
    this.weather = item.weather.description;
  }
}

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
