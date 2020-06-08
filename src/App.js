import React, { Component } from 'react'
import axios from 'axios'
import './App.css';

import Header from './components/Header';
import MapComponent from './components/MapComponent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 3,
      defaultEarthquakesData: [],  // [{}, {}, {},----]
      serverNotConnectedMsg: '',
      isLoaded: false
    }
  }

  componentDidMount() {
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=500`)
      .then(res => {
        // console.log(res.data.features);    ////---> returns whole features array from JSON api data

        // this.setState({
        //   features: res.data.features      ////---> other and direct way to take and set whole features array and pass the 'features' as a props into MapComponent'.
        // });


        //----> Below selectedData is a selected properties from a whole json data which returns a dictionary of each quake   

        const selectedData = res.data.features.map(quake => {
          return {
            magnitude: quake.properties.mag,
            place: quake.properties.place,
            url: quake.properties.url,
            time: quake.properties.time,
            alert: quake.properties.alert,
            code: quake.properties.code,
            position: [
              quake.geometry.coordinates[0], //longitude
              quake.geometry.coordinates[1], //latitude
              quake.geometry.coordinates[2], //depth
            ],
            id: quake.id,
          }
        });

        this.setState({
          defaultEarthquakesData: selectedData,
          isLoaded: true
        });

      })
      .catch(error => {
        this.setState({ serverNotConnectedMsg: "Can't fetch data at this moment", isLoaded: 'true' });
        console.log(error);
        alert("We couldn't reach our servers. You may not be connected to internet. Please try again...");
      })
  }



  render() {

    let mapSection;

    if (!this.state.isLoaded) {
      mapSection = "Loading...";
    } else {
      mapSection = <MapComponent quakes={this.state.defaultEarthquakesData} />;
    }

    return (
      <div>
        <Header />
        <div className="map__section">
          {mapSection}
        </div>
      </div>
    )
  }
}



export default App;


