import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json'
import MapDisplay from './components/MapDisplay'

class App extends Component {
  state = {
    lat: 37.8044,
    lon: -122.2711,
    zoom: 13,
    all: locations
  }

  render = () => {
    return ( <div className="App">
        <div>
          <h1>Oakland, CA Coffee Shops</h1>
        </div>
          <MapDisplay
            lat={this.state.lat}
            lon={this.state.lon}
            zoom={this.state.zoom}
            locations={this.state.all}/>
        </div>
    );
  }
}

export default App;
