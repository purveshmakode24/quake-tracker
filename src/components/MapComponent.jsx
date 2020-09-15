import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, AttributionControl } from 'react-leaflet';
import { Icon } from "leaflet";


class MapComponent extends Component {

  render() {

    const customIcon = new Icon({
      iconUrl: require('../assets/red-marker.png'),     // red-marker for severe alert
      iconSize: [30, 41]
    });


    const quakeFeaturesMarker = this.props.quakes.map(quake => {
      const position = [quake.position[1], quake.position[0]];    // react-leaflet coordinate position format is [lat, lng]
      if (quake.magnitude >= 6) {
        return (
          <Marker key={quake.id} position={position} icon={customIcon}>
            <Popup>
              <span className="popup__quaketime">{new Date(quake.time).toUTCString()}</span>
              <br />
              <span className="quake__magnitude__red">{quake.magnitude}</span> magnitude earthquake. Near {quake.place}.
            Find more details <a href={quake.url}>here</a>
            </Popup>
          </Marker>
        );
      } else {
        return (
          <Marker key={quake.id} position={position} >
            <Popup>
              <span className="popup__quaketime">{new Date(quake.time).toUTCString()}</span>
              <br />
              <span className="quake__magnitude">{quake.magnitude}</span> magnitude earthquake. Near {quake.place}.
              Find more details <a href={quake.url}>here</a>
            </Popup>
          </Marker>
        );
      }
    });


    return (
      <Map
        className="map__section"
        center={[38, 6]}
        zoom={3}
        minZoom="2.5"
        maxBounds={[
          [90, 180],
          [-90, -180],
        ]}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AttributionControl prefix="< /> w/ &#10084; by <a href='https://www.purveshmakode.tk'>Purvesh Makode</a>" />
        {quakeFeaturesMarker}
      </Map >
    );
  }
}


export default MapComponent;