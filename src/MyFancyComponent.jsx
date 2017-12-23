import React from 'react';
import MyMapComponent from './MyMapComponent.jsx';
import exampleData from '../exampleData';


class MyFancyComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markersWithInfo: exampleData.data,
      isMarkerShown: false,
      defaultCenter: null,
    }
  }

  componentWillMount() {
    this.geoLocate()
  }

  shouldComponentUpdate(nextState, nextProps) {
    if(this.state.defaultCenter !== nextState) {
      return true;
    }
    return false;
  }

  geoLocate() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({defaultCenter: {lat: position.coords.latitude, lng: position.coords.longitude}});
    })
  }

  delayedShowMarker(){
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 1000)
  }

  handleMarkerClick(start, end) {
    // const DirectionsService = new google.maps.DirectionsService();
    // DirectionsService.route({
    //   origin: new google.maps.LatLng(start),
    //   destination: new google.maps.LatLng(end),
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  }

  render() {
    
    return (
      <MyMapComponent
        delayedShowMarker={this.delayedShowMarker.bind(this)}
        defaultCenter={this.state.defaultCenter}
        markersWithInfo={this.state.markersWithInfo}
        infoWindows={this.state.infoWindows}
        isMarkerShown={this.state.isMarkerShown}
        handleMarkerClick={this.handleMarkerClick.bind(this)}
      />
    )
  }
}

export default MyFancyComponent;