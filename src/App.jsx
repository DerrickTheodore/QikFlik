import React from 'react';
import MyFancyComponent from './MyFancyComponent.jsx';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import exampleData from '../exampleData';




class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: '',
      defaultCenter: null,
      currentMovie: {},
      markersWithInfo: [],
    }
  }

  componentWillMount() {
    this.geoLocate();
  }

  geoLocate() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({defaultCenter: {lat: position.coords.latitude, lng: position.coords.longitude}});
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleEnterPress(e) {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8080/search/movie/${this.state.value}`)
    .then((results) => {
      let id, lat, lng, radius, time;

      id = results.data.movies[0].id;
      lat = this.state.defaultCenter.lat;
      lng = this.state.defaultCenter.lng;
      radius = 50;

      this.setState({currentMovie: results.data.movies[0]})
      let movie = this.state.currentMovie.title;
      axios.get(`http://127.0.0.1:8080/search/showtimes/${id}/${lat}/${lng}/${radius}/${movie}`)
      .then( (results) => {
        this.setState({ markersWithInfo: results.data});
      })
      .catch(err => console.error(err))
    })
    this.setState({value: ''});
  }

  render(){
    return (
    <div>
      <h1>QikFlik?</h1>
      <MyFancyComponent currentMovie={this.state.currentMovie} markersWithInfo={this.state.markersWithInfo} defaultCenter={this.state.defaultCenter}/>
      <br/>
      <form 
        action="" 
        onSubmit={this.handleEnterPress.bind(this)}
      >
      <FormGroup
        controlId="formBasicText"
        bsSize="small"
      >
        <ControlLabel style={{textAlign: "center"}} >What movie do you want to see tonight?</ControlLabel>
        <FormControl
          type="text"
          bsSize="small"
          value={this.state.value}
          placeholder="Enter movie here..."
          onChange={this.handleChange.bind(this)}
        />
        <FormControl.Feedback />
      </FormGroup>
      </form>
    </div>
    )
  }
}

export default App;