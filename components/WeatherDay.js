
class Weather {
    constructor(item) {
      this.description = item.weather.description;
      this.date = item.valid_date;
    }
  }

module.exports = Weather;

