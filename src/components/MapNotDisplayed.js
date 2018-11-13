import React, {Component} from 'react';

class MapNotDisplayed extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillunmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState ({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show
          ? (
            <div>
              <h1>Error Lodaing map</h1>
                <p>Could not load map due to nextwork error, try again once online</p>
            </div>
          )
          : (<div><h1>Loading</h1></div>)
        }
      </div>
    )
  }
}

export default MapNotDisplayed;
