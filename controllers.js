const Showtimes = require('showtimes');

module.exports = {
  getClosestTheaters: function(location, cb) {
    new Showtimes({latitude: 40.750642299999996, longitude: -73.9765381}, {})
    .getMovies( (error, theaters) => {
      if (error) console.error(error)
      console.log(theaters)
      cb(theaters);
    })
  }
}