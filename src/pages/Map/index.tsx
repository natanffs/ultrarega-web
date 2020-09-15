import React from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
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



const Map = () => {

 const key= "AIzaSyA_o2dHh1nlRxMM8-0qNJdTzs7ZllZHyrs"
  


  return (
    <Container>



    </Container>
  );
};

export default Map;
