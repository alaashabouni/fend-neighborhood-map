import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class ListMenu extends Component {
  state = {
    open: false,
    query: ""
  }

  styles = {
    list: {
      width: "250px",
      padding: "0px 15px 0px"
    },
    noBullets: {
      listStyleType: "none",
      padding: 0
    },
    fullList: {
      width: 'auto'
    },
    listItem: {
      marginBottom: "15px"
    },
    fiterEntry: {
      border: "1px solid gray",
      padding: "3px",
      margin: "30px 0px 10px",
      width: "100%"
    }
  };

  updateQuery = (newQuery) => {
    this.setState({query:newQuery});
  }

  render = () = => {
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleList}>
          <div style={this.styles.list}>
            <input
              style={this.styles.filterEntry}
              type="text"
              placehoder="Filter List"
              name="filter"
              onChange={e => this.updateQuery(e.target.value)}
              value={this.state.query}/>
            <ul style={this.styles.noBullets}>
              {this.props.locations &&
              this.props.locations.map((location, index) => {
                return (
                  <li style={this.sytles.listItem} key={index}>
                    <button style={this.styles.listLink} key={index}>{location.name}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </Drawer>
      </div>
    )
  }
}

export defaut ListMenu;