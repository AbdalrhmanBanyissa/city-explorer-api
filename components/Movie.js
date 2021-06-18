
  class Movies {
    constructor(item) {
      this.title = item.title;
      this.overview = item.overview;
      this.vote_average = item.vote_average;
      this.vote_count = item.vote_count;
      this.poster_path = item.poster_path;
      this.popularity = item.popularity;
      this.release_date = item.release_date;
    }
  }
  
  module.exports = Movies;
  