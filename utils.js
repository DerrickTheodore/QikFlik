const axios = require('axios');

module.exports = {
  cinemaLocation: function(showtimes, lat, lng, radius, movie, cb) {
    return axios({
      method: 'get',
      url: `https://api.internationalshowtimes.com/v4/cinemas`,
      headers: {
                'Content-Type': 'application/json', 
                'X-Api-Key': 'Mx8YewmYK8QdQeyh0Y4EQSG2STZCboB0',
                'Accept-Language': 'de'
              },
      params: {
        'location': `${lat},${lng}`,
        'distance': `${radius}`
      }         
    })
    .then( (results) => {
      let filteredShowtimes = {};
      let cinemas = results.data.cinemas;
      const convertTime = (s) => {
        return new Date(s)
        .toLocaleTimeString({locales: "hc"}, {hour12: true, timeZone: "America/New_York"})
      }

      for(let i=0;i<showtimes.length;i++) {

        var filteredShowtime = {};
        for(let j=0;j<cinemas.length;j++) {
          if(showtimes[i].cinema_id === cinemas[j].id && !filteredShowtimes[`${showtimes[i].cinema_id}`] && (convertTime(showtimes[i].start_at) > convertTime(new Date()))) {
            filteredShowtime.cinema_id = showtimes[i].cinema_id;
            filteredShowtime.theater = cinemas[j].name;
            filteredShowtime.title = movie;
            filteredShowtime.poster = showtimes[i].poster_image_thumbnail;
            filteredShowtime.movie_id = showtimes[i].movie_id;
            filteredShowtime.start_at = convertTime(showtimes[i].start_at);
            filteredShowtime.location = {lat: cinemas[j].location.lat, lng: cinemas[j].location.lon};
            filteredShowtimes[`${showtimes[i].cinema_id}`] = filteredShowtime;
          }
        }
      }
      cb(Object.values(filteredShowtimes));
    })
    .catch(err => console.error(err));
  }
}