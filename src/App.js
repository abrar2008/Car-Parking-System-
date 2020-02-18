import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import ParkingAreaList from './components/ParkingAreaList'

class App extends Component {
  render() {
    return (
      <ParkingAreaList />
    );
  }
}
export default App;
