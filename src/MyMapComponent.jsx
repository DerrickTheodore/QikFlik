import React from 'react';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from "react-google-maps";
import keys from '../credentials';
const CaretUp = require("react-icons/lib/fa/caret-up");




const MyMapComponent = compose(
  withStateHandlers(() => ({
    isOpen: false,
    index: null
  }), {
    onToggleOpen: ({ isOpen, index }) => (clickedIndex) => ({
      isOpen: !isOpen,
      index: clickedIndex
    }),
    onClickDest: ({ destination }) => (location) => ({
      destination: location
    })
  }),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keys.API}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `75%`, margin: `auto`}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  if(props.defaultCenter) {
    props.delayedShowMarker()
    return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={props.defaultCenter}
    >
      {
        props.isMarkerShown && props.markersWithInfo.map((markerWithInfo, index) => <Marker 
        onClick={() => {props.onToggleOpen(index)}}
        icon={{url: "https://cdn3.iconfinder.com/data/icons/glypho-movie-and-video/64/film-camera-alt-512.png", scaledSize: new google.maps.Size(30, 30, 'pixel', 'pixel')}}
        key={index}
        id={index} 
        position={markerWithInfo.location}>
        {(props.isOpen && (props.index === index)) && <InfoWindow options={{content: "Helllooo"}} onCloseClick={props.onToggleOpen}><CaretUp /></InfoWindow>}
      </Marker>)}
    </GoogleMap>
    )
  } else {
  return ( <h1>Centering on current location..</h1> )
  }
})

export default MyMapComponent;