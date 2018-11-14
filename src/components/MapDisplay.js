import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import MapNotDisplayed from './MapNotDisplayed';

const MAP_KEY = "AIzaSyBi7tDyVzA7Ncf1kk-wCYxJrqDXd0qHUNs";
const FS_CLIENT = "430UINZRHZVRKNN3SUYH3TCKBNBFJTVJ2CDOCUGRETGYHWHJ";
const FS_SECRET = "MEL51JWGKO054COM0GQBLQ2RK1DJPNLUIPK5A4GH1CZCAWO2";
const FS_VERSION = "20180323";

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

    componentWillReceiveProps = (props) => {
      //only one initial marker drop
      this.setState({firstDrop: false});

      //change number of markers on map based on number of locations
      if(this.state.markers.length !== props.locations.length) {
        this.closeInfoWindow();
        this.updateMarkers(props.locations);
        this.setState({activeMarker: null});
        return;
      }
      //close info window for no active marker
      if (!props.selectedIndex || (this.state.activeMarker &&
      (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
        this.closeInfoWindow();
      }

      //check for selected index
      if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
        return;
      };

      this.onMarkerClick(this.state.markerProps[props.selectedIndex], this.state.markers[props.selectedIndex]);
    }

    mapReady = (props, map) => {
        // prep location markers
        this.setState({map});
        this.updateMarkers(this.props.locations);
    }

    closeInfoWindow = () => {
        // Disable any active marker animation
        this.state.activeMarker && this
            .state
            .activeMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }

    getFourSquareInfo = (props, data) => {
      if (data.response != undefined? data.response:"No FourSquare data") {
      return data
           .response
           .venues
           .filter(item => item.name.includes(props.name) || props.name.includes(item.name));};
    }

    onMarkerClick = (props, marker, e) => {
       // Close any info window already open
       this.closeInfoWindow();

       // Get FS data coffeeshop
       let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
       let headers = new Headers();
       let request = new Request(url, {
           method: 'GET',
           headers
       });

       // Create props for the active marker
       let activeMarkerProps;
       fetch(request)
           .then(response => response.json())
           .then(result => {
               // Get just the business reference for the coffeeshop we want from FS
               let coffeeshop = this.getFourSquareInfo(props, result);
               activeMarkerProps = {
                   ...props,
                   foursquare: coffeeshop[0]
               };

               // Get the list of images for the coffeeshop if there is FourSquare data
               // Will finish setting state with the data we do have available
               if (activeMarkerProps.foursquare) {
                   let url = `https://api.foursquare.com/v2/venues/${coffeeshop[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
                   fetch(url)
                       .then(response => response.json())
                       .then(result => {
                           activeMarkerProps = {
                               ...activeMarkerProps,
                               images: result.response.photos
                           };
                           if (this.state.activeMarker)
                               this.state.activeMarker.setAnimation(null);
                           marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                           this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                       })
                       .catch(error =>  {
                         alert("Foursquare API error. " + error)
                       })
               } else {
                   marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                   this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
               }
           })
           .catch(error =>  {
             alert("Foursquare API error. " + error)
           })
   }

    updateMarkers = (locations) => {
        // bail out if all locations have been filtered
        if (!locations)
            return;

        // remove any existing markers
        this
            .state
            .markers
            .forEach(marker => marker.setMap(null));

        //Go through each locations and creat marker props. Add markers.
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
            let marker = new this.props.google.maps.Marker({
                position: location.pos,
                map: this.state.map,
                animation
            });
            marker.addListener('click', () => {
                this.onMarkerClick(mProps, marker, null);
            });
            return marker;
        })

        this.setState({markers, markerProps});
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
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
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url
                            ? (
                                <a href={amProps.url}>See website</a>
                            )
                            : ""}
                        {amProps && amProps.images
                            ? (
                                <div><img
                                    alt={amProps.name + " food picture"}
                                    src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/>
                                    <p>Image from Foursquare</p>
                                </div>
                            )
                            : ""
                        }
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY, LoadingContainer: MapNotDisplayed})(MapDisplay)
