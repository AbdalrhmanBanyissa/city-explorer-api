"use strict";

const homeHandler = (req, res) => {
  res.send("Hello from the other side");
}

module.exports = homeHandler;
