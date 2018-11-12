import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react'

const MAP_KEY = "AIzaSyBIBjhLpE3-Z3Q8Pvz1m8z0uaYhl4SqBa4";

class MapDisplay extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  };

  componentDidMount = () => {
  }

  mapReady = (props, map) => {
    //save the map reference, and prepare makers
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  closeInfoWindow = () => {
    this.state.activeMarker && this
    .state
    .activeMarker
    .setAnimation(null);
    this.setState({showingInfoWindow: false, activeMarker:null, activeMarkerProps: null});
  }

  onMarkerClick = (props, marker, e) => {
    //closes any currently open windows
    this.closeInfoWindow ();
    //show info for marker just clicked
    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
  }

  updateMarkers = (locations) => {
    //if all locations are filtered, or array is not valid
    if (!locations)
      return;

    //remove existing markers from the maps
    this.state.markers.forEach(marker => marker.setMap(null));

    //iterate over locations to create marker properties
    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);

      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker ({
        position: location.pos,
        map: this.state.map,
        animation
      });
      marker.addListener('click', () =>{
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    });
    this.setState({markers, markerProps});
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
    let amProps = this.state.activeMarkerProps;

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.closeInfoWindow}>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            <h3>(amProps && amProps.name)</h3>
            {amProps && amProps.url
              ? (
                <a href={amProps.url}>Visit Website</a>
              )
              : ""
            }
          </div>
        </InfoWindow>
      </Map>

      )
    }
  }

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)
