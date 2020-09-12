import React from 'react';
import GoogleMap from 'google-map-react'
import { Container } from './styles';

interface mapI {
  center: {
    lat: number;
    lng: number;
  },
  pivots: [{
    lat: number;
    lng: number;
  }]
  zoom: number;
}



const Map = ({ center, pivots, zoom }: mapI) => {

 
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  return (
    <Container>

      <GoogleMap bootstrapURLKeys={{ key: "AIzaSyA_o2dHh1nlRxMM8-0qNJdTzs7ZllZHyrs" }}
        defaultCenter={center}
        defaultZoom={zoom} >

        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}

      </GoogleMap>


    </Container>
  );
};

export default Map;
