"use strict";
/*********************************************************/
const express = require("express");
const server = express();
const weahtrHandler = require("./components/Weather")
const movieHandler = require("./components/Movies")
const homeHandler = require("./components/Home")

require("dotenv").config();
const cors = require("cors");
server.use(cors());

const { query } = require("express");

const PORT = process.env.PORT;
/*********************************************************/

server.get("/", homeHandler);
server.get("/weather", weahtrHandler);
server.get("/movie", movieHandler);

server.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});

/*********************************************************/
