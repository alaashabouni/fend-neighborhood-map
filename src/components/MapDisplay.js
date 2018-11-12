import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = 'AIzaSyC2Dp774ylPFz0gGqxWlqI3ItZKEd1snlc';

class MapDisplay extends Component {
  state = {
    map: null;
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => {
    //save the map reference, and prepare makers
    this.setState({map});
  }

  render = () => {
    const style = {
      width: '100%',
      height: '100%'
    }
    const center = {
      lat: this.props.lat,
      lng: this.props.lon //why is there a differnce between lon and lng
    }

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick{this.closeInfoWindo}
      </Map>

      )
    }
  }

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)
