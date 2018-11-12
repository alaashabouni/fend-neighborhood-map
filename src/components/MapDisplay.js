import React, {Component} from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import locations from '../data/locations.json';

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
      return data.response.venues
      .filter(item => intem.name.includes(props.name) || props.nameincludes(item.name));
    }

    onMarkerClick = (props, marker, e) => {
        // Close any open windows
        this.closeInfoWindow();

        // Show marker info
        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props});
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

                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay)
