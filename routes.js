var express = require('express');
const router = express.Router();
const axios = require('axios');
const util = require('./utils.js');

router.get('/movie/:query', (req, res) => {
  let query = req.params.query;
  axios({
    method: 'get',
    url: `https://api.internationalshowtimes.com/v4/movies`,
    headers: {
              'Content-Type': 'application/json', 
              'X-Api-Key': 'Mx8YewmYK8QdQeyh0Y4EQSG2STZCboB0',
              'Accept-Language': 'de'
             },
    params: {
      'search_query': `${query}`,
      'search_field': 'title',
    }         
  })
  .then((results) => {
    res.json(results.data)
  })
  .catch(err => console.error(err))
})

router.get('/showtimes/:id/:lat/:lng/:radius/:movie', (req, res) => {
  let id = req.params.id;
  let lat = req.params.lat;
  let lng = req.params.lng;
  let radius = req.params.radius;
  let movie = req.params.movie;

  axios({
    method: 'get',
    url: `https://api.internationalshowtimes.com/v4/showtimes`,
    headers: {
              'Content-Type': 'application/json', 
              'X-Api-Key': 'Mx8YewmYK8QdQeyh0Y4EQSG2STZCboB0',
              'Accept-Language': 'de'
             },
    params: {
      'movie_id': `${id}`,
      'location': `${lat},${lng}`,
      'distance': `${radius}`,
      'time_from': `${new Date()}`
    }         
  })
  .then((results) => {
    let showtimes = results.data.showtimes;
    util.cinemaLocation(showtimes, lat, lng, radius, movie, (showtimesWithLoc) => {
      res.json(showtimesWithLoc);
    })
  })
  .catch(err => console.error(err));
})

module.exports = router;