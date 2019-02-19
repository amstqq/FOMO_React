import React from "react";
import EventsMap from "./EventsMap";

class MapContainer extends React.PureComponent {
  render() {
    console.log(`Key: ${API_KEY}`);
    return (
      <EventsMap
        {...this.props}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MapContainer;
