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
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10,
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  toggleList = () => {
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations,query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickCoffeeShop = (index) => {
    this.setState({selectedIndex: index, open: !this.state.open})
  }

  render = () => {
   return (
     <div className="App">
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
         locations={this.state.filtered}
         selectedIndex={this.state.selectedIndex}
         clickCoffeeShop={this.clickCoffeeShop}/>
       <ListMenu
         locations={this.state.filtered}
         open={this.state.open}
         toggleList={this.toggleList}
         filterLocations={this.updateQuery}
         clickCoffeeShop={this.clickCoffeeShop}/>
     </div>
   );
 }
}

export default App;
