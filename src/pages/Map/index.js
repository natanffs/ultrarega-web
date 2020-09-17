import React, {useState, useEffect} from 'react';
import { Container } from './styles';

const Map = () => {

  const [map, setMap] = useState({})
  const key= "AIzaSyA_o2dHh1nlRxMM8-0qNJdTzs7ZllZHyrs"
  
 //função de criação do mapa
  function initMap(){
      new google.maps.Map(document.getElementById("map"), {
        conter: {
          lat: -34.397,
          lng: 150.644
        },
        zoom: 8
      });
  }

  useEffect({initMap()},[])

  return (
    <Container id ='map' >


<script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA_o2dHh1nlRxMM8-0qNJdTzs7ZllZHyrs&callback=initMap`}></script>
    </Container>
  );
};

export default Map;
