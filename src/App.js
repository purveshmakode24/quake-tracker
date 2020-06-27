import React, { Component } from 'react'
import axios from 'axios'
import './App.css';

import Header from './components/Header';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultEarthquakesData: [],  // [{}, {}, {},----]
      filterData: '',
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


        ////----> Below selectedData is a selected properties from a whole json data which returns a dictionary of each quake   

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

        // console.log("Selected Data:", selectedData);
        // console.log("Selected Data length:", selectedData.length);



        this.setState({
          defaultEarthquakesData: selectedData,
          isLoaded: true
        });

        // console.log(this.state.defaultEarthquakesData);
        // console.log(this.state.filterData);

      })
      .catch(error => {
        this.setState({ serverNotConnectedMsg: "Can't fetch data at this moment. Check your internet connection and try again.", isLoaded: 'true' });
        console.log(error);
        alert("We couldn't reach our servers. You may not be connected to internet. Please try again...");
      })
  }


  // state data from child component (Filter.jsx)
  fetchDataFromFilterJsx = (data) => {
    this.setState({ isLoaded: false }, () => {
      // console.log("Passed filter Data from Child(Filter.jsx) to Parent(App.js):", data.magnitudeFilter);

      const filteredData = this.state.defaultEarthquakesData.filter(quake => quake.magnitude > data.magnitudeFilter);
      // console.log("filterData:", filteredData);

      this.setState({
        filterData: filteredData,
        isLoaded: true
      });

    });
  }



  render() {

    let mapSection;

    if (!this.state.isLoaded) {
      mapSection = <p className="preload_message">Loading...</p>;
    } else if (this.state.serverNotConnectedMsg) {
      mapSection = <p className="preload_message">{this.state.serverNotConnectedMsg}</p>;
    } else {
      if (this.state.filterData) {
        mapSection = <MapComponent quakes={this.state.filterData} />;
        console.log("filtered quake data executed");
      } else {
        console.log("default quake data executed");
        mapSection = <MapComponent quakes={this.state.defaultEarthquakesData} />;

      }
    }


    return (
      <div>
        <Header />
        <Filter fetchFilterData={this.fetchDataFromFilterJsx} />
        <div className="map__section">
          {mapSection}
        </div>
      </div>
    )
  }
}


export default App;


