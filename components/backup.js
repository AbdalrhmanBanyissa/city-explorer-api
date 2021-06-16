const WEATHER_KEY = process.env.WEATHER_KEY;
const MOVIE_KEY = process.env.MOVIE_KEY;
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function getmovie(req,res){
    const searchQuery = req.query.cityname;
    const KEY = process.env.MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${searchQuery}`;
  
    axios.get(url).then(apiResult=>{
        const movieData=apiResult.data.results.map(item=>{
        return new Movie(item)
    })
    res.send(movieData)
    console.log(movieData)
  })
  .catch((err) => {
    res.status(500).send("movies not found in this city");
  });
  
  }
  
  app.get("/movie",getmovie)
  class Movie {
    constructor(item) {
      this.title= item.title
      this.overview = item.overview,
      this.total_votes= item.vote_count
      this.poster_path= `https://image.tmdb.org/t/p/w500${item.poster_path}`
      this.released_on= item.release_date
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  app.get('/weather', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (lat && lon) {
      const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_KEY}&lat=${lat}&lon=${lon}`
      axios.get(weatherUrl).then(response =>{
        const respData = response.data.data.map(weatherItem => new Weather(weatherItem));
       res.json(respData)
     }).catch(error=>{
       res.send(error.message );
     });
      console.log(weatherUrl);
    }
    else {
      res.send('please provide the proper lat and lon ');
    }
    
    });
class Weather {
constructor(item) {
  this.description = item.weather.description;
  this.date = item.valid_date;
  this.high = item.max_temp;
  this.low = item.low_temp;
}
}