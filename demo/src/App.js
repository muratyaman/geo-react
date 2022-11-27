import React, { Component } from 'react';
import GeoReact from 'georeact/lib/GeoReact';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };
  }

  onLocationChange = (position) => {
    this.setState({ position });
  };

  render() {
    const { position } = this.state;
    const { coords: { latitude, longitude }} = position || { coords: { latitude: null, longitude: null }};
    return (
      <>
        <header>
          demo
        </header>
        <main>
          latitude: {latitude}, longitude: {longitude}
        </main>
        <footer>
          <GeoReact onChange={this.onLocationChange}/>
        </footer>
      </>
    );
  }
}

export default App;
