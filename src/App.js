import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './components/MapDisplay';
import ListMenu from './components/ListMenu';

class App extends Component {
  state = {
    lat: 37.8044,
    lon: -122.2711,
    zoom: 14,
    all: locations
  }

  styles = {
    menuButton: {
      marginLeft: 10,
      merginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  toggleList = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render = () => {
    return ( <div className="App">
        <div>
          <button onClick={this.toggleList} style={this.styles.menuButton}>
            <i className="fa fa-bars"></i>
          </button>
          <h1>Oakland, CA Coffee Shops</h1>
        </div>
          <MapDisplay
            lat={this.state.lat}
            lon={this.state.lon}
            zoom={this.state.zoom}
            locations={this.state.all}/>
          <ListMenu
            locations={this.state.all}
            open={this.state.open}
            toggleList={this.toggleList}/>
        </div>
    );
  }
}

export default App;
