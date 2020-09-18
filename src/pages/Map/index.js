import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

function Map() {
    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: -17.226837, lng: -46.8873441 }}
        />
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const App = () => {
    const key = "AIzaSyDF_Wx8hh-ZCMknKUD7NBxtJQY6sqdnT4U"

    return (
        <div style={{ width: "100vw", height: "50vh" }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            >
                <Marker position={{ lat: -17.226837, lng: -46.8873441 }} />
            </WrappedMap>
        </div>
    );
};

export default App;
